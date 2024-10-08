import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useId } from "react";
import { useNavigate, Link } from "react-router-dom";
import { u as useRecoverPasswordMutation, L as Logo, E as EmailIcon } from "../main.js";
import { I as Input } from "./input-BqtPcIo-.js";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react-redux";
import "@reduxjs/toolkit";
import "@reduxjs/toolkit/query/react";
import "tailwind-variants";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "./compose-event-handlers-xlGPYA7j.js";
const ResetPasswordPage = () => {
  const email = `email-${useId()}`;
  const formId = `form-${useId()}`;
  const navigate = useNavigate();
  const [recoverPassword] = useRecoverPasswordMutation();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { email: email2 } = event.currentTarget;
    try {
      await recoverPassword({ email: email2.value }).unwrap();
      navigate("/auth/password/reset/confirm");
    } catch (error) {
      console.error(error);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "space-y-2-3-xs-md", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: Logo,
          alt: "Logo",
          height: "125",
          width: "220",
          className: "mx-auto block"
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "text-balance text-center text-4xl-7xl-xs-md", children: "Восстановить пароль" })
    ] }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        id: formId,
        onSubmit: onSubmitHandler,
        className: "grid grid-cols-[minmax(min-content,_auto)_1fr] gap-x-2-4-xs-md",
        children: [
          /* @__PURE__ */ jsxs(
            "label",
            {
              htmlFor: email,
              className: "aspect-square h-full place-content-center rounded-lg bg-white",
              children: [
                /* @__PURE__ */ jsx(EmailIcon, { className: "text-2xl-4xl-xs-md text-violet-primary" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Email" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: email,
              type: "email",
              name: "email",
              required: true,
              placeholder: "Почта",
              variant: "secondary",
              className: "flex-auto text-base-xl-xs-md"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        form: formId,
        className: "mx-auto block rounded-lg border-2 border-white-primary bg-white-primary px-16 py-3 text-black transition-colors duration-300 mh:hover:bg-transparent mh:hover:text-white-primary",
        children: "Сбросить"
      }
    ),
    /* @__PURE__ */ jsx("footer", { className: "text-sm-lg-xs-md", children: /* @__PURE__ */ jsxs("p", { className: "text-center", children: [
      "Вы помните свой пароль?",
      " ",
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/auth/sign/in",
          className: "underline underline-offset-2",
          children: "Войти"
        }
      )
    ] }) })
  ] });
};
export {
  ResetPasswordPage
};
