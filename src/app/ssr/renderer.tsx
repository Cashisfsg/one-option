import ReactDomServer from "react-dom/server";
import {
    createStaticHandler,
    createStaticRouter,
    StaticRouterProvider
} from "react-router-dom/server";
import { routes } from "../providers/router/provider";
import { HTML } from "@/shared/ui/template";

const createFetchRequest = (req, res) => {
    const origin = `${req}://${req.get("host")}`;
    const url = new URL(req.originalUrl || req.url, origin);

    const controller = new AbortController();
    res.on("close", () => controller.abort());

    const headers = new Headers();

    for (const [key, values] of Object.entries(req.headers)) {
        if (!values) return;

        if (Array.isArray(values)) {
            for (const value of values) {
                headers.append(key, value);
            }
            return;
        }

        headers.set(key, values);
    }

    const init = {
        method: req.method,
        headers: headers,
        signal: controller.signal
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
        // init.body = req.body;
        Object.assign(init, { body: req.body });
    }

    return new Request(url.href, init);
};

export const Renderer = async (req, res) => {
    try {
        const { query, dataRoutes } = createStaticHandler(routes);
        const fetchRequest = createFetchRequest(req, res);
        const context = await query(fetchRequest);

        if (context instanceof Response) {
            throw context;
        }

        const router = createStaticRouter(dataRoutes, context);
        const headers = {};
        const { pipe } = ReactDomServer.renderToPipeableStream(
            <HTML headers={headers}>
                <StaticRouterProvider
                    router={router}
                    context={context}
                />
            </HTML>,
            {
                bootstrapModules: ["/main.js"],
                onShellReady: () => {
                    res.setHeader("content-type", "text/html");
                    pipe(res);
                }
            }
        );
    } catch (error) {
        console.error(error);
    }
};
