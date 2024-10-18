import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import "./App.css";

export const App = () => {
    return (
        <main>
            <Outlet />
            <Toaster position="top-center" />
        </main>
    );
};
