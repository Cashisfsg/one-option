import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { r as rootApi, T as Title } from "../main.js";
import { F as Fetch } from "./fetch-g_nB-b8P.js";
import { L as LineChart } from "./line-chart-Dyi8V-hF.js";
import { A as Article } from "./article-KiRtUD3R.js";
import { S as Section } from "./section-CAb_CRJf.js";
import { T as Table } from "./table-BZGxj-lc.js";
import { cnBase } from "tailwind-variants";
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
const referenceApi = rootApi.enhanceEndpoints({ addTagTypes: ["Reference"] }).injectEndpoints({
  endpoints: (builder) => ({
    fetchReferenceStatistic: builder.query({
      query: () => "/profile/mainpage"
    }),
    fetchReferenceChartData: builder.query({
      query: ({ frequency }) => `/profile/mainpage/chart_${frequency}`
    })
  })
});
const {
  useFetchReferenceStatisticQuery,
  useLazyFetchReferenceStatisticQuery,
  useFetchReferenceChartDataQuery,
  useLazyFetchReferenceChartDataQuery
} = referenceApi;
const ReferenceActivityChart = ({
  frequency
}) => {
  return /* @__PURE__ */ jsx(
    Fetch,
    {
      useQuery: useFetchReferenceChartDataQuery,
      args: { frequency },
      renderSuccess: (data2) => /* @__PURE__ */ jsx(LineChart, { data: data2 })
    }
  );
};
const DashboardSprite = "/assets/dashboard-sprite.svg";
const ReferenceStatisticListItem = ({ className, data: data2, statistic, ...props }) => {
  return /* @__PURE__ */ jsxs(
    "li",
    {
      className: cnBase(
        "grid grid-cols-2 gap-y-3 rounded-2xl bg-[#2b2930] px-4 py-3 @container first:bg-violet-primary [&:nth-child(2)]:bg-violet-secondary",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("h2", { className: "col-span-2 row-start-3 text-sm/none @[15rem]:row-start-1 @[15rem]:text-lg/none", children: statistic.label }),
        /* @__PURE__ */ jsx(
          "svg",
          {
            width: "45",
            height: "45",
            children: /* @__PURE__ */ jsx("use", { xlinkHref: `${DashboardSprite}#${statistic.icon}` })
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "col-span-2 mt-4 self-center text-2xl leading-none @[15rem]:col-span-1 @[15rem]:mt-0 @[15rem]:text-3xl", children: [
          data2 == null ? void 0 : data2[statistic.key],
          " $"
        ] })
      ]
    }
  );
};
const ReferenceStatisticList = ({
  className,
  data: data2,
  statisticList: statisticList2,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      className: cnBase(
        "grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-7",
        className
      ),
      ...props,
      children: statisticList2.map((statistic) => /* @__PURE__ */ jsx(
        ReferenceStatisticListItem,
        {
          data: data2,
          statistic
        },
        statistic.id
      ))
    }
  );
};
const ReferenceStatisticListItemSkeleton = ({ className, statistic, ...props }) => {
  return /* @__PURE__ */ jsxs(
    "li",
    {
      className: cnBase(
        "grid grid-cols-2 gap-y-3 rounded-2xl bg-[#2b2930] px-4 py-3 @container first:bg-violet-primary [&:nth-child(2)]:bg-violet-secondary",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("h2", { className: "col-span-2 row-start-3 text-sm/none @[15rem]:row-start-1 @[15rem]:text-lg/none", children: statistic.label }),
        /* @__PURE__ */ jsx(
          "svg",
          {
            width: "45",
            height: "45",
            children: /* @__PURE__ */ jsx("use", { xlinkHref: `${DashboardSprite}#${statistic.icon}` })
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "col-span-2 mt-4 h-5 w-24 animate-pulse self-center rounded-full bg-white/70 text-2xl leading-none @[15rem]:col-span-1 @[15rem]:mt-0 @[15rem]:text-3xl" })
      ]
    }
  );
};
const statisticList = [
  { id: 1, label: "Всего кликов", key: "all_click", icon: "pie_chart" },
  { id: 2, label: "Регситраций", key: "register_count", icon: "bar_chart" },
  { id: 3, label: "Депозиты", key: "deposit", icon: "fluent_money_model_2" },
  { id: 4, label: "FTD's", key: "ftd_count", icon: "money_deposit" },
  { id: 5, label: "Вывод", key: "ftd_sum", icon: "fluent_money_model_1" },
  { id: 6, label: "P/L трейдеров", key: "witdraw_ref", icon: "scan_focus" },
  { id: 7, label: "Оборот", key: "oborot", icon: "money_exchange" }
];
const ReferenceStatistic = () => {
  return /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx(
    Fetch,
    {
      useQuery: useFetchReferenceStatisticQuery,
      args: void 0,
      renderSuccess: (statistic) => /* @__PURE__ */ jsx(
        ReferenceStatisticList,
        {
          data: statistic,
          statisticList
        }
      ),
      loadingFallback: /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-7", children: statisticList.map((statistic) => /* @__PURE__ */ jsx(
        ReferenceStatisticListItemSkeleton,
        {
          statistic
        },
        statistic.id
      )) })
    }
  ) });
};
const data = [
  {
    id: "#709247",
    url: "broker-qx.pro/sign-up/?lid=709247",
    type: "Ссылка на регистрацию",
    program: "Доля дохода",
    date: "26.03.2024"
  },
  {
    id: "#709243",
    url: "broker-qx.pro/sign-up/?lid=709247",
    type: "Ссылка на регистрацию",
    program: "Доля дохода",
    date: "26.03.2024"
  }
];
const DashboardPage = () => {
  const [frequency, setFrequency] = useState(
    "monthly"
  );
  const onClickHandler = (frequency2) => {
    setFrequency(frequency2);
  };
  return /* @__PURE__ */ jsxs(Article, { variant: "block", children: [
    /* @__PURE__ */ jsx(ReferenceStatistic, {}),
    /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsxs("header", { className: "flex flex-wrap items-center justify-between gap-3 font-secondary", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-6", children: [
        /* @__PURE__ */ jsx(
          Title,
          {
            as: "h2",
            className: "text-lg-xl-xs-lg",
            children: "График активностей ссылки"
          }
        ),
        /* @__PURE__ */ jsxs("ul", { className: "hidden items-center gap-x-6 lg:flex", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-x-3", children: [
            /* @__PURE__ */ jsx("span", { className: "size-7 rounded-md bg-[#FF8551]" }),
            /* @__PURE__ */ jsx("span", { children: "Клики" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-x-3", children: [
            /* @__PURE__ */ jsx("span", { className: "size-7 rounded-md bg-[#009A0F]" }),
            /* @__PURE__ */ jsx("span", { children: "Регистрации" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-x-3", children: [
            /* @__PURE__ */ jsx("span", { className: "size-7 rounded-md bg-[#652CDE]" }),
            /* @__PURE__ */ jsx("span", { children: "FTD" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          role: "radiogroup",
          "aria-label": "Периодичность активности ссылки",
          className: "flex items-center gap-x-3 justify-self-center",
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": frequency === "monthly",
                tabIndex: -1,
                onClick: () => onClickHandler("monthly"),
                className: "rounded-md px-5 py-2.5 text-base-lg-xs-lg aria-[checked=false]:bg-[#2b2930] aria-[checked=true]:bg-violet-primary",
                children: "Месяц"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": frequency === "weekly",
                tabIndex: -1,
                onClick: () => onClickHandler("weekly"),
                className: "rounded-md px-5 py-2.5 text-base-lg-xs-lg aria-[checked=false]:bg-[#2b2930] aria-[checked=true]:bg-violet-primary",
                children: "Неделя"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": frequency === "daily",
                tabIndex: -1,
                onClick: () => onClickHandler("daily"),
                className: "rounded-md px-5 py-2.5 text-base-lg-xs-lg aria-[checked=false]:bg-[#2b2930] aria-[checked=true]:bg-violet-primary",
                children: "День"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(ReferenceActivityChart, { frequency })
    ] }) }),
    /* @__PURE__ */ jsxs(Section, { children: [
      /* @__PURE__ */ jsx(
        Title,
        {
          as: "h2",
          className: "text-center text-lg-xl-xs-lg",
          children: "Ссылки на приглашение"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "scrollbar", children: /* @__PURE__ */ jsx(
        Table,
        {
          uniqueKey: "id",
          rowHeaderKey: "id",
          headers: ["id", "ссылка", "тип", "программа", "дата"],
          data,
          renderColumns: /* @__PURE__ */ jsxs("colgroup", { children: [
            /* @__PURE__ */ jsx("col", {}),
            /* @__PURE__ */ jsx("col", { className: "text-lg text-red-500" }),
            /* @__PURE__ */ jsx("col", {}),
            /* @__PURE__ */ jsx("col", {}),
            /* @__PURE__ */ jsx("col", {})
          ] }),
          components: {
            // TableRow: <tr className="bg-red-600" />
          }
        }
      ) })
    ] })
  ] });
};
export {
  DashboardPage
};
