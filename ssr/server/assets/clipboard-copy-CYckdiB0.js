import { jsxs, jsx } from "react/jsx-runtime";
import { c as composeEventHandlers } from "./compose-event-handlers-xlGPYA7j.js";
const ClipboardCopy = ({
  textToCopy,
  onSubmit,
  ...props
}) => {
  const copyToClipboard = async (event) => {
    event.preventDefault();
    if (textToCopy === void 0)
      return;
    try {
      await navigator.clipboard.writeText(String(textToCopy));
    } catch (error) {
      console.error(error);
    }
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: composeEventHandlers(onSubmit, copyToClipboard),
      className: "grid grid-cols-[minmax(0,_1fr)_auto] gap-x-2 @container",
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "h-11 rounded-md bg-quaternary px-4 py-3 text-sm-base-xs-sm",
            defaultValue: textToCopy,
            readOnly: true
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            title: "Скопировать в буфер обмена",
            className: "flex size-11 items-center justify-center rounded-md bg-violet-primary",
            children: [
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Скопировать в буфер обмена" }),
              /* @__PURE__ */ jsxs(
                "svg",
                {
                  width: "20",
                  height: "20",
                  viewBox: "0 0 26 26",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: [
                    /* @__PURE__ */ jsx("g", { clipPath: "url(#clip0_140_1511)", children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        d: "M7.8 7.8V2.6C7.8 1.17 8.97 0 10.4 0H23.4C24.0896 0 24.7509 0.273928 25.2385 0.761522C25.7261 1.24912 26 1.91044 26 2.6V15.6C26 16.2896 25.7261 16.9509 25.2385 17.4385C24.7509 17.9261 24.0896 18.2 23.4 18.2H18.2V23.4C18.2 24.0896 17.9261 24.7509 17.4385 25.2385C16.9509 25.7261 16.2896 26 15.6 26H2.6C1.91044 26 1.24912 25.7261 0.761522 25.2385C0.273928 24.7509 0 24.0896 0 23.4V10.4C0 8.97 1.17 7.8 2.6 7.8H7.8ZM10.4 7.8H15.6C16.2896 7.8 16.9509 8.07393 17.4385 8.56152C17.9261 9.04912 18.2 9.71044 18.2 10.4V15.6H23.4V2.6H10.4V7.8ZM2.6 10.4V23.4H15.6V10.4H2.6Z",
                        fill: "#FEF7FF"
                      }
                    ) }),
                    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "clip0_140_1511", children: /* @__PURE__ */ jsx(
                      "rect",
                      {
                        width: "26",
                        height: "26",
                        fill: "#FEF7FF"
                      }
                    ) }) })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
};
export {
  ClipboardCopy as C
};
