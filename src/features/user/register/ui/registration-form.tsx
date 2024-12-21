import { useId } from "react";
import { useNavigate } from "react-router-dom";
import { cnBase } from "tailwind-variants";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { useSignUpMutation } from "@/shared/api";

import { Checkbox } from "@/shared/ui/checkbox";

import {
    registrationCredentialsSchema as formSchema,
    type RegistrationCredentialsSchema as FormSchema
} from "../model/registration-credentials-schema";

import IconsSprite from "@/assets/img/svg/icons-spite.svg";

interface RegistrationFormProps extends React.ComponentProps<"form"> {}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
    className,
    ...props
}) => {
    const emailId = `email-${useId()}`;
    const passwordId = `password-${useId()}`;
    const confirmPasswordId = `password-${useId()}`;
    const labelId = `label-${useId()}`;

    const navigate = useNavigate();
    const [signUp, { isLoading }] = useSignUpMutation();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
        shouldUseNativeValidation: true,
        shouldFocusError: false,
        mode: "onSubmit",
        reValidateMode: "onChange"
    });

    const onSubmitHandler: SubmitHandler<FormSchema> = async data => {
        try {
            let request = {
                email: data.email,
                password: data.password,
                password2: data.confirmPassword
            };
            const token = sessionStorage.getItem("referralToken");
            if (token) {
                request = Object.assign(request, {
                    token_ref: JSON.parse(token)?.token
                });
            }
            await signUp(request).unwrap();
            sessionStorage.removeItem("referralToken");
            navigate("/auth/sign/in");
        } catch (error) {
            console.error(error);
            // Object.values(error?.data)?.forEach(value =>
            //     value?.forEach(v => toast.error(v))
            // );
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className={cnBase("gap-y-6-8-xs-md", className)}
            {...props}
        >
            <fieldset className="grid gap-y-2-4-xs-md">
                <div className="flex gap-x-2-4-xs-md">
                    <label
                        htmlFor={emailId}
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
                        </svg>
                        <span className="sr-only">Email</span>
                    </label>

                    <input
                        id={emailId}
                        type="email"
                        autoComplete="off"
                        placeholder="Почта"
                        aria-invalid={!!errors?.email}
                        {...register("email")}
                        className="flex-auto rounded-lg border-2 border-transparent bg-white px-4-6-xs-md py-3-4-xs-md text-base-xl-xs-md text-black aria-[invalid=true]:border-red-primary aria-[invalid=true]:text-red-primary"
                    />
                </div>

                <div className="flex gap-x-2-4-xs-md">
                    <label
                        htmlFor={passwordId}
                        className="aspect-square h-full place-content-center rounded-lg bg-white"
                    >
                        <svg
                            height="1em"
                            width="1em"
                            aria-hidden="true"
                            focusable="false"
                            className="text-2xl-4xl-xs-md text-violet-primary"
                        >
                            <use xlinkHref={`${IconsSprite}#lock`} />
                        </svg>
                        <span className="sr-only">Пароль</span>
                    </label>
                    <input
                        id={passwordId}
                        type="password"
                        autoComplete="off"
                        placeholder="Пароль"
                        aria-invalid={!!errors?.password}
                        {...register("password")}
                        className="flex-auto rounded-lg border-2 border-transparent bg-white px-4-6-xs-md py-3-4-xs-md text-base-xl-xs-md text-black aria-[invalid=true]:border-red-primary aria-[invalid=true]:text-red-primary"
                    />
                </div>

                <div className="flex gap-x-2-4-xs-md">
                    <label
                        htmlFor={confirmPasswordId}
                        className="aspect-square h-full place-content-center rounded-lg bg-white"
                    >
                        <svg
                            height="1em"
                            width="1em"
                            aria-hidden="true"
                            focusable="false"
                            className="text-2xl-4xl-xs-md text-violet-primary"
                        >
                            <use xlinkHref={`${IconsSprite}#lock`} />
                        </svg>
                        <span className="sr-only">Повторите пароль</span>
                    </label>
                    <input
                        id={confirmPasswordId}
                        type="password"
                        autoComplete="off"
                        placeholder="Подтвердите пароль"
                        aria-invalid={!!errors?.confirmPassword}
                        {...register("confirmPassword")}
                        className="flex-auto rounded-lg border-2 border-transparent bg-white px-4-6-xs-md py-3-4-xs-md text-base-xl-xs-md text-black aria-[invalid=true]:border-red-primary aria-[invalid=true]:text-red-primary"
                    />
                </div>
            </fieldset>

            <fieldset className="grid grid-cols-[auto_1fr] place-items-center gap-x-2-4-xs-md text-start text-lg ">
                <Checkbox
                    aria-labelledby={labelId}
                    required
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

            <fieldset className="flex flex-col justify-center gap-2-4-xs-md text-base-xl-xs-md">
                <button
                    disabled={isLoading}
                    className="rounded-lg border-2 border-white-primary bg-white-primary py-3 text-black transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50 sm:px-12 mh:hover:bg-transparent mh:hover:text-white-primary"
                >
                    Зарегистрироваться
                </button>
                <a
                    href={`${import.meta.env.VITE_BASE_API_URL}/google/`}
                    aria-disabled={isLoading}
                    className="rounded-lg border-2 border-white-primary py-3 transition-colors duration-300 aria-disabled:pointer-events-none aria-disabled:opacity-50 sm:px-12 mh:hover:bg-white-primary mh:hover:text-black"
                >
                    Регистрация через Google
                </a>
            </fieldset>
        </form>
    );
};
