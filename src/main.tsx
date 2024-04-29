import React from "react";
import ReactDOM from "react-dom/client";
// import { StyledThemeProvider } from "@/app/providers/styled-components-provider";

import { ReactRouterProvider } from "@/app/providers/react-router-provider.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        {/* <StyledThemeProvider> */}
        <ReactRouterProvider />
        {/* </StyledThemeProvider> */}
    </React.StrictMode>
);
