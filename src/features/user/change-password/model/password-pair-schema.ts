import * as z from "zod";

const alphanumericRegex = /^[A-Za-z0-9]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
const digitRegex = /^(?=.*[0-9]).*$/;

export const passwordPairSchema = z
    .object({
        oldPassword: z
            .string({
                required_error: "Поле обязательно для заполнения"
            })
            .min(8, {
                message: "Пароль должен содержать не менее 8 символов"
            })
            .max(128, {
                message: "Пароль должен содержать не более 128 символов"
            }),
        newPassword: z
            .string({
                required_error: "Поле обязательно для заполнения"
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
        confirmNewPassword: z
            .string({
                required_error: "Поле обязательно для заполнения"
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
    .refine(data => data.newPassword === data.confirmNewPassword, {
        message: "Пароли должны совпадать",
        path: ["confirmNewPassword"]
    });

export type PasswordPairSchema = z.infer<typeof passwordPairSchema>;
