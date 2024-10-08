import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React, { createContext, useContext, useId, useRef, useMemo } from "react";
import { u as useFetchUserBalanceQuery, a as useFetchUserDataQuery, b as useUpdateUserPhotoMutation, c as useUpdateUserCredentialsMutation } from "./api-C06svCjp.js";
import { Link } from "react-router-dom";
import { S as Section } from "./section-CAb_CRJf.js";
import { b as buttonVariants, a as useAttachWalletMutation, c as useFetchWalletQuery, R as Root$2, I as Input, T as Trigger$2, M as Menu, O as Option, B as Button, d as useFetchWalletListQuery } from "./select-DaCVrgOW.js";
import { F as Fetch } from "./fetch-g_nB-b8P.js";
import { I as Input$1 } from "./input-BqtPcIo-.js";
import { c as composeEventHandlers } from "./compose-event-handlers-xlGPYA7j.js";
import ReactDOM from "react-dom";
import { T as Title, b as useChangePasswordMutation, c as cn } from "../main.js";
import { cnBase } from "tailwind-variants";
import { A as Article } from "./article-KiRtUD3R.js";
import { T as Table, a as TableRow } from "./table-BZGxj-lc.js";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react-redux";
import "@reduxjs/toolkit";
import "@reduxjs/toolkit/query/react";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
const UserBalanceCard = ({
  balance,
  ...props
}) => {
  return /* @__PURE__ */ jsxs(
    Section,
    {
      className: "flex flex-col gap-y-2 bg-violet-primary md:px-4",
      ...props,
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl", children: "Ваш баланс" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 rounded-lg bg-violet-secondary px-4 py-2 text-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "font-secondary", children: "Общий доход:" }),
          /* @__PURE__ */ jsxs("p", { className: "py-4 text-center text-3xl", children: [
            balance == null ? void 0 : balance.total_income,
            " $"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-violet-secondary px-4 py-2 text-lg", children: /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("span", { className: "font-secondary", children: "Доля от дохода:" }),
          " ",
          balance == null ? void 0 : balance.income_doxod,
          " $"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-violet-secondary px-4 py-2 text-lg", children: /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("span", { className: "font-secondary", children: "Доля от оборота:" }),
          " ",
          balance == null ? void 0 : balance.income_oborot,
          " $"
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-center", children: "Обновляется каждые 10-20 минут." }),
        /* @__PURE__ */ jsx("p", { className: "flex-auto text-center", children: "Привлекайте новых трейдеров и увеличивайте доход!" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/withdrawal",
            className: buttonVariants({
              className: "mx-auto mt-6 block h-auto bg-violet-tertiary text-center"
            }),
            children: "Перейти к выводу средств"
          }
        )
      ]
    }
  );
};
const UserBalanceCardSkeleton = () => {
  return /* @__PURE__ */ jsxs(Section, { className: "flex flex-col gap-y-2 bg-violet-primary md:px-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl", children: "Ваш баланс" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-2 rounded-lg bg-violet-secondary px-4 py-2 text-lg", children: [
      /* @__PURE__ */ jsx("p", { className: "font-secondary", children: "Общий доход:" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto h-7 w-24 animate-pulse rounded-full bg-white/70 py-4" })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "rounded-lg bg-violet-secondary px-4 py-2 align-middle text-lg", children: [
      /* @__PURE__ */ jsx("span", { className: "font-secondary", children: "Доля от дохода:" }),
      " ",
      /* @__PURE__ */ jsx("span", { className: "inline-block h-5 w-24 animate-pulse rounded-full bg-white/70 align-middle" })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "rounded-lg bg-violet-secondary px-4 py-2 text-lg", children: [
      /* @__PURE__ */ jsx("span", { className: "font-secondary", children: "Доля от оборота:" }),
      " ",
      /* @__PURE__ */ jsx("span", { className: "inline-block h-5 w-24 animate-pulse rounded-full bg-white/70 align-middle" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-center", children: "Обновляется каждые 10-20 минут." }),
    /* @__PURE__ */ jsx("p", { className: "flex-auto text-center", children: "Привлекайте новых трейдеров и увеличивайте доход!" }),
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/withdrawal",
        className: buttonVariants({
          className: "mx-auto mt-6 block h-auto bg-violet-tertiary text-center"
        }),
        children: "Перейти к выводу средств"
      }
    )
  ] });
};
const BalanceCard = () => {
  return /* @__PURE__ */ jsx(
    Fetch,
    {
      useQuery: useFetchUserBalanceQuery,
      args: void 0,
      renderSuccess: (balance) => /* @__PURE__ */ jsx(UserBalanceCard, { balance }),
      loadingFallback: /* @__PURE__ */ jsx(UserBalanceCardSkeleton, {})
    }
  );
};
const AttachWalletForm = (props) => {
  const [attachWallet] = useAttachWalletMutation();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { wallet_type, wallet_id } = event.currentTarget;
      attachWallet({
        type_wallet: wallet_type.value,
        wallet_id: wallet_id.value
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: onSubmitHandler,
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          Fetch,
          {
            useQuery: useFetchWalletQuery,
            args: void 0,
            renderSuccess: (wallets) => /* @__PURE__ */ jsxs("fieldset", { className: "grid gap-y-2", children: [
              /* @__PURE__ */ jsx("label", { children: "Выберите тип кошелька" }),
              /* @__PURE__ */ jsxs(Root$2, { children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    placeholder: "Выберите тип кошелька",
                    name: "wallet_type",
                    className: "w-full"
                  }
                ),
                /* @__PURE__ */ jsx(Trigger$2, { children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 16 16",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    className: "transition-transform duration-300 group-aria-expanded:rotate-180",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        d: "M7.24677 11.1399L2.45054 5.6585C1.88478 5.01192 2.34396 4 3.20312 4H12.7956C13.6547 4 14.1139 5.01192 13.5482 5.6585L8.75193 11.1399C8.35352 11.5952 7.64518 11.5952 7.24677 11.1399Z",
                        fill: "white"
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ jsx(Menu, { children: wallets.map((wallet) => /* @__PURE__ */ jsx(
                  Option,
                  {
                    value: wallet == null ? void 0 : wallet.name,
                    children: wallet == null ? void 0 : wallet.name
                  },
                  wallet == null ? void 0 : wallet.name
                )) })
              ] })
            ] }),
            loadingFallback: /* @__PURE__ */ jsxs("label", { children: [
              /* @__PURE__ */ jsx("span", { children: "Выберите тип кошелька:" }),
              /* @__PURE__ */ jsx(
                Input$1,
                {
                  placeholder: "Выберите тип кошелька",
                  required: true,
                  readOnly: true
                }
              )
            ] }),
            renderError: () => /* @__PURE__ */ jsxs("label", { children: [
              /* @__PURE__ */ jsx("span", { children: "Выберите тип кошелька:" }),
              /* @__PURE__ */ jsx(
                Input$1,
                {
                  placeholder: "Выберите тип кошелька",
                  required: true,
                  readOnly: true
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxs("label", { children: [
          /* @__PURE__ */ jsx("span", { children: "Кошелек:" }),
          /* @__PURE__ */ jsx(
            Input$1,
            {
              placeholder: "Введите ID кошелька",
              required: true,
              name: "wallet_id",
              minLength: 1,
              maxLength: 100
            }
          )
        ] })
      ]
    }
  );
};
const portalRoot$1 = document.querySelector("body");
const Portal$2 = ({ children }) => {
  return ReactDOM.createPortal(children, portalRoot$1);
};
const DialogContext = createContext(null);
const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error(
      "Component must be rendered as child of Dialog component"
    );
  }
  return context;
};
const modal = "_modal_19h6s_1";
const content = "_content_19h6s_107";
const Dialog = {
  modal,
  content
};
const Root$1 = ({ children }) => {
  const dialogId = `dialog-${useId()}`;
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  return /* @__PURE__ */ jsx(DialogContext.Provider, { value: { dialogId, dialogRef, triggerRef }, children });
};
Root$1.displayName = "Dialog.Root";
const Trigger$1 = ({ onClick, ...props }) => {
  const { dialogId, dialogRef, triggerRef } = useDialogContext();
  const onClickHandler = (event) => {
    var _a, _b;
    const trigger = event.currentTarget;
    const rootElement = document.querySelector("#root");
    const dialogOpen = trigger.getAttribute("aria-expanded") === "true";
    if (dialogOpen) {
      (_a = dialogRef.current) == null ? void 0 : _a.close();
    } else {
      (_b = dialogRef.current) == null ? void 0 : _b.showModal();
      rootElement.setAttribute("inert", "");
      rootElement.setAttribute("aria-hidden", "true");
    }
    trigger.setAttribute("aria-expanded", String(!dialogOpen));
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      "aria-haspopup": "dialog",
      "aria-expanded": "false",
      "aria-controls": dialogId,
      onClick: composeEventHandlers(onClick, onClickHandler),
      ref: triggerRef,
      ...props
    }
  );
};
Trigger$1.displayName = "Dialog.Trigger";
const Portal$1 = ({ children }) => {
  return /* @__PURE__ */ jsx(Portal$2, { children });
};
Portal$1.displayName = "Dialog.Portal";
const Content$1 = ({
  className,
  onClick,
  onClose,
  children,
  ...props
}) => {
  const contentId = `dialog-content-${useId()}`;
  const contentRef = useRef(null);
  const { dialogRef, triggerRef } = useDialogContext();
  const handleOverlayClick = () => {
    var _a;
    (_a = dialogRef.current) == null ? void 0 : _a.close();
  };
  const onCloseHandler = () => {
    var _a, _b;
    const rootElement = document.querySelector("div#root");
    if (!rootElement)
      return;
    rootElement.removeAttribute("inert");
    rootElement.removeAttribute("aria-hidden");
    (_a = triggerRef.current) == null ? void 0 : _a.setAttribute("aria-expanded", "false");
    (_b = triggerRef.current) == null ? void 0 : _b.focus();
  };
  return /* @__PURE__ */ jsx(
    "dialog",
    {
      className: Dialog.modal,
      onClick: handleOverlayClick,
      onClose: composeEventHandlers(onClose, onCloseHandler),
      ref: dialogRef,
      ...props,
      children: /* @__PURE__ */ jsx(
        "section",
        {
          id: contentId,
          className: className ? `${Dialog.Content} ${className}` : Dialog.content,
          onClick: (event) => event.stopPropagation(),
          ref: contentRef,
          children
        }
      )
    }
  );
};
Content$1.displayName = "Dialog.Content";
const Close = ({ onClick, ...props }) => {
  const { dialogRef, triggerRef } = useDialogContext();
  const onClickHandler = () => {
    var _a, _b;
    (_a = dialogRef.current) == null ? void 0 : _a.close();
    (_b = triggerRef.current) == null ? void 0 : _b.setAttribute("aria-expanded", "false");
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: composeEventHandlers(onClick, onClickHandler),
      ...props
    }
  );
};
Close.displayName = "Dialog.Close";
const AttachWalletDialog = () => {
  const formId = `form-${useId()}`;
  return /* @__PURE__ */ jsxs(Root$1, { children: [
    /* @__PURE__ */ jsx(Trigger$1, { className: "rounded-lg bg-violet-primary px-10 py-2.5", children: "Добавить" }),
    /* @__PURE__ */ jsx(Portal$1, { children: /* @__PURE__ */ jsxs(Content$1, { className: "grid w-full gap-y-8 rounded-2xl bg-[#141218] px-8 pb-8 pt-4", children: [
      /* @__PURE__ */ jsx(Title, { as: "h2", children: "Добавление кошелька" }),
      /* @__PURE__ */ jsx(AttachWalletForm, { id: formId }),
      /* @__PURE__ */ jsxs("footer", { className: "flex flex-wrap-reverse justify-end gap-5", children: [
        /* @__PURE__ */ jsx(
          Close,
          {
            className: buttonVariants({
              variant: "outlined",
              className: "w-fit flex-auto sm:max-w-60"
            }),
            children: "Отмена"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            form: formId,
            className: "w-fit flex-auto sm:max-w-60",
            children: "Добавить"
          }
        )
      ] })
    ] }) })
  ] });
};
const WalletListItem = ({
  className,
  wallet,
  ...props
}) => {
  return /* @__PURE__ */ jsxs(
    "li",
    {
      className: cnBase(
        "flex items-center justify-between gap-x-8",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { children: wallet.type_wallet }),
        /* @__PURE__ */ jsx("span", { className: "truncate", children: wallet.wallet_id })
      ]
    }
  );
};
const WalletList = ({
  wallets,
  ...props
}) => {
  return /* @__PURE__ */ jsx("ul", { ...props, children: wallets.map((wallet) => /* @__PURE__ */ jsx(
    WalletListItem,
    {
      wallet
    },
    wallet.wallet_id
  )) });
};
const WalletListWidget = () => {
  return /* @__PURE__ */ jsx(
    Fetch,
    {
      useQuery: useFetchWalletListQuery,
      args: void 0,
      renderSuccess: (wallets) => /* @__PURE__ */ jsx(WalletList, { wallets }),
      loadingFallback: /* @__PURE__ */ jsx("ul", { className: "mt-6", children: Array(5).fill(0).map((_, i) => /* @__PURE__ */ jsx(
        "li",
        {
          className: "h-11 odd:animate-pulse odd:bg-[#36343b]"
        },
        i
      )) }),
      renderError: () => /* @__PURE__ */ jsx("ul", { className: "mt-6", children: Array(5).fill(0).map((_, i) => /* @__PURE__ */ jsx(
        "li",
        {
          className: "h-11 odd:bg-[#36343b]"
        },
        i
      )) })
    }
  );
};
const FetchUserData = ({
  renderSuccess,
  loadingFallback = /* @__PURE__ */ jsx("div", { className: "flex w-full items-center justify-center px-3", children: "Loading..." }),
  renderError = (error) => /* @__PURE__ */ jsx("pre", { className: "self-center text-center text-red-700", children: error || "Неизвестная ошибка" })
}) => {
  var _a;
  const { data, isLoading, isError, error } = useFetchUserDataQuery();
  if (isLoading)
    return loadingFallback;
  if (isError)
    return renderError((_a = error == null ? void 0 : error.data) == null ? void 0 : _a.details);
  if (data)
    return renderSuccess(data);
  return /* @__PURE__ */ jsx("pre", { children: "Нет данных" });
};
const UpdateUserPhotoForm = ({
  className,
  ...props
}) => {
  const [updateUserPhoto] = useUpdateUserPhotoMutation();
  const onChangeHandler = async (event) => {
    const { files } = event.currentTarget;
    if (!files || files.length === 0)
      return;
    const img = files[0];
    try {
      await updateUserPhoto(img).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  return /* @__PURE__ */ jsx(
    FetchUserData,
    {
      renderSuccess: ({ photo }) => /* @__PURE__ */ jsxs(
        "label",
        {
          className: cnBase("cursor-pointer", className),
          ...props,
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: `${"https://affilate.oneoption.ru"}${photo}`,
                alt: "User photo",
                className: "size-48 rounded-full border-4 border-violet-primary object-cover"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Update user avatar" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                name: "photo",
                accept: "image/*",
                onChange: onChangeHandler,
                hidden: true
              }
            )
          ]
        }
      ),
      loadingFallback: /* @__PURE__ */ jsx("div", { className: "size-48 animate-pulse place-content-center rounded-full border-4 border-violet-primary bg-slate-400" })
    }
  );
};
const ChangePasswordForm = (props) => {
  const [changePassword] = useChangePasswordMutation();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { old_password, new_password, confirm_password } = event.currentTarget;
    try {
      await changePassword({
        old_password: old_password.value,
        new_password: new_password.value,
        new_password_confirm: confirm_password.value
      }).unwrap();
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
    }
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: onSubmitHandler,
      ...props,
      children: [
        /* @__PURE__ */ jsxs("label", { children: [
          /* @__PURE__ */ jsx("span", { children: "Текущий пароль" }),
          /* @__PURE__ */ jsx(
            Input$1,
            {
              type: "password",
              required: true,
              minLength: 8,
              maxLength: 128,
              name: "old_password",
              placeholder: "Текущий пароль"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { children: [
          /* @__PURE__ */ jsx("span", { children: "Новый пароль" }),
          /* @__PURE__ */ jsx(
            Input$1,
            {
              type: "password",
              required: true,
              minLength: 8,
              maxLength: 128,
              name: "new_password",
              placeholder: "Новый пароль"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { children: [
          /* @__PURE__ */ jsx("span", { children: "Подтвердите пароль" }),
          /* @__PURE__ */ jsx(
            Input$1,
            {
              type: "password",
              required: true,
              minLength: 8,
              maxLength: 128,
              name: "confirm_password",
              placeholder: "Подтвердите пароль"
            }
          )
        ] })
      ]
    }
  );
};
const FTDMeter = ({ className, ...props }) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "meter",
      style: {
        "--start": `${Math.round(props["aria-valuenow"] / props["aria-valuemax"] * 100)}%`
      },
      className: cn("meter", className),
      ...props,
      children: [
        "FTD ",
        props["aria-valuenow"],
        " / ",
        props["aria-valuemax"]
      ]
    }
  );
};
const TooltipContext = createContext(null);
const useTooltipContext = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error(
      "Component must be rendered as child of tooltip component"
    );
  }
  return context;
};
const Root = ({ children }) => {
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const triggerId = useId();
  const tooltipId = useId();
  const timerRef = useRef(void 0);
  const contextValue = useMemo(
    () => ({ triggerRef, tooltipRef, triggerId, tooltipId, timerRef }),
    [triggerId, tooltipId]
  );
  return /* @__PURE__ */ jsx(TooltipContext.Provider, { value: contextValue, children });
};
const Trigger = ({ children }) => {
  const { triggerId, tooltipId, triggerRef, tooltipRef, timerRef } = useTooltipContext();
  const triggerElement = React.Children.only(children);
  const props = triggerElement.props;
  if (!React.isValidElement(triggerElement))
    return /* @__PURE__ */ jsx(Fragment, { children });
  const onMouseEnterHandler = (event) => {
    var _a;
    const target = event.currentTarget;
    if (((_a = tooltipRef.current) == null ? void 0 : _a.getAttribute("aria-hidden")) === "false") {
      clearTimeout(timerRef.current);
    } else {
      timerRef.current = setTimeout(() => {
        if (!tooltipRef.current)
          return;
        const scrollOffset = document.documentElement.scrollTop;
        const tooltipElement = tooltipRef.current;
        const tooltipRect = tooltipElement.getBoundingClientRect();
        const anchorRect = target.getBoundingClientRect();
        if ((anchorRect.right + anchorRect.left) / 2 - tooltipRect.width / 2 - 16 < 0) {
          tooltipElement.style.left = `${16}px`;
        } else {
          tooltipElement.style.left = `${(anchorRect.right + anchorRect.left) / 2 - tooltipRect.width / 2}px`;
        }
        tooltipElement.style.top = `${anchorRect.bottom + scrollOffset + 16}px`;
        tooltipElement.setAttribute("aria-hidden", "false");
      }, 1e3);
    }
  };
  const onMouseLeaveHandler = () => {
    var _a;
    if (((_a = tooltipRef.current) == null ? void 0 : _a.getAttribute("aria-hidden")) === "true") {
      clearTimeout(timerRef.current);
    } else {
      timerRef.current = setTimeout(() => {
        var _a2;
        (_a2 = tooltipRef.current) == null ? void 0 : _a2.setAttribute("aria-hidden", "true");
      }, 500);
    }
  };
  const onClickHandler = (event) => {
    var _a, _b;
    event.stopPropagation();
    if (((_a = tooltipRef.current) == null ? void 0 : _a.getAttribute("aria-hidden")) === "true") {
      const target = event.currentTarget;
      if (!tooltipRef.current)
        return;
      const scrollOffset = document.documentElement.scrollTop;
      const tooltipElement = tooltipRef.current;
      const tooltipRect = tooltipElement.getBoundingClientRect();
      const anchorRect = target.getBoundingClientRect();
      if ((anchorRect.right + anchorRect.left) / 2 - tooltipRect.width / 2 - 16 < 0) {
        tooltipElement.style.left = `${16}px`;
      } else {
        tooltipElement.style.left = `${(anchorRect.right + anchorRect.left) / 2 - tooltipRect.width / 2}px`;
      }
      tooltipElement.style.top = `${anchorRect.bottom + scrollOffset + 16}px`;
      tooltipElement.setAttribute("aria-hidden", "false");
    } else {
      (_b = tooltipRef.current) == null ? void 0 : _b.setAttribute("aria-hidden", "true");
    }
  };
  const onFocusHandler = (event) => {
    var _a;
    event.stopPropagation();
    const target = event.currentTarget;
    if (((_a = tooltipRef.current) == null ? void 0 : _a.getAttribute("aria-hidden")) === "false") {
      clearTimeout(timerRef.current);
    } else {
      timerRef.current = setTimeout(() => {
        if (!tooltipRef.current)
          return;
        const scrollOffset = document.documentElement.scrollTop;
        const tooltipElement = tooltipRef.current;
        const tooltipRect = tooltipElement.getBoundingClientRect();
        const anchorRect = target.getBoundingClientRect();
        if ((anchorRect.right + anchorRect.left) / 2 - tooltipRect.width / 2 - 16 < 0) {
          tooltipElement.style.left = `${16}px`;
        } else {
          tooltipElement.style.left = `${(anchorRect.right + anchorRect.left) / 2 - tooltipRect.width / 2}px`;
        }
        tooltipElement.style.top = `${anchorRect.bottom + scrollOffset + 16}px`;
        tooltipElement.setAttribute("aria-hidden", "false");
      }, 1e3);
    }
  };
  const onBlurHandler = () => {
    var _a;
    (_a = tooltipRef.current) == null ? void 0 : _a.setAttribute("aria-hidden", "true");
  };
  const onKeyDownHandler = (event) => {
    var _a, _b, _c, _d;
    if (event.key === "Escape") {
      event.stopPropagation();
      (_a = tooltipRef.current) == null ? void 0 : _a.setAttribute("aria-hidden", "true");
    } else if (event.key === " " || event.key === "Space") {
      event.preventDefault();
      if (((_b = tooltipRef.current) == null ? void 0 : _b.getAttribute("aria-hidden")) === "true") {
        (_c = tooltipRef.current) == null ? void 0 : _c.setAttribute("aria-hidden", "false");
      } else {
        (_d = tooltipRef.current) == null ? void 0 : _d.setAttribute("aria-hidden", "true");
      }
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: React.cloneElement(triggerElement, {
    id: triggerId,
    tabIndex: 0,
    "aria-haspopup": "true",
    "aria-labelledby": tooltipId,
    onMouseEnter: onMouseEnterHandler,
    onKeyDown: onKeyDownHandler,
    onFocus: onFocusHandler,
    onMouseLeave: onMouseLeaveHandler,
    onBlur: onBlurHandler,
    onPointerDown: onClickHandler,
    ref: triggerRef,
    ...props
  }) });
};
const portalRoot = document.querySelector("body");
const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, portalRoot);
};
const Content = ({
  className,
  children,
  ...props
}) => {
  const { tooltipRef, timerRef } = useTooltipContext();
  const onMouseEnterHandler = () => {
    var _a;
    if (((_a = tooltipRef.current) == null ? void 0 : _a.getAttribute("aria-hidden")) === "false") {
      clearTimeout(timerRef.current);
    }
  };
  const onMouseLeaveHandler = () => {
    timerRef.current = setTimeout(() => {
      var _a;
      (_a = tooltipRef.current) == null ? void 0 : _a.setAttribute("aria-hidden", "true");
    }, 500);
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      "aria-hidden": "true",
      role: "tooltip",
      onMouseEnter: onMouseEnterHandler,
      onMouseLeave: onMouseLeaveHandler,
      className: cn(
        "absolute isolate aria-[hidden=false]:visible aria-[hidden=true]:invisible",
        className
      ),
      ref: tooltipRef,
      children
    }
  );
};
const TelegramLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAU7SURBVHgBnVdBbBtFFP0zu3Ztt2lsoJUoSLYPQEoPzYH0SBOpOachohIXoGeQ2muFhAkHrlCpPbeBQxGVmvRSDgiSXtMD6YHGCEQcpIBEVbwhTePE9n7+jHfGf8Z2aBlls7uzM/Pfe//P/2MBT9lK19byB3P5KQzicUB5EgBL1F1IPkeIsCYA78dSLjW2otu18+XoadYV/zVg5MafJSHTF4QU7yPAMJsoQAgERPoHqN7NXX2PEa+LQH6yOlNY/18AFONs7nCFVrwg2DjUfwyA6kPsLiiEfe+AkpXqucKnzwRAsYYg/QMtVjIG1MKKrTKq3znjRAkOkIOkViM1JvqpIf2OE7fqJ0GmFmly2TJhrJzJQkugATmGhTAPRq0ytHHx1a9p7f0USPy9SFyKDP2+ICzTpPE48JWhh3UI5DhXwlWAG/cMGNn1JQTwq4e9Mmziw8RMp78I7XipdK2e7wEw8k39Y7JQNJP4otzXul9FfqKGvbM5ui9hbgF1ERazuVaFkbNB95sjqZGPBR2Pev5u+/xA9dzm7JBAlpUrOgoEqYqR3UhqAssu5DE3RvrFxbGsgDPH0uJQ2CXkuzVuxRf1t9H5er7RjP+2kdul5DDs29gYZWymnIGJF0Nx6mhKf750bxsXaruWuZesop1tWQ4be+0pSKRzAiYxwLOcYcMj/bXhAKZLaboOiKGUS+Lxno4Df54JzOHMUHsqpMdxvRQxEYaVGuAnnISFeR47EuKHr2fVfWA23WrGzjsHr0G0xelQSjGK6hvzrWXeUQKNhcNpCe++coCujMN2q4nw5S8N1Q+8/0HURpWsqC6YLaGCSBgw9D4akpWiompkT4IKuZ9HCiGeLabhLfIx+dphvPywCR8tb8MHJ3JIxu23f/ZQAxMmjnqTkvJ7WcVpnhsTbPu98UIASmYKKtErL8KVn3bgq1938bOxg0AAnTHVzZbJkN1E4RcyxHxojRqUydi5Nw/ZaPbbvYctuLT8WIOYOz3UNw6UApopJ8WTW2d7o1KgblRg6RYWfm/iVgvFqSMp61fLmvx9KCWQjIvjhf5BqECaGDLGBNtp+kOMkZq9TgMKHQE0Uq2E2r/zaw3tq7GjKXw5J8V3G3uoQKhgvDU5JF7KBTCokQvQSVImZ7CdRK0W0kZZocdRVvn0IFNo1PPyX01YZsiVKvsZ1y7Y7UgueI7xUjidsu5LqtN3zSSzE+yeT9TQYEyqpr/v/9iDq+SKgcZJpZ8325Y5T3DcBUR+SWYywQKoOEjyvF96oYvOSctXHuzg5J0INrbjHgDVqNU1ZAiwdGzGNbbgtlyZLkTUNWfYMf8Ar3622rGmjE9+u4m+GtV6G8y5wS/btoiBuF47X4h0NcSWvGwOEbakArgTDZCkKvIKeXW1gWfubOLGk1jvlHkKYDOeg7bqKkVkZjbp67TjNx99TstddA4frKb3q/XgbStexPhxzgGg6wzMVt9+3gWgyvJuE38kSkWn+jFDwjuE8Dbo5Oy7kj6ur557rmzm2SOZigVsiwl9cIQ+JdmtFdyy0C5J5DV9wj+YareKGgTZcT7dOZRW3ynUZCjP0jo1Llk/P5pFMSnd3QHdA6l7F7UgTE+vzmTXuc2+aXTkRr0kAlw0h1SWxRyfG0B6iOcyR3ZBzGV2wjc+EIAFcvMRnRVFxQ8qHqRaRiF6zopGPXq8vPtEzqot18/GvgCMGhDEFXp8jwdnD1sWK9QbtWOck2Hui36snwmAaerHRGYIpiCOxyXoU1SRrOaThBOp33/Ut0IY7ja2g4VBjP32LyJcaOAXoYrFAAAAAElFTkSuQmCC";
const InstagramLogo = "data:image/png;base64,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";
const YouTubeLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAWCAYAAAChWZ5EAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGHSURBVHgBxZZLbsIwEIb/mICEEMhCArFMT0B7A3qC9igsEbCEBbdpT1COQE9Auo+Uh5JIWSTpjJVU6aaqiRU+KS87zvyejMdjoWK9XsvhcLi0LGtFh1OWpaSrpKuDBtyHvwloTNB4361uXWp38zy/nE6n959+Pm02G0cI8fGPjxuBhfBEj8fjlxKw3W6vXRlvikjT9Mne7XYv9OygY3jC/MsFKXnE/XgVXbu+CdsW0HR/v98HuQ4mqAVIzUGYTqeYzWbo9XpoAy91jgEtATWDwQCLxQJSypuFKA+0jYHRaKSEjMdj5R1dBAwxmUwwn8+148OYAIY9UBSF1hgbBqA4QhiGSJIEurQWEEUR4jhWInThdGxXG4MDTbIsg+/7oN0Nt0J2A5tPOoPYoOd5SoABAs4Drs4IFmDIOOOKRsHQOTx5QcvmDXeCJn9RqYtqgiu6rwlcqogeVCKi//rMDeiOMx0rvvmVvPf7PTcuq0KUNymn0S11Nq46tniVVUVqULV9Hg6Hc/3eN/2wnATvvR8HAAAAAElFTkSuQmCC";
const EditAccountCredentialsForm = ({ className, onSubmit, ...props }) => {
  const nicknameRef = useRef(null);
  const emailRef = useRef(null);
  const [updateUserCredentials] = useUpdateUserCredentialsMutation();
  const onClickHandler = () => {
    var _a, _b, _c;
    (_a = nicknameRef.current) == null ? void 0 : _a.removeAttribute("readonly");
    (_b = emailRef.current) == null ? void 0 : _b.removeAttribute("readonly");
    (_c = nicknameRef.current) == null ? void 0 : _c.focus();
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { nickname, email } = event.currentTarget;
      await updateUserCredentials({
        nickname: nickname.value,
        email: email.value
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  return /* @__PURE__ */ jsx(
    "form",
    {
      onSubmit: composeEventHandlers(onSubmit, onSubmitHandler),
      className: cnBase("relative w-fit max-w-[75%] gap-y-2", className),
      ...props,
      children: /* @__PURE__ */ jsx(
        Fetch,
        {
          useQuery: useFetchUserDataQuery,
          args: void 0,
          renderSuccess: (user) => /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                defaultValue: user == null ? void 0 : user.nickname,
                name: "nickname",
                autoComplete: "off",
                readOnly: true,
                required: true,
                minLength: 1,
                maxLength: 150,
                ref: nicknameRef,
                className: "w-full truncate border-b-2 border-transparent py-1 text-center text-4xl outline-none focus-visible:border-white"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                defaultValue: user == null ? void 0 : user.email,
                type: "email",
                name: "email",
                autoComplete: "off",
                readOnly: true,
                minLength: 1,
                maxLength: 150,
                ref: emailRef,
                className: "w-full truncate border-b-2 border-transparent text-center font-secondary text-2xl outline-none focus-visible:border-white"
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: onClickHandler,
                className: "absolute right-0 top-0 translate-x-full cursor-pointer p-1 !outline-none",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Edit account credentials" }),
                  /* @__PURE__ */ jsxs(
                    "svg",
                    {
                      width: "15",
                      height: "15",
                      viewBox: "0 0 15 15",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: [
                        /* @__PURE__ */ jsx(
                          "path",
                          {
                            d: "M3.25 4.25H2.5C2.10218 4.25 1.72064 4.40804 1.43934 4.68934C1.15804 4.97064 1 5.35218 1 5.75V12.5C1 12.8978 1.15804 13.2794 1.43934 13.5607C1.72064 13.842 2.10218 14 2.5 14H9.25C9.64782 14 10.0294 13.842 10.3107 13.5607C10.592 13.2794 10.75 12.8978 10.75 12.5V11.75",
                            stroke: "white",
                            strokeWidth: "1.5",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "path",
                          {
                            d: "M10 2.75008L12.25 5.00008M13.2888 3.93883C13.5841 3.64345 13.7501 3.24282 13.7501 2.82508C13.7501 2.40734 13.5841 2.00672 13.2888 1.71133C12.9934 1.41595 12.5927 1.25 12.175 1.25C11.7573 1.25 11.3566 1.41595 11.0613 1.71133L4.75 8.00008V10.2501H7L13.2888 3.93883Z",
                            stroke: "white",
                            strokeWidth: "1.5",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx("button", { children: /* @__PURE__ */ jsxs(
              "svg",
              {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ jsx(
                    "rect",
                    {
                      x: "0.5",
                      y: "0.5",
                      width: "23",
                      height: "23",
                      rx: "3.5",
                      stroke: "#793AFF"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      d: "M18.5227 6.14171C18.3286 5.95277 18.0193 5.95276 17.8252 6.1417L10.3702 13.3981C10.176 13.587 9.86678 13.587 9.67266 13.3981L7.19778 11C7.00366 10.8111 6.6944 10.8111 6.50028 11L4.62391 12.8264C4.42224 13.0227 4.42224 13.3467 4.62391 13.5429L7.42818 16.2616L9.6896 18.4628C9.88371 18.6517 10.193 18.6517 10.3871 18.4628L12.6316 16.2781L20.416 8.70117C20.6177 8.50487 20.6177 8.18087 20.416 7.98458L18.5227 6.14171Z",
                      fill: "#793AFF"
                    }
                  )
                ]
              }
            ) })
          ] })
        }
      )
    }
  );
};
const tooltipData = {
  level: 1,
  revenue: 40,
  turnover: 2,
  deposit: "0 - 50"
};
const ProfilePage = () => {
  const formId = useId();
  return /* @__PURE__ */ jsxs(
    Article,
    {
      variant: "grid",
      className: "lg:grid-cols-[minmax(0,_3fr)_minmax(0,_4fr)_minmax(0,_4fr)]",
      children: [
        /* @__PURE__ */ jsxs(
          Section,
          {
            className: "flex flex-col items-center gap-y-2 overflow-hidden pb-0 text-center md:px-4",
            children: [
              /* @__PURE__ */ jsx("header", { className: "self-start text-2xl", children: /* @__PURE__ */ jsxs("h2", { children: [
                "LVL ",
                /* @__PURE__ */ jsx("strong", { className: "text-violet-primary", children: "1" }),
                " ",
                /* @__PURE__ */ jsxs(Root, { children: [
                  /* @__PURE__ */ jsx(Trigger, { children: /* @__PURE__ */ jsx("a", { children: /* @__PURE__ */ jsxs(
                    "svg",
                    {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 14 14",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      className: "mb-0.5 inline-block cursor-help",
                      children: [
                        /* @__PURE__ */ jsx(
                          "path",
                          {
                            d: "M14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7Z",
                            fill: "#555555"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "path",
                          {
                            d: "M6.11111 5H6.55556L7.88889 5.84V11H6.11111V5ZM6 3.044V2.9C6 2.408 6.21111 2 6.95556 2H7.04444C7.78889 2 8 2.408 8 2.9V3.044C8 3.536 7.78889 3.944 7.04444 3.944H6.95556C6.21111 3.944 6 3.536 6 3.044Z",
                            fill: "white"
                          }
                        )
                      ]
                    }
                  ) }) }),
                  /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsx(Content, { className: "z-50 max-w-[calc(100dvw_-_2rem)] rounded-xl border-2 border-violet-primary bg-[#211F26] shadow-md", children: /* @__PURE__ */ jsxs("section", { className: "px-4 pt-2 text-white", children: [
                    /* @__PURE__ */ jsxs("header", { children: [
                      /* @__PURE__ */ jsx("h3", { className: "font-primary text-xl", children: "Уровень партнера" }),
                      /* @__PURE__ */ jsx("p", { className: "mt-2 text-base", children: "Увеличивай число депозитов и получай больше прибыли !" })
                    ] }),
                    /* @__PURE__ */ jsx(
                      Table,
                      {
                        uniqueKey: "id",
                        headers: [
                          "Уровень",
                          "Доход",
                          "Оборот",
                          "Депозит"
                        ],
                        data: Array(5).fill(
                          tooltipData
                        ),
                        components: {
                          TableCaption: () => /* @__PURE__ */ jsx("caption", { children: "Caption" })
                        },
                        renderHeader: (headers) => /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx(TableRow, { children: headers.map(
                          (header, i) => /* @__PURE__ */ jsx(
                            "th",
                            {
                              className: "bg-[#36343B] px-3 py-1.5 text-sm font-normal normal-case",
                              children: header
                            },
                            i
                          )
                        ) }) }),
                        renderData: (data) => /* @__PURE__ */ jsx("tbody", { className: "text-center", children: data.map((row, i) => /* @__PURE__ */ jsx(
                          "tr",
                          {
                            className: "bg-[#4A484F] first:bg-violet-primary",
                            children: Object.values(
                              row
                            ).map((cell, j) => /* @__PURE__ */ jsx(
                              "td",
                              {
                                className: "px-3 py-1.5",
                                children: cell
                              },
                              j
                            ))
                          },
                          i
                        )) }),
                        className: "mt-2 border-separate border-spacing-x-0 border-spacing-y-0.5 rounded-lg shadow-lg"
                      }
                    ),
                    /* @__PURE__ */ jsxs("footer", { className: "-mx-4 mt-2 rounded-b-xl bg-violet-primary py-2.5 text-center", children: [
                      /* @__PURE__ */ jsx("p", { className: "font-primary text-xl/none", children: "FTD 26 / 99" }),
                      /* @__PURE__ */ jsx("p", { children: "до следующего уровня" })
                    ] })
                  ] }) }) })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx(UpdateUserPhotoForm, {}),
              /* @__PURE__ */ jsx(EditAccountCredentialsForm, {}),
              /* @__PURE__ */ jsxs("div", { className: "my-2 w-full rounded-xl bg-quaternary px-2.5 py-1.5 font-secondary text-lg", children: [
                /* @__PURE__ */ jsx("p", { className: "text-start", children: "Привлечение реферралов из:" }),
                /* @__PURE__ */ jsxs("ul", { className: "mt-3 flex gap-x-2", children: [
                  /* @__PURE__ */ jsx("li", { className: "flex size-12 items-center justify-center rounded-lg bg-[#2b2930]", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: TelegramLogo,
                      alt: "Telegram"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("li", { className: "flex size-12 items-center justify-center rounded-lg bg-[#2b2930]", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: InstagramLogo,
                      alt: "Instagram"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("li", { className: "flex size-12 items-center justify-center rounded-lg bg-[#2b2930]", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: YouTubeLogo,
                      alt: "YouTube"
                    }
                  ) })
                ] })
              ] }),
              /* @__PURE__ */ jsx("footer", { className: "-mx-6 mt-auto h-9 w-[calc(100%_+_3rem)] rounded-b-2xl text-center leading-9", children: /* @__PURE__ */ jsx(
                FTDMeter,
                {
                  "aria-valuenow": 30,
                  "aria-valuemax": 99
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(BalanceCard, {}),
        /* @__PURE__ */ jsxs(Section, { className: "grid grid-rows-[auto_auto_1fr] gap-y-4 md:px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl", children: "Безопасность" }),
          /* @__PURE__ */ jsx(ChangePasswordForm, { id: formId }),
          /* @__PURE__ */ jsx(
            Button,
            {
              form: formId,
              className: "h-11 lg:self-end lg:justify-self-end",
              children: "Сменить пароль"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Section, { className: "lg:col-span-3", children: [
          /* @__PURE__ */ jsxs("header", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("h2", { children: "Кошельки" }),
            /* @__PURE__ */ jsx(AttachWalletDialog, {})
          ] }),
          /* @__PURE__ */ jsx(WalletListWidget, {})
        ] })
      ]
    }
  );
};
export {
  ProfilePage
};
