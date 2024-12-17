import { useId, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cnBase } from "tailwind-variants";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAppDispatch } from "@/app/providers/redux/hooks";
import { login } from "@/shared/api/authSlice";
import { useSignInMutation } from "@/shared/api";

import { EmailIcon, PasswordIcon } from "@/entities/user/assets";
import { Checkbox } from "@/shared/ui/checkbox";

import {
    authenticationCredentialsSchema as formSchema,
    type AuthenticationCredentialsSchema as FormSchema
} from "../model/authentication-credentials-schema";

interface AuthenticationFormProps extends React.ComponentProps<"form"> {}

export const AuthenticationForm: React.FC<AuthenticationFormProps> = ({
    className,
    ...props
}) => {
    const emailId = useId();
    const passwordId = useId();
    const checkboxRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [authenticate, { isLoading }] = useSignInMutation();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
        shouldUseNativeValidation: true,
        shouldFocusError: false,
        mode: "onSubmit",
        reValidateMode: "onChange"
    });

    const onSubmitHandler: SubmitHandler<FormSchema> = async data => {
        try {
            const request = { email: data.email, password: data.password };
            const { token } = await authenticate(request).unwrap();

            dispatch(
                login({
                    token: token,
                    storage: checkboxRef.current?.checked
                        ? localStorage
                        : sessionStorage
                })
            );
            navigate("/");
        } catch (error) {
            console.error(error);

            toast.error(error?.data?.detail, {
                className: "flex items-center",
                description: "Error authenticating",
                descriptionClassName: "font-secondary"
            });
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
                        <EmailIcon className="text-2xl-4xl-xs-md text-violet-primary" />
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
                        <PasswordIcon className="text-2xl-4xl-xs-md text-violet-primary" />
                        <span className="sr-only">Пароль</span>
                    </label>
                    <input
                        id={passwordId}
                        type="password"
                        placeholder="Пароль"
                        aria-invalid={!!errors?.password}
                        {...register("password")}
                        className="flex-auto rounded-lg border-2 border-transparent bg-white px-4-6-xs-md py-3-4-xs-md text-base-xl-xs-md text-black aria-[invalid=true]:border-red-primary aria-[invalid=true]:text-red-primary"
                    />
                </div>
            </fieldset>

            <fieldset className="flex items-center justify-between text-lg text-sm-lg-xs-md ">
                <label className="grid grid-cols-[auto_auto] place-items-center gap-x-2">
                    <Checkbox
                        name="memoize"
                        className="checkbox size-6-8-xs-md"
                        ref={checkboxRef}
                    />
                    <span className="leading-none">Запомнить меня</span>
                </label>

                <Link
                    to="/auth/password/reset"
                    className="underline underline-offset-2"
                >
                    Забыли пароль?
                </Link>
            </fieldset>

            <fieldset className="flex flex-col justify-center gap-2-4-xs-md text-base-xl-xs-md sm:flex-row">
                <button
                    disabled={isLoading}
                    className="rounded-lg border-2 border-white-primary bg-white-primary py-3 text-black transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50 sm:px-16 mh:hover:bg-transparent mh:hover:text-white-primary"
                >
                    Войти
                </button>
                <a
                    href={`${import.meta.env.VITE_BASE_API_URL}/google/`}
                    aria-disabled={isLoading}
                    className="rounded-lg border-2 border-white-primary py-3 transition-colors duration-300 aria-disabled:pointer-events-none aria-disabled:opacity-50 sm:px-16 mh:hover:bg-white-primary mh:hover:text-black"
                >
                    Войти через Google
                </a>
            </fieldset>
        </form>
    );
};
