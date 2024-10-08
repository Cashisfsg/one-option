import { jsxs, jsx } from "react/jsx-runtime";
import { A as Article } from "./article-KiRtUD3R.js";
import { S as Section } from "./section-CAb_CRJf.js";
import { C as ClipboardCopy } from "./clipboard-copy-CYckdiB0.js";
import { T as Title } from "../main.js";
import "class-variance-authority";
import "./compose-event-handlers-xlGPYA7j.js";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react";
import "react-router-dom";
import "react-redux";
import "@reduxjs/toolkit";
import "@reduxjs/toolkit/query/react";
import "tailwind-variants";
import "clsx";
import "tailwind-merge";
const SubReferralPage = () => {
  return /* @__PURE__ */ jsxs(
    Article,
    {
      variant: "grid",
      className: "md:grid-cols-2",
      children: [
        /* @__PURE__ */ jsxs(Section, { className: "space-y-4 @container", children: [
          /* @__PURE__ */ jsx(
            Title,
            {
              as: "h2",
              className: "text-xl-2xl-xs-sm",
              children: "Ссылка для привлечения партнеров"
            }
          ),
          /* @__PURE__ */ jsx(ClipboardCopy, { textToCopy: "https//referal.link/nameadminname" }),
          /* @__PURE__ */ jsx("p", { className: "font-secondary text-base-lg-xs-md", children: "Привлекайте других партнеров в нашу партнерскую программу. И получайте % от их заработка. Подробнее на странице Партнерские программы. Ниже выводится статистика по привлеченным партнерам. Обновляется раз в неделю." })
        ] }),
        /* @__PURE__ */ jsx(Section, { className: "@container", children: /* @__PURE__ */ jsxs(
          Title,
          {
            as: "h2",
            className: "text-xl-2xl-xs-sm",
            children: [
              "Комиссионные",
              " "
            ]
          }
        ) })
      ]
    }
  );
};
export {
  SubReferralPage
};
