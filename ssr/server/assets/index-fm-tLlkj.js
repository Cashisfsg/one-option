import { jsx, jsxs } from "react/jsx-runtime";
import { u as useFetchUserBalanceQuery } from "./api-C06svCjp.js";
import { F as Fetch } from "./fetch-g_nB-b8P.js";
import { S as Section } from "./section-CAb_CRJf.js";
import { T as Title } from "../main.js";
import { cnBase } from "tailwind-variants";
import { T as Table } from "./table-BZGxj-lc.js";
import { L as LineChart } from "./line-chart-Dyi8V-hF.js";
import { A as Article } from "./article-KiRtUD3R.js";
import "react";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react-router-dom";
import "react-redux";
import "@reduxjs/toolkit";
import "@reduxjs/toolkit/query/react";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "d3";
import "react-use-measure";
const BalanceOverviewList = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      className: cnBase(
        "grid gap-3 sm:grid-cols-3 md:gap-4 lg:gap-6",
        className
      ),
      ...props
    }
  );
};
const BalanceOverviewListItem = ({ label, value, className, ...props }) => {
  return /* @__PURE__ */ jsx(
    "li",
    {
      className: cnBase(
        "rounded-xl bg-tertiary px-3-4-xs-md py-3 first-of-type:bg-violet-primary",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxs("dl", { className: "grid grid-cols-2 grid-rows-2", children: [
        /* @__PURE__ */ jsx("dt", { className: "col-span-2 text-sm-base-xs-lg", children: label }),
        /* @__PURE__ */ jsxs("dd", { className: "col-span-2 justify-self-center text-2xl-3xl-xs-lg lg:col-start-2", children: [
          value,
          " $"
        ] })
      ] })
    }
  );
};
const balance = [
  {
    id: 1,
    label: "Общий доход",
    key: "total_income"
  },
  {
    id: 2,
    label: "Доля от оборота",
    key: "income_oborot"
  },
  {
    id: 3,
    label: "Доля от дохода",
    key: "income_doxod"
  }
];
const BalanceOverview = () => {
  return /* @__PURE__ */ jsxs(Section, { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(Title, { as: "h2", children: "Ваш баланс" }),
    /* @__PURE__ */ jsx(
      Fetch,
      {
        useQuery: useFetchUserBalanceQuery,
        args: void 0,
        renderSuccess: (data2) => /* @__PURE__ */ jsx(BalanceOverviewList, { children: balance.map((value) => /* @__PURE__ */ jsx(
          BalanceOverviewListItem,
          {
            label: value.label,
            value: data2[value.key]
          },
          value.id
        )) })
      }
    )
  ] });
};
const Root = (props) => {
  return /* @__PURE__ */ jsx("search", { ...props });
};
Root.displayName = "Search.Root";
const Form = (props) => {
  return /* @__PURE__ */ jsx("form", { ...props });
};
Form.displayName = "Search.Form";
const Input = ({
  type = "search",
  name = "query",
  autoComplete = "off",
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      name,
      autoComplete,
      ...props
    }
  );
};
Input.displayName = "Search.Input";
const Button = (props) => {
  return /* @__PURE__ */ jsx("button", { ...props });
};
Button.displayName = "Search.Button";
const SearchReferralForm = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return /* @__PURE__ */ jsx(Root, { className: "flex justify-end", children: /* @__PURE__ */ jsxs(
    Form,
    {
      onSubmit: onSubmitHandler,
      className: "grid h-11 w-full max-w-96 grid-cols-[1fr_auto] rounded-full bg-quaternary",
      children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "ID пользователя или Email",
            className: "h-full w-full rounded-l-full bg-transparent px-4 placeholder:text-white/15"
          }
        ),
        /* @__PURE__ */ jsxs(Button, { className: "flex size-11 items-center justify-center rounded-r-full", children: [
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Поиск" }),
          /* @__PURE__ */ jsx(
            "svg",
            {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M17.6132 15.5158C18.7994 13.901 19.5 11.9073 19.5 9.75C19.5 4.36522 15.1348 0 9.75 0C4.36522 0 0 4.36522 0 9.75C0 15.1348 4.36522 19.5 9.75 19.5C11.9079 19.5 13.902 18.799 15.5171 17.6123L15.5158 17.6132C15.5601 17.6732 15.6093 17.7307 15.6636 17.785L21.4393 23.5607C22.0251 24.1465 22.9749 24.1465 23.5607 23.5607C24.1465 22.9749 24.1465 22.0251 23.5607 21.4393L17.785 15.6636C17.7307 15.6093 17.6732 15.5601 17.6132 15.5158ZM18 9.75C18 14.3063 14.3063 18 9.75 18C5.19365 18 1.5 14.3063 1.5 9.75C1.5 5.19365 5.19365 1.5 9.75 1.5C14.3063 1.5 18 5.19365 18 9.75Z",
                  fill: "white"
                }
              )
            }
          )
        ] })
      ]
    }
  ) });
};
const data = Array(6).fill({
  number: 1,
  nick: "Ник",
  id: 3621548,
  as: "70%",
  asd: "231 $",
  fds: "378 $",
  gdf: "571 $",
  gdfd: "572 $",
  gdfg: "573 $"
});
const StatisticPage = () => {
  return /* @__PURE__ */ jsxs(Article, { children: [
    /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx(
      LineChart,
      {
        data: [
          [1, 1],
          [2, 2]
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(BalanceOverview, {}),
    /* @__PURE__ */ jsxs(Section, { children: [
      /* @__PURE__ */ jsxs("header", { className: "grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsx(
          Title,
          {
            as: "h2",
            className: "whitespace-nowrap text-lg-xl-xs-lg",
            children: "Таблица рефералов"
          }
        ),
        /* @__PURE__ */ jsx(SearchReferralForm, {})
      ] }),
      /* @__PURE__ */ jsx("div", { className: "scrollbar", children: /* @__PURE__ */ jsx(
        Table,
        {
          headers: [
            "#",
            "Никнейм",
            "ID",
            "Доходность",
            "Оборот",
            "Депозиты",
            "Выводы",
            "Баланс",
            "Прибыль"
          ],
          data
        }
      ) })
    ] })
  ] });
};
export {
  StatisticPage
};
