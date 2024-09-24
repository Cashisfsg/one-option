import { useRef } from "react";
import { inputVariants, type InputVariants } from "./input-variants";
import { composeEventHandlers } from "@/shared/lib/utils/compose-event-handlers";

interface InputProps extends React.ComponentProps<"input">, InputVariants {}

export const Input: React.FC<InputProps> = ({
    variant,
    className,
    onBeforeInput,
    onChange,
    autoComplete = "off",
    ...props
}) => {
    const validatedValue = useRef("");

    const onBeforeInputHandler: React.FormEventHandler<
        HTMLInputElement
    > = event => {
        const input = event.currentTarget;

        if (!input.hasAttribute("pattern")) return;

        validatedValue.current = input.value;
    };

    const onChangeHandler: React.ChangeEventHandler<
        HTMLInputElement
    > = event => {
        const input = event.currentTarget;

        if (input.validity.patternMismatch) {
            console.log("Pattern mismatch");

            input.value = validatedValue.current;
        }
    };

    return (
        <input
            autoComplete={autoComplete}
            onBeforeInput={composeEventHandlers(
                onBeforeInput,
                onBeforeInputHandler
            )}
            onChange={composeEventHandlers(onChange, onChangeHandler)}
            className={inputVariants({ variant, className })}
            {...props}
        />
    );
};
