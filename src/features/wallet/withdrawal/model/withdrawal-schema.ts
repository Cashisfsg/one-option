import * as z from "zod";

const decimalRegex = /^\d+([.,]\d{0,2})?/;

export const withdrawalSchema = z.object({
    amount: z
        .string()
        .min(1, {
            message: "Поле обязательно для заполнения"
        })
        .regex(decimalRegex, {
            message: "Поле может содержать только символы A-Z и цифры"
        }),
    wallet: z.string().min(1, {
        message: "Поле обязательно для заполнения"
    })
});

export type WithdrawalSchema = z.infer<typeof withdrawalSchema>;
