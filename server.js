import express from "express";
import url from "node:url";
import path from "node:path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const app = express();

const staticFolder = path.join(__dirname, "ssr/client");
const baseURL = process.env.BASE || "/";
const serverPort = process.env.PORT || 3000;

(async () => {
    let vite = null;
    const sirv = (await import("sirv")).default;
    app.use(baseURL, sirv(staticFolder, { extensions: [] }));

    if (process.env.DEV_SERVER) {
        const { createServer } = await import("vite");
        vite = await createServer({
            server: { middlewareMode: true },
            appType: "custom",
            base: baseURL
        });
        app.use(vite.middlewares);
    }

    app.use("*", async (req, res) => {
        let renderer;

        if (vite) {
            const { Renderer } = await vite.ssrLoadModule(
                "/src/app/renderer.jsx"
            );
            renderer = Renderer;
        } else {
            renderer = await import("./ssr/server/main.js").then(
                module => module.renderer
            );
        }

        renderer(req, res);
    });

    app.listen(serverPort, "0.0.0.0", () => {
        console.log(`Server starter at http://localhost:${serverPort}`);
    });
})(); //! run server
