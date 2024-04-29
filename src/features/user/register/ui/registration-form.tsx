import { useId } from "react";

import { cn } from "@/shared/lib";

import { EmailIcon, PasswordIcon } from "@/entities/user/assets";
import { Checkbox } from "@/shared/ui/checkbox";

interface RegistrationFormProps extends React.ComponentProps<"form"> {}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
    className,
    ...props
}) => {
    const emailId = useId();
    const passwordId = useId();
    const confirmPasswordId = useId();
    const labelId = useId();

    return (
        <form
            className={cn("gap-y-6-8-xs-md", className)}
            {...props}
        >
            <fieldset className="gap-y-2-4-xs-md grid">
                <div className="gap-x-2-4-xs-md flex">
                    <label
                        htmlFor={emailId}
                        className="aspect-square h-full place-content-center rounded-lg bg-white"
                    >
                        <EmailIcon className="text-2xl-4xl-xs-md text-violet-primary" />
                        <span className="sr-only">Email</span>
                    </label>
                    <input
                        id={emailId}
                        type="email"
                        autoComplete="off"
                        placeholder="Почта"
                        className="text-base-xl-xs-md py-3-4-xs-md px-4-6-xs-md flex-auto rounded-lg text-black"
                    />
                </div>

                <div className="gap-x-2-4-xs-md flex">
                    <label
                        htmlFor={passwordId}
                        className="aspect-square h-full place-content-center rounded-lg bg-white"
                    >
                        <PasswordIcon className="text-2xl-4xl-xs-md text-violet-primary" />
                        <span className="sr-only">Пароль</span>
                    </label>
                    <input
                        id={passwordId}
                        type="password"
                        placeholder="Пароль"
                        className="text-base-xl-xs-md py-3-4-xs-md px-4-6-xs-md flex-auto rounded-lg text-black"
                    />
                </div>

                <div className="gap-x-2-4-xs-md flex">
                    <label
                        htmlFor={confirmPasswordId}
                        className="aspect-square h-full place-content-center rounded-lg bg-white"
                    >
                        <PasswordIcon className="text-2xl-4xl-xs-md text-violet-primary" />
                        <span className="sr-only">Повторите пароль</span>
                    </label>
                    <input
                        id={confirmPasswordId}
                        type="password"
                        placeholder="Подтвердите пароль"
                        className="text-base-xl-xs-md py-3-4-xs-md px-4-6-xs-md flex-auto rounded-lg text-black"
                    />
                </div>
            </fieldset>

            <fieldset className="gap-x-2-4-xs-md grid grid-cols-[auto_1fr] place-items-center text-start text-lg ">
                <Checkbox
                    aria-labelledby={labelId}
                    className="checkbox size-6-8-xs-md"
                />
                <span
                    id={labelId}
                    className="text-sm-lg-xs-md leading-none"
                >
                    Я подтверждаю, что мне исполнилось 18 лет и я принимаю
                    условия{" "}
                    <a className="text-sm-lg-xs-md underline underline-offset-2">
                        Пользовательского соглашения
                    </a>
                </span>
            </fieldset>
        </form>
    );
};
