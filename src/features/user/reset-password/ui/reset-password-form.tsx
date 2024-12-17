import { useId } from "react";
import { useNavigate } from "react-router-dom";
import { cnBase } from "tailwind-variants";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { useRecoverPasswordMutation } from "@/shared/api";
import { EmailIcon } from "@/entities/user/assets";

import {
    resetPasswordCredentialsSchema as formSchema,
    type ResetPasswordCredentialsSchema as FormSchema
} from "../model/reset-password-credentials-schema";

interface ResetPasswordFormProps
    extends React.ComponentPropsWithoutRef<"form"> {}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
    className,
    ...props
}) => {
    const email = `email-${useId()}`;

    const navigate = useNavigate();
    const [recoverPassword, { isLoading }] = useRecoverPasswordMutation();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        },
        shouldUseNativeValidation: true,
        shouldFocusError: false,
        mode: "onSubmit",
        reValidateMode: "onChange"
    });

    const onSubmitHandler: SubmitHandler<FormSchema> = async data => {
        try {
            await recoverPassword({ email: data.email }).unwrap();
            navigate("/auth/password/reset/confirm");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className={cnBase(
                "grid grid-cols-[minmax(min-content,_auto)_1fr] gap-x-2-4-xs-md gap-y-6-8-xs-md",
                className
            )}
            {...props}
        >
            <label
                htmlFor={email}
                className="aspect-square h-full place-content-center rounded-lg bg-white"
            >
                <EmailIcon className="text-2xl-4xl-xs-md text-violet-primary" />
                <span className="sr-only">Email</span>
            </label>
            <input
                id={email}
                type="email"
                placeholder="Почта"
                aria-invalid={!!errors?.email}
                {...register("email")}
                className="flex-auto rounded-lg border-2 border-transparent bg-white px-4-6-xs-md py-3-4-xs-md text-base-xl-xs-md text-black aria-[invalid=true]:border-red-primary aria-[invalid=true]:text-red-primary"
            />

            <button
                disabled={isLoading}
                className="col-span-2 mx-auto block rounded-lg border-2 border-white-primary bg-white-primary px-16 py-3 text-black transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50 mh:hover:bg-transparent mh:hover:text-white-primary"
            >
                Сбросить
            </button>
        </form>
    );
};
