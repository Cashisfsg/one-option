import { useId } from "react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { useChangePasswordMutation } from "@/shared/api";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { ErrorMessage } from "@/shared/ui/error";

import {
    passwordPairSchema as formSchema,
    type PasswordPairSchema as FormSchema
} from "../model/password-pair-schema";

interface ChangePasswordFormProps extends React.ComponentProps<"form"> {}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = props => {
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const oldPasswordId = `password-${useId()}`;
    const newPasswordId = `password-${useId()}`;
    const confirmNewPasswordId = `password-${useId()}`;
    const oldPasswordErrorId = `error-message-${useId()}`;
    const newPasswordErrorId = `error-message-${useId()}`;
    const confirmNewPasswordErrorId = `error-message-${useId()}`;

    const {
        register,
        handleSubmit,
        reset,

        formState: { errors }
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        }
    });

    const onSubmitHandler: SubmitHandler<FormSchema> = async ({
        oldPassword,
        newPassword,
        confirmNewPassword
    }) => {
        try {
            await changePassword({
                old_password: oldPassword,
                new_password: newPassword,
                new_password_confirm: confirmNewPassword
            }).unwrap();
            reset();
            toast.success("Пароль был успешно изменён");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            {...props}
        >
            <div className="grid gap-y-2">
                <label htmlFor={oldPasswordId}>Текущий пароль</label>

                <Input
                    id={oldPasswordId}
                    type="password"
                    placeholder="Текущий пароль"
                    aria-invalid={!!errors?.oldPassword}
                    aria-errormessage={oldPasswordErrorId}
                    className="aria-[invalid=true]:border-red-primary peer border-2 border-transparent"
                    {...register("oldPassword")}
                />

                <ErrorMessage
                    id={oldPasswordErrorId}
                    htmlFor={oldPasswordId}
                >
                    {errors.oldPassword?.message}
                </ErrorMessage>
            </div>

            <div className="grid gap-y-2">
                <label htmlFor={newPasswordId}>Новый пароль</label>

                <Input
                    id={newPasswordId}
                    type="password"
                    placeholder="Новый пароль"
                    aria-invalid={!!errors?.newPassword}
                    aria-errormessage={newPasswordErrorId}
                    className="aria-[invalid=true]:border-red-primary peer border-2 border-transparent"
                    {...register("newPassword")}
                />

                <ErrorMessage
                    id={newPasswordErrorId}
                    htmlFor={newPasswordId}
                >
                    {errors.newPassword?.message}
                </ErrorMessage>
            </div>

            <div className="grid gap-y-2">
                <label htmlFor={confirmNewPasswordId}>Подтвердите пароль</label>

                <Input
                    id={confirmNewPasswordId}
                    type="password"
                    placeholder="Подтвердите пароль"
                    aria-invalid={!!errors?.confirmNewPassword}
                    aria-errormessage={confirmNewPasswordErrorId}
                    className="aria-[invalid=true]:border-red-primary peer border-2 border-transparent"
                    {...register("confirmNewPassword")}
                />

                <ErrorMessage
                    id={confirmNewPasswordErrorId}
                    htmlFor={confirmNewPasswordId}
                >
                    {errors.confirmNewPassword?.message}
                </ErrorMessage>
            </div>

            <Button
                disabled={isLoading}
                className="mt-4 h-11 disabled:pointer-events-none disabled:opacity-50 lg:self-end lg:justify-self-end"
            >
                Сменить пароль
            </Button>
        </form>
    );
};
