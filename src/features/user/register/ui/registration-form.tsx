import { useId } from "react";
import { useNavigate } from "react-router-dom";
import { cnBase } from "tailwind-variants";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
// import { toast } from "sonner";
// import { ZodError } from "zod";

import { useSignUpMutation } from "@/shared/api";

import { EmailIcon, PasswordIcon } from "@/entities/user/assets";
import { Checkbox } from "@/shared/ui/checkbox";

import {
    registrationCredentialsSchema as formSchema,
    type RegistrationCredentialsSchema as FormSchema
} from "../model/registration-credentials-schema";

// interface FormFields {
//     email: HTMLInputElement;
//     password: HTMLInputElement;
//     confirmPassword: HTMLInputElement;
// }

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
    const [signUp] = useSignUpMutation();

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
        // shouldFocusError: false,
        mode: "onBlur"
        // reValidateMode: "onSubmit"
    });

    console.log("Form validation ", errors);

    // const onBlurHandler: React.FocusEventHandler<HTMLInputElement> = event => {
    //     console.log(
    //         "Aria-invalid",
    //         event.currentTarget.getAttribute("aria-invalid")
    //     );
    //     console.log("Errors", errors);

    //     // if (event.currentTarget.getAttribute("aria-invalid") !== "true") return;

    //     const name = event.currentTarget.getAttribute(
    //         "name"
    //     ) as keyof typeof errors;

    //     const errorMessage = errors[name]?.message;

    //     console.log("Error message: " + errorMessage);

    //     if (!errorMessage) return;

    //     toast.error(errorMessage);
    // };

    // const onChangeHandler: React.ChangeEventHandler<
    //     HTMLInputElement
    // > = event => {
    //     const input = event.currentTarget;
    //     if (input.getAttribute("aria-invalid") === "false") return;
    //     input.setAttribute("aria-invalid", "false");
    // };

    // const onFocusHandler: React.FocusEventHandler<HTMLInputElement> = event => {
    //     console.log("Focus");

    //     event.currentTarget.setAttribute("aria-invalid", "false");
    // };

    const onSubmitHandler: SubmitHandler<FormSchema> = async data => {
        // event.preventDefault();
        // const form = event.currentTarget;
        // try {
        //     const parseObject = formSchema.parse(getValues());
        //     console.log("Parse object: ", parseObject);
        // } catch (error) {
        //     if (!(error instanceof ZodError)) {
        //         console.error(error);
        //         return;
        //     }
        //     const uniqueErrors: Record<string, string> = error.errors.reduce(
        //         (acc, error) => {
        //             const key = error.path[0];
        //             if (!(key in acc)) {
        //                 acc[key] = error.message;
        //             }
        //             return acc;
        //         },
        //         {}
        //     );
        //     console.log("Unique errors: ", uniqueErrors);
        //     console.log("Errors: ", error.errors);
        //     Object.values(uniqueErrors).forEach(error => toast.error(error));
        //     Object.keys(uniqueErrors).forEach(key => {
        //         console.log(key, form[key]);
        //         (form[key] as HTMLInputElement)?.setAttribute(
        //             "aria-invalid",
        //             "true"
        //         );
        //     });
        //     // toast.error(error.errors[0]?.message);
        //     return;
        // }

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
                        <EmailIcon className="text-2xl-4xl-xs-md text-violet-primary" />
                        <span className="sr-only">Email</span>
                    </label>

                    <input
                        id={emailId}
                        type="email"
                        // required
                        autoComplete="off"
                        placeholder="Почта"
                        aria-invalid={!!errors?.email}
                        // onFocus={onFocusHandler}
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
                        // required
                        autoComplete="off"
                        placeholder="Пароль"
                        aria-invalid={!!errors?.password}
                        // onFocus={onFocusHandler}
                        {...register("password")}
                        className="flex-auto rounded-lg border-2 border-transparent bg-white px-4-6-xs-md py-3-4-xs-md text-base-xl-xs-md text-black aria-[invalid=true]:border-red-primary aria-[invalid=true]:text-red-primary"
                    />
                </div>

                <div className="flex gap-x-2-4-xs-md">
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
                        // required
                        autoComplete="off"
                        placeholder="Подтвердите пароль"
                        aria-invalid={!!errors?.confirmPassword}
                        // onFocus={onFocusHandler}
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
        </form>
    );
};
