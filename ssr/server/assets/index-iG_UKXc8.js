import { jsxs, jsx } from "react/jsx-runtime";
import { cnBase } from "tailwind-variants";
import { u as useFetchWithdrawListQuery, R as Root, I as Input$1, T as Trigger, M as Menu, O as Option, B as Button } from "./select-DaCVrgOW.js";
import { F as Fetch } from "./fetch-g_nB-b8P.js";
import { I as Input } from "./input-BqtPcIo-.js";
import { c as composeEventHandlers } from "./compose-event-handlers-xlGPYA7j.js";
import { A as Article } from "./article-KiRtUD3R.js";
import { S as Section } from "./section-CAb_CRJf.js";
import "../main.js";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react";
import "react-router-dom";
import "react-redux";
import "@reduxjs/toolkit";
import "@reduxjs/toolkit/query/react";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
const WithdrawalForm = ({
  className,
  onSubmit,
  ...props
}) => {
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(Object.fromEntries(new FormData(event.currentTarget)));
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: composeEventHandlers(onSubmit, onSubmitHandler),
      className: cnBase("grid gap-y-4", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxs("label", { children: [
          /* @__PURE__ */ jsx("span", { children: "Сумма" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              inputMode: "numeric",
              name: "amount",
              required: true,
              pattern: "\\d+([.,]\\d{0,2})?",
              placeholder: "Введите сумму в долларах США"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Fetch,
          {
            useQuery: useFetchWithdrawListQuery,
            args: void 0,
            renderSuccess: (wallets) => /* @__PURE__ */ jsxs("fieldset", { className: "grid gap-y-2", children: [
              /* @__PURE__ */ jsx("label", { children: "Кошелек" }),
              /* @__PURE__ */ jsxs(Root, { children: [
                /* @__PURE__ */ jsx(
                  Input$1,
                  {
                    name: "wallet",
                    placeholder: "Выберите кошелек"
                  }
                ),
                /* @__PURE__ */ jsx(Trigger, { children: /* @__PURE__ */ jsx(
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
                    value: wallet == null ? void 0 : wallet.wallet,
                    children: wallet == null ? void 0 : wallet.wallet
                  },
                  wallet == null ? void 0 : wallet.wallet
                )) })
              ] })
            ] }),
            loadingFallback: /* @__PURE__ */ jsxs("label", { children: [
              /* @__PURE__ */ jsx("span", { children: "Кошелек" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Выберите кошелёк",
                  required: true,
                  readOnly: true
                }
              )
            ] }),
            renderError: () => /* @__PURE__ */ jsxs("label", { children: [
              /* @__PURE__ */ jsx("span", { children: "Кошелек" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Выберите кошелёк",
                  required: true,
                  readOnly: true
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx(Button, { className: "ml-auto mt-4 block", children: "Вывести" })
      ]
    }
  );
};
const FAQ = () => {
  return /* @__PURE__ */ jsxs(Section, { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl-2xl-xs-lg", children: "Часто задаваемые вопросы" }),
    /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("dl", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("dt", { className: "text-lg-xl-xs-lg", children: 'Что значит статус "Обработка"?' }),
        /* @__PURE__ */ jsx("dd", { className: "font-secondary text-base-lg-xs-lg", children: "Средства отправлены финансовому провайдеру и ожидают проводки на его стороне. Срок зачисления - до 3-х суток. Ожидайте, пожалуйста. С нашей стороны мы никак ускорить процесс не можем." })
      ] }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("dl", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("dt", { className: "text-lg-xl-xs-lg", children: 'Статус сменился на "Завершен", но деньги не поступили' }),
        /* @__PURE__ */ jsx("dd", { className: "font-secondary text-base-lg-xs-lg", children: "Срок зачисления средств до 3-х суток. Ожидайте, деньги придут. Если спустя 3-е суток средства не поступили - напишите нам." })
      ] }) }),
      /* @__PURE__ */ jsxs("dl", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("dt", { className: "text-lg-xl-xs-lg", children: "Деньги пришли не полностью" }),
        /* @__PURE__ */ jsx("dd", { className: "font-secondary text-base-lg-xs-lg", children: "Вывод средств на карту может разбиваться на части, части могут приходить в разное время. Не переживайте, средства поступят. Если в течение 3-х суток средства не поступили - обратитесь к нам." })
      ] })
    ] })
  ] });
};
const WithdrawalPage = () => {
  return /* @__PURE__ */ jsxs(
    Article,
    {
      variant: "grid",
      className: "lg:grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)]",
      children: [
        /* @__PURE__ */ jsxs(Section, { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl-2xl-xs-lg", children: "Вывод средств" }),
          /* @__PURE__ */ jsx(WithdrawalForm, {})
        ] }),
        /* @__PURE__ */ jsx(FAQ, {})
      ]
    }
  );
};
export {
  WithdrawalPage
};
