import { jsx } from "react/jsx-runtime";
import { useRef } from "react";
import { tv } from "tailwind-variants";
import { c as composeEventHandlers } from "./compose-event-handlers-xlGPYA7j.js";
const inputVariants = tv({
  variants: {
    variant: {
      primary: "h-11 w-full rounded-lg bg-quaternary px-4 outline-offset-2 outline-slate-100 placeholder:text-white/30 focus-visible:outline",
      secondary: "rounded-lg bg-white px-4-6-xs-md py-3-4-xs-md"
    }
  },
  defaultVariants: {
    variant: "primary"
  }
});
const Input = ({
  variant,
  className,
  onBeforeInput,
  onChange,
  autoComplete = "off",
  ...props
}) => {
  const unvalidatedValue = useRef("");
  const onBeforeInputHandler = (event) => {
    const input = event.currentTarget;
    if (!input.hasAttribute("pattern"))
      return;
    unvalidatedValue.current = input.value;
  };
  const onChangeHandler = (event) => {
    const input = event.currentTarget;
    if (input.validity.patternMismatch) {
      input.value = unvalidatedValue.current;
    }
  };
  return /* @__PURE__ */ jsx(
    "input",
    {
      autoComplete,
      onBeforeInput: composeEventHandlers(
        onBeforeInput,
        onBeforeInputHandler
      ),
      onChange: composeEventHandlers(onChange, onChangeHandler),
      className: inputVariants({ variant, className }),
      ...props
    }
  );
};
export {
  Input as I
};
