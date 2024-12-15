import { forwardRef } from "react";
import { inputVariants, type InputVariants } from "./input-variants";

interface InputProps extends React.ComponentProps<"input">, InputVariants {}

export const Input: React.FC<InputProps> = forwardRef(
    ({ variant, className, alert, autoComplete = "off", ...props }, ref) => {
        return (
            <input
                autoComplete={autoComplete}
                className={inputVariants({ variant, alert, className })}
                ref={ref}
                {...props}
            />
        );
    }
);
