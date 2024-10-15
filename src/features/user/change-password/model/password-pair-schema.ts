import * as z from "zod";

const alphanumericRegex = /^[A-Za-z0-9]+$/;

export const passwordPairSchema = z
    .object({
        oldPassword: z
            .string()
            .min(1, {
                message: "Поле обязательно для заполнения"
            })
            .regex(alphanumericRegex, {
                message: "Поле может содержать только символы A-Z и цифры"
            })
            .min(8, {
                message: "Пароль должен содержать не менее 8 символов"
            })
            .max(30, {
                message: "Пароль должен содержать не более 30 символов"
            }),
        newPassword: z
            .string()
            .min(1, {
                message: "Поле обязательно для заполнения"
            })
            .regex(alphanumericRegex, {
                message: "Поле может содержать только символы A-Z и цифры"
            })
            .min(8, {
                message: "Пароль должен содержать не менее 8 символов"
            })
            .max(30, {
                message: "Пароль должен содержать не более 30 символов"
            }),
        confirmNewPassword: z
            .string()
            .min(1, {
                message: "Поле обязательно для заполнения"
            })
            .regex(alphanumericRegex, {
                message: "Поле может содержать только символы A-Z и цифры"
            })
            .min(8, {
                message: "Пароль должен содержать не менее 8 символов"
            })
            .max(30, {
                message: "Превышено максимально допустимое количество символов"
            })
    })
    .refine(data => data.newPassword === data.confirmNewPassword, {
        message: "Пароли должны совпадать",
        path: ["passwordConfirm"]
    });

export type PasswordPairSchema = z.infer<typeof passwordPairSchema>;
