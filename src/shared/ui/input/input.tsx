import { useRef } from "react";
import { inputVariants, type InputVariants } from "./input-variants";

import { composeEventHandlers } from "@/shared/lib/utils/compose-event-handlers";

interface InputProps extends React.ComponentProps<"input">, InputVariants {}

export const Input: React.FC<InputProps> = ({
    variant,
    className,
    onBeforeInput,
    onChange,
    alert,
    autoComplete = "off",
    ...props
}) => {
    const unvalidatedValue = useRef("");

    const onBeforeInputHandler: React.FormEventHandler<
        HTMLInputElement
    > = event => {
        const input = event.currentTarget;

        // if (!input.hasAttribute("pattern")) return;

        unvalidatedValue.current = input.value;
    };

    const onChangeHandler: React.ChangeEventHandler<
        HTMLInputElement
    > = event => {
        const input = event.currentTarget;

        if (input.validity.patternMismatch) {
            input.value = unvalidatedValue.current;
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
            className={inputVariants({ variant, alert, className })}
            {...props}
        />
    );
};
