import { useId } from "react";

import { cn } from "@/shared/lib";

import { EmailIcon, PasswordIcon } from "@/entities/user/assets";
import { Checkbox } from "@/shared/ui/checkbox";

interface AuthenticationFormProps extends React.ComponentProps<"form"> {}

export const AuthenticationForm: React.FC<AuthenticationFormProps> = ({
    className,
    ...props
}) => {
    const emailId = useId();
    const passwordId = useId();

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
            </fieldset>

            <fieldset className="text-sm-lg-xs-md flex items-center justify-between text-lg ">
                <label className="grid grid-cols-[auto_auto] place-items-center gap-x-2">
                    <Checkbox className="checkbox size-6-8-xs-md" />
                    <span className="leading-none">Запомнить меня</span>
                </label>

                <a className="underline underline-offset-2">Забыли пароль?</a>
            </fieldset>
        </form>
    );
};
