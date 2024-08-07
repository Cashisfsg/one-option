import React from "react";
import ReactDOM from "react-dom/client";
// import { StyledThemeProvider } from "@/app/providers/styled-components-provider";

import { ReactRouterProvider } from "@/app/providers/react-router-provider.tsx";
import { ReduxProvider } from "./app/providers/redux";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        {/* <StyledThemeProvider> */}
        <ReduxProvider>
            <ReactRouterProvider />
        </ReduxProvider>
        {/* </StyledThemeProvider> */}
    </React.StrictMode>
);
