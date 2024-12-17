import * as z from "zod";

const alphanumericRegex = /^[A-Za-z0-9]+$/;

export const authenticationCredentialsSchema = z.object({
    email: z
        .string()
        .min(1, {
            message: "Поле обязательно для заполнения"
        })
        .min(5, {
            message:
                "Адрес электронной почты должен содержать не менее 5 символов"
        })
        .email({
            message: "Укажите корректный адрес электронной почты"
        })
        .max(256, {
            message:
                "Адрес электронной почты должен содержать не более 256 символов"
        }),
    password: z
        .string()
        .min(1, {
            message: "Поле обязательно для заполнения"
        })
        .min(8, {
            message: "Пароль должен содержать не менее 8 символов"
        })
        .regex(alphanumericRegex, {
            message: "Поле может содержать только символы A-Z и цифры"
        })
        .max(128, {
            message: "Пароль должен содержать не более 128 символов"
        })
});

export type AuthenticationCredentialsSchema = z.infer<
    typeof authenticationCredentialsSchema
>;
