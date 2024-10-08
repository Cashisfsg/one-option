import { jsx, Fragment } from "react/jsx-runtime";
import "react";
const useFetch = (useQuery, args) => {
  return useQuery(args);
};
const Fetch = ({
  useQuery,
  args,
  renderSuccess,
  loadingFallback = /* @__PURE__ */ jsx("div", { className: "flex w-full items-center justify-center px-3", children: "Loading..." }),
  renderError = (error) => /* @__PURE__ */ jsx("pre", { className: "self-center text-center text-red-700", children: error || "Неизвестная ошибка" })
}) => {
  var _a;
  const { data, isLoading, isSuccess, isError, error } = useFetch(
    useQuery,
    args
  );
  if (isLoading)
    return loadingFallback;
  if (isError)
    return renderError((_a = error == null ? void 0 : error.data) == null ? void 0 : _a.message);
  if (isSuccess)
    return renderSuccess(data);
  return /* @__PURE__ */ jsx(Fragment, {});
};
export {
  Fetch as F
};
