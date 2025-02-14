import { tv, type VariantProps } from "tailwind-variants";
import styles from "./input.module.css";

export const inputVariants = tv({
    variants: {
        variant: {
            primary:
                "h-11 w-full rounded-lg bg-quaternary px-4 outline-offset-2 outline-slate-100 placeholder:text-white/30 focus-visible:outline",
            secondary: "rounded-lg bg-white px-4-6-xs-md py-3-4-xs-md"
        },
        alert: {
            true: `${styles.input}`
        }
    },
    defaultVariants: {
        variant: "primary"
    }
});

export type InputVariants = VariantProps<typeof inputVariants>;
