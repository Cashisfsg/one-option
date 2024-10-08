import { jsx } from "react/jsx-runtime";
import { c as cn } from "../main.js";
const Section = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: cn(
        "rounded-2xl bg-secondary px-4-6-xs-md py-4 ",
        className
      ),
      ...props
    }
  );
};
export {
  Section as S
};
