import { jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { c as cn } from "../main.js";
const articleVariants = cva(
  "pb-8 *:px-[clamp(1rem,_0.8rem_+_0.85vw,_1.5rem)]",
  {
    variants: {
      variant: {
        block: "space-y-[clamp(1rem,_0.8rem_+_0.85vw,_1.5rem)]",
        // grid: "grid gap-4 sm:gap-5 lg:gap-6 "
        grid: "grid gap-[clamp(1rem,_0.8rem_+_0.85vw,_1.5rem)]"
      }
    },
    defaultVariants: {
      variant: "block"
    }
  }
);
const Article = ({
  className,
  variant,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "article",
    {
      className: cn(articleVariants({ variant, className })),
      ...props
    }
  );
};
export {
  Article as A
};
