import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { cnBase } from "tailwind-variants";

import { Logo } from "@/shared/ui/logo";

interface AuthenticationLayoutProps
    extends Omit<React.ComponentPropsWithoutRef<"main">, "children"> {}

export const AuthenticationLayout: React.FC<AuthenticationLayoutProps> = ({
    className,
    ...props
}) => {
    return (
        <main
            className={cnBase(
                "min-h-dvh space-y-4-6-xs-md bg-[url('@/assets/bg.webp')] px-4 py-8",
                className
            )}
            {...props}
        >
            <header>
                <Logo
                    width="210"
                    height="140"
                    className="mx-auto block"
                />
            </header>

            <section className="mx-auto max-w-3xl space-y-6-8-xs-md text-center">
                <Outlet />
            </section>

            <Toaster
                position="top-center"
                toastOptions={{
                    className:
                        "bg-[#444249] text-sm-base-xs-lg font-primary text-white flex items-center text-center text-balance"
                }}
            />
        </main>
    );
};
