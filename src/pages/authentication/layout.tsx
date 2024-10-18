import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { cnBase } from "tailwind-variants";

interface AuthenticationLayoutProps
    extends Omit<React.ComponentPropsWithoutRef<"main">, "children"> {}

export const AuthenticationLayout: React.FC<AuthenticationLayoutProps> = ({
    className,
    ...props
}) => {
    return (
        <main
            className={cnBase(
                "min-h-dvh bg-[url('@/assets/bg.webp')] px-4 py-8",
                className
            )}
            {...props}
        >
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
