import * as z from "zod";

export const resetPasswordCredentialsSchema = z.object({
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
        })
});

export type ResetPasswordCredentialsSchema = z.infer<
    typeof resetPasswordCredentialsSchema
>;
