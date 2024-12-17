import { Link } from "react-router-dom";

import { UserRegistrationForm } from "@/features/user/register";

export const SignUpPage = () => {
    return (
        <>
            <header className="space-y-2-3-xs-md">
                <h1 className="text-4xl-7xl-xs-md">Регистрация</h1>
                <p className="text-xl-4xl-xs-md">в партнерской программе</p>
            </header>

            <UserRegistrationForm />

            <footer className="text-sm-lg-xs-md">
                <p>
                    Уже зарегистрированы?{" "}
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
