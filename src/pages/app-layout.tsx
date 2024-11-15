import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import { Header } from "@/widgets/header/header";

export const AppLayout = () => {
    return (
        <>
            <Header />
            <main className="container">
                <Outlet />
            </main>
            <Toaster
                position="top-center"
                toastOptions={{
                    className:
                        "bg-[#444249] text-sm-base-xs-lg font-primary text-white text-center text-balance"
                }}
            />
        </>
    );
};
