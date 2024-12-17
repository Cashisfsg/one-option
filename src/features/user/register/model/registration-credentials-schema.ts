import * as z from "zod";

const alphanumericRegex = /^[A-Za-z0-9]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
const digitRegex = /^(?=.*[0-9]).*$/;

export const registrationCredentialsSchema = z
    .object({
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
            .regex(passwordRegex, {
                message:
                    "Пароль должен содержать как минимум одну заглавную и одну строчную букву."
            })
            .regex(digitRegex, {
                message: "Пароль должен содержать как минимум 1 цифру"
            })
            .max(128, {
                message: "Пароль должен содержать не более 128 символов"
            }),
        confirmPassword: z
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
            .regex(passwordRegex, {
                message:
                    "Пароль должен содержать как минимум одну заглавную и одну строчную букву."
            })
            .regex(digitRegex, {
                message: "Пароль должен содержать как минимум 1 цифру"
            })
            .max(128, {
                message: "Пароль должен содержать не более 128 символов"
            })
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Пароли должны совпадать",
        path: ["confirmPassword"]
    });

export type RegistrationCredentialsSchema = z.infer<
    typeof registrationCredentialsSchema
>;
