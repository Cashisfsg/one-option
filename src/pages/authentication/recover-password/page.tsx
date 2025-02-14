import { useId } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRecoverPasswordMutation } from "@/shared/api";

import Logo from "@/assets/logo.png";

import IconsSprite from "@/assets/img/svg/icons-spite.svg";

interface FormField {
    email: HTMLInputElement;
}

export const ResetPasswordPage = () => {
    const email = `email-${useId()}`;
    const formId = `form-${useId()}`;

    const navigate = useNavigate();
    const [recoverPassword] = useRecoverPasswordMutation();

    const onSubmitHandler: React.FormEventHandler<
        HTMLFormElement & FormField
    > = async event => {
        event.preventDefault();

        const { email } = event.currentTarget;

        try {
            await recoverPassword({ email: email.value }).unwrap();
            navigate("/password/recover/confirm");
        } catch (error) {
            console.error(error);
        }
    };

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
                <h1 className="text-balance text-center text-4xl-7xl-xs-md">
                    Восстановить пароль
                </h1>
            </header>

            <form
                id={formId}
                onSubmit={onSubmitHandler}
                className="grid grid-cols-[minmax(min-content,_auto)_1fr] gap-x-2-4-xs-md"
            >
                <label
                    htmlFor={email}
                    className="aspect-square h-full place-content-center rounded-lg bg-white"
                >
                    <svg
                        height="1em"
                        width="1em"
                        aria-hidden="true"
                        focusable="false"
                        className="text-2xl-4xl-xs-md text-violet-primary"
                    >
                        <use xlinkHref={`${IconsSprite}#email`} />
                    </svg>{" "}
                    <span className="sr-only">Email</span>
                </label>
                <input
                    id={email}
                    type="email"
                    name="email"
                    required
                    placeholder="Почта"
                    className="flex-auto rounded-lg bg-white px-4-6-xs-md py-3-4-xs-md text-base-xl-xs-md text-black"
                />
            </form>

            <button
                form={formId}
                className="mx-auto block rounded-lg border-2 border-white-primary bg-white-primary px-16 py-3 text-black transition-colors duration-300 mh:hover:bg-transparent mh:hover:text-white-primary"
            >
                Сбросить
            </button>

            <footer className="text-sm-lg-xs-md">
                <p className="text-center">
                    Вы помните свой пароль?{" "}
                    <Link
                        to="/sign/in"
                        className="underline underline-offset-2"
                    >
                        Войти
                    </Link>
                </p>
            </footer>
        </>
    );
};
