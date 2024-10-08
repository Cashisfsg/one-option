import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { c as cn } from "../main.js";
const TableContext = React.createContext(null);
const useTableContext = () => {
  const context = React.useContext(TableContext);
  if (!context) {
    throw new Error(
      "Component must be rendered as child of Table component"
    );
  }
  return context;
};
const Table = ({
  uniqueKey,
  headers,
  data,
  components,
  renderColumns: columns,
  renderHeaders,
  renderData,
  className,
  ...props
}) => {
  const context = React.useMemo(
    () => ({ uniqueKey, components }),
    [uniqueKey, components]
  );
  return /* @__PURE__ */ jsx(TableContext.Provider, { value: context, children: /* @__PURE__ */ jsxs(
    "table",
    {
      ...props,
      className: cn(
        "w-full overflow-hidden rounded-2xl bg-secondary",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(Caption, {}),
        columns,
        /* @__PURE__ */ jsx(
          TableHead,
          {
            headers,
            renderHeaders
          }
        ),
        /* @__PURE__ */ jsx(
          TableBody,
          {
            data,
            renderData
          }
        )
      ]
    }
  ) });
};
const Caption = () => {
  const { components } = useTableContext();
  if (components === void 0 || components.TableCaption === void 0) {
    return null;
  }
  const caption = components == null ? void 0 : components.TableCaption();
  const props = caption.props;
  const children = props == null ? void 0 : props.children;
  return /* @__PURE__ */ jsx(
    "caption",
    {
      className: cn(
        "border-b-4 border-double border-quaternary bg-inherit px-4 py-3 text-lg-xl-xs-lg",
        props == null ? void 0 : props.className
      ),
      ...props,
      children
    }
  );
};
const TableHead = ({
  headers,
  renderHeaders,
  ...props
}) => {
  if (renderHeaders) {
    return renderHeaders(headers);
  }
  return /* @__PURE__ */ jsx("thead", { ...props, children: /* @__PURE__ */ jsx(TableRow, { children: headers.map((header) => /* @__PURE__ */ jsx(TableHeaderCell, { children: header }, header)) }) });
};
const TableBody = ({
  data,
  renderData,
  ...props
}) => {
  const { uniqueKey } = useTableContext();
  if (renderData) {
    return renderData(data);
  }
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      className: "[&>*:nth-child(odd)]:bg-quaternary",
      ...props,
      children: data.map((row) => {
        var _a;
        const { ...restData } = row;
        return /* @__PURE__ */ jsx(TableRow, { children: (_a = Object.keys(restData)) == null ? void 0 : _a.map((key) => /* @__PURE__ */ jsx(TableCell, { children: row[key] }, key)) }, row[uniqueKey]);
      })
    }
  );
};
const TableRow = ({
  className,
  children,
  ...props
}) => {
  const { components } = useTableContext();
  if (components === void 0 || components.TableRow === void 0)
    return /* @__PURE__ */ jsx(
      "tr",
      {
        className,
        ...props,
        children
      }
    );
  const { TableRow: TableRow2 } = components;
  TableRow2(props).props;
  return;
};
const TableHeaderCell = ({
  className,
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "th",
    {
      ...props,
      scope: "col",
      className: cn("px-4 py-2 text-lg-xl-xs-lg uppercase", className),
      children
    }
  );
};
const TableCell = ({
  className,
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "td",
    {
      ...props,
      className: cn(
        "px-3 py-2 text-center font-secondary text-sm-base-xs-lg",
        className
      ),
      children
    }
  );
};
export {
  Table as T,
  TableRow as a
};
