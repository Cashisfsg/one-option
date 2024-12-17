import { Link } from "react-router-dom";

import { ResetPasswordForm } from "@/features/user/reset-password";

export const ResetPasswordPage = () => {
    return (
        <>
            <header className="space-y-2-3-xs-md">
                <h1 className="text-balance text-center text-4xl-7xl-xs-md">
                    Восстановить пароль
                </h1>
            </header>

            <ResetPasswordForm />

            <footer className="text-sm-lg-xs-md">
                <p className="text-center">
                    Вы помните свой пароль?{" "}
                    <Link
                        to="/auth/sign/in"
                        className="underline underline-offset-2"
                    >
                        Войти
                    </Link>
                </p>
            </footer>
        </>
    );
};
