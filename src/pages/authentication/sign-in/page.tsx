import { Link } from "react-router-dom";

import { UserAuthenticationForm } from "@/features/user/authenticate";

export const SignInPage = () => {
    return (
        <>
            <header className="space-y-2-3-xs-md">
                <hgroup>
                    <h1 className="text-4xl-7xl-xs-md">Вход</h1>
                    <p className="text-xl-4xl-xs-md">в партнерскую программу</p>
                </hgroup>
            </header>

            <UserAuthenticationForm />

            <footer className="text-sm-lg-xs-md">
                <p>
                    Еще нет аккаунта?{" "}
                    <Link
                        to="/auth/sign/up"
                        className="underline underline-offset-2"
                    >
                        Зарегистрироваться
                    </Link>
                </p>
            </footer>
        </>
    );
};
