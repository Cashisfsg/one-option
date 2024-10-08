import { jsx } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import { cnBase } from "tailwind-variants";
const AuthenticationLayout = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "main",
    {
      className: cnBase(
        "min-h-dvh bg-[url('@/assets/bg.webp')] px-4 py-8",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-3xl space-y-6-8-xs-md text-center", children: /* @__PURE__ */ jsx(Outlet, {}) })
    }
  );
};
export {
  AuthenticationLayout
};
