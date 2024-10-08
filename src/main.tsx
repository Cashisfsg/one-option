import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "@/app/providers/router";
import { ReduxProvider } from "@/app/providers/redux";
import "./App.css";
import "./index.css";

if (process.env.NODE_ENV !== "production") {
    import("@axe-core/react").then(axe => {
        axe.default(React, ReactDOM, 1000);
    });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ReduxProvider>
            <RouterProvider />
        </ReduxProvider>
    </React.StrictMode>
);

// import { createRoot, hydrateRoot } from "react-dom/client";
// import {
//     RouterProvider,
//     createBrowserRouter,
//     matchRoutes
// } from "react-router-dom";
// import { routes } from "./app/providers/router/provider";
// import { ReduxProvider } from "./app/providers/redux";
// import { RouterProvider as NavigationProvider } from "./app/providers/router/provider";

// const MOUNT_NODE = document.getElementById("root");

// if (!MOUNT_NODE) {
//     throw new Error("Application container not found");
// }

// (async () => {
//     if (MOUNT_NODE.hasChildNodes()) {
//         const lazyMatches = matchRoutes(routes, window.location)?.filter(
//             m => m.route.lazy
//         );

//         if (lazyMatches && lazyMatches?.length) {
//             await Promise.all(
//                 lazyMatches.map(async m => {
//                     const routeModule = await m.route.lazy();
//                     Object.assign(m.route, {
//                         ...routeModule,
//                         lazy: undefined
//                     });
//                 })
//             );
//         }

//         const router = createBrowserRouter(routes);
//         console.log("hydration...");
//         hydrateRoot(
//             MOUNT_NODE,
//             <RouterProvider
//                 router={router}
//                 fallbackElement={null}
//             />
//         );
//     } else {
//         const root = createRoot(MOUNT_NODE);
//         console.log("creating...");
//         root.render(
//             <ReduxProvider>
//                 <NavigationProvider />
//             </ReduxProvider>
//         );
//     }
// })();
