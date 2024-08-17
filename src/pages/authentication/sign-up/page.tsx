import { useId } from "react";
import { Link } from "react-router-dom";

import { UserRegistrationForm } from "@/features/user/register";
import Logo from "@/assets/logo.png";

export const SignUpPage = () => {
    const formId = `form-${useId()}`;

    return (
        <>
            <header className="space-y-2-3-xs-md">
                <img
                    src={Logo}
                    alt="Logo"
                    height="125"
                    width="220"
                    className="mx-auto block"
                />
                <h1 className="text-4xl-7xl-xs-md">Регистрация</h1>
                <p className="text-xl-4xl-xs-md">в партнерской программе</p>
            </header>

            <UserRegistrationForm id={formId} />

            <div className="flex flex-col justify-center gap-2-4-xs-md text-base-xl-xs-md">
                <button
                    form={formId}
                    className="rounded-lg border-2 border-white-primary bg-white-primary py-3 text-black transition-colors duration-300 sm:px-12 mh:hover:bg-transparent mh:hover:text-white-primary"
                >
                    Зарегистрироваться
                </button>
                <a
                    href={`${import.meta.env.VITE_BASE_API_URL}/google/`}
                    className="rounded-lg border-2 border-white-primary py-3 transition-colors duration-300 sm:px-12 mh:hover:bg-white-primary mh:hover:text-black"
                >
                    Регистрация через Google
                </a>
            </div>

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
