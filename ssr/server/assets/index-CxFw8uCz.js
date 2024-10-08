import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useId } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { a as useConfirmPasswordMutation, L as Logo, P as PasswordIcon } from "../main.js";
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
const ResetPasswordConfirmPage = () => {
  const formId = `form-${useId()}`;
  const newPasswordId = `password-${useId()}`;
  const confirmPasswordId = `password-${useId()}`;
  const navigate = useNavigate();
  const params = useParams();
  const [confirmPassword] = useConfirmPasswordMutation();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!params.token)
      return;
    const { new_password, confirm_password } = event.currentTarget;
    try {
      await confirmPassword({
        token: params.token,
        new_password: new_password.value,
        confirm_password: confirm_password.value
      }).unwrap();
      navigate("/auth/sign/in");
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
      /* @__PURE__ */ jsx("h1", { className: "text-balance text-center text-4xl-7xl-xs-md", children: "Восстановить пароль trololo" })
    ] }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        id: formId,
        onSubmit: onSubmitHandler,
        className: "grid gap-x-2-4-xs-md",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-x-2-4-xs-md", children: [
            /* @__PURE__ */ jsxs(
              "label",
              {
                htmlFor: newPasswordId,
                className: "aspect-square h-full place-content-center rounded-lg bg-white",
                children: [
                  /* @__PURE__ */ jsx(PasswordIcon, { className: "text-2xl-4xl-xs-md text-violet-primary" }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Пароль" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: newPasswordId,
                type: "password",
                name: "new_password",
                minLength: 8,
                maxLength: 128,
                placeholder: "Пароль",
                className: "flex-auto rounded-lg px-4-6-xs-md py-3-4-xs-md text-base-xl-xs-md text-black"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-x-2-4-xs-md", children: [
            /* @__PURE__ */ jsxs(
              "label",
              {
                htmlFor: confirmPasswordId,
                className: "aspect-square h-full place-content-center rounded-lg bg-white",
                children: [
                  /* @__PURE__ */ jsx(PasswordIcon, { className: "text-2xl-4xl-xs-md text-violet-primary" }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Повторите пароль" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: confirmPasswordId,
                type: "password",
                name: "confirm_password",
                minLength: 8,
                maxLength: 128,
                placeholder: "Подтвердите пароль",
                className: "flex-auto rounded-lg px-4-6-xs-md py-3-4-xs-md text-base-xl-xs-md text-black"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        form: formId,
        className: "mx-auto block rounded-lg border-2 border-white-primary bg-white-primary py-3 text-black transition-colors duration-300 sm:px-16 mh:hover:bg-transparent mh:hover:text-white-primary",
        children: "Сбросить"
      }
    ),
    /* @__PURE__ */ jsx("footer", { className: "text-sm-lg-xs-md", children: /* @__PURE__ */ jsxs("p", { className: "text-center", children: [
      "Вы помните свой пароль?",
      " ",
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/sign/in",
          className: "underline underline-offset-2",
          children: "Войти"
        }
      )
    ] }) })
  ] });
};
export {
  ResetPasswordConfirmPage
};
