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
