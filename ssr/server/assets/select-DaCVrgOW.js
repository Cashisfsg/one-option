import { r as rootApi } from "../main.js";
import { jsx } from "react/jsx-runtime";
import { tv, cnBase } from "tailwind-variants";
import { createContext, useContext, useId, useRef, useMemo } from "react";
import { c as composeEventHandlers } from "./compose-event-handlers-xlGPYA7j.js";
const walletApi = rootApi.enhanceEndpoints({ addTagTypes: ["Wallet"] }).injectEndpoints({
  endpoints: (builder) => ({
    fetchWallet: builder.query({
      query: () => "/wallet/"
    }),
    fetchWalletList: builder.query({
      query: () => "/wallet/list",
      providesTags: (result) => result ? [
        ...result.map(({ wallet_id }) => ({
          type: "Wallet",
          id: wallet_id
        })),
        "Wallet"
      ] : ["Wallet"]
    }),
    fetchWithdrawList: builder.query({
      query: () => "/withdraw/"
    }),
    attachWallet: builder.mutation({
      query: (body) => ({
        url: "/wallet/",
        method: "POST",
        body
      }),
      invalidatesTags: (result, error, arg) => error ? [] : [{ type: "Wallet", id: arg.wallet_id }]
    }),
    withdrawal: builder.mutation({
      query: () => ({
        url: "/withdraw/",
        method: "POST"
      })
    })
  })
});
const {
  useFetchWalletQuery,
  useLazyFetchWalletQuery,
  useFetchWalletListQuery,
  useLazyFetchWalletListQuery,
  useFetchWithdrawListQuery,
  useLazyFetchWithdrawListQuery,
  useAttachWalletMutation,
  useWithdrawalMutation
} = walletApi;
const buttonVariants = tv({
  base: "rounded-lg border border-violet-primary select-none",
  variants: {
    variant: {
      primary: "bg-violet-primary px-10 py-2.5",
      outlined: "bg-transparent px-10 py-2.5"
    }
  },
  defaultVariants: {
    variant: "primary"
  }
});
const Button = ({
  variant,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: buttonVariants({ variant, className }),
      ...props
    }
  );
};
const SelectContext = createContext(null);
const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(
      "Component must be rendered as child of Select component"
    );
  }
  return context;
};
const trigger = "_trigger_1bh4m_1";
const menu = "_menu_1bh4m_13";
const root = "_root_1bh4m_35";
const input = "_input_1bh4m_37";
const Select = {
  trigger,
  menu,
  root,
  input
};
const Root = ({ className, ...props }) => {
  const triggerId = `trigger-${useId()}`;
  const selectMenuId = `select-menu-${useId()}`;
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const contextValue = useMemo(
    () => ({
      triggerId,
      selectMenuId,
      inputRef,
      triggerRef,
      menuRef
    }),
    []
  );
  return /* @__PURE__ */ jsx(SelectContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: cnBase(
        Select.root,
        "relative flex h-11 items-stretch justify-between rounded-lg bg-quaternary outline-offset-2 focus-within:outline focus-within:outline-1 focus-within:outline-white has-[button[aria-expanded=true]]:rounded-b-none has-[input[aria-expanded=true]]:rounded-b-none",
        className
      ),
      ...props
    }
  ) });
};
Root.displayName = "Select.Root";
const Input = ({
  type = "text",
  className,
  onClick,
  onKeyDown,
  ...props
}) => {
  const { selectMenuId, triggerRef, inputRef, menuRef } = useSelectContext();
  const onClickHandler = (event) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const input2 = event.currentTarget;
    const isOpen = input2.getAttribute("aria-expanded") === "true";
    if (!isOpen) {
      const activeDescendant = Array.from(((_a = menuRef.current) == null ? void 0 : _a.children) || []).find(
        (child) => child.getAttribute("aria-selected") === "true"
      ) || ((_b = menuRef.current) == null ? void 0 : _b.firstElementChild);
      if (!activeDescendant)
        return;
      const id = activeDescendant.getAttribute("id");
      if (!id)
        return;
      (_c = inputRef.current) == null ? void 0 : _c.setAttribute("aria-activedescendant", id);
      activeDescendant.scrollIntoView({ block: "nearest" });
    } else {
      (_d = inputRef.current) == null ? void 0 : _d.setAttribute("aria-activedescendant", "");
    }
    (_e = inputRef.current) == null ? void 0 : _e.setAttribute("aria-expanded", String(!isOpen));
    (_f = triggerRef.current) == null ? void 0 : _f.setAttribute("aria-expanded", String(!isOpen));
    (_g = inputRef.current) == null ? void 0 : _g.focus();
  };
  const onKeyDownHandler = (event) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const { code } = event;
    let flag = false;
    const isExpanded = ((_a = inputRef.current) == null ? void 0 : _a.getAttribute("aria-expanded")) === "true";
    const showDropDownMenu = (activedescendantId) => {
      var _a2, _b2, _c2;
      (_a2 = inputRef.current) == null ? void 0 : _a2.setAttribute("aria-expanded", "true");
      (_b2 = triggerRef.current) == null ? void 0 : _b2.setAttribute("aria-expanded", "true");
      (_c2 = inputRef.current) == null ? void 0 : _c2.setAttribute(
        "aria-activedescendant",
        activedescendantId
      );
    };
    const hideDropDownMenu = () => {
      var _a2, _b2, _c2;
      (_a2 = inputRef.current) == null ? void 0 : _a2.setAttribute("aria-expanded", "false");
      (_b2 = triggerRef.current) == null ? void 0 : _b2.setAttribute("aria-expanded", "false");
      (_c2 = inputRef.current) == null ? void 0 : _c2.setAttribute("aria-activedescendant", "");
    };
    console.log(code);
    switch (code) {
      case "Space":
      case "Enter": {
        if (isExpanded) {
          const activeDescendant = Array.prototype.find.call(
            (_b = menuRef.current) == null ? void 0 : _b.children,
            (child) => {
              var _a2;
              return child.getAttribute("id") === ((_a2 = inputRef.current) == null ? void 0 : _a2.getAttribute(
                "aria-activedescendant"
              ));
            }
          );
          if (!activeDescendant)
            break;
          const value = activeDescendant.getAttribute("value");
          (_c = inputRef.current) == null ? void 0 : _c.setAttribute("value", value);
          hideDropDownMenu();
          const previousSelectedOption = Array.prototype.find.call(
            (_d = menuRef.current) == null ? void 0 : _d.children,
            (child) => child.getAttribute("aria-selected") === "true"
          );
          previousSelectedOption == null ? void 0 : previousSelectedOption.setAttribute(
            "aria-selected",
            "false"
          );
          activeDescendant.setAttribute("aria-selected", "true");
        } else {
          const activeDescendant = Array.prototype.find.call(
            (_e = menuRef.current) == null ? void 0 : _e.children,
            (child) => child.getAttribute("aria-selected") === "true"
          ) || ((_f = menuRef.current) == null ? void 0 : _f.firstElementChild);
          if (!activeDescendant)
            break;
          const id = activeDescendant.getAttribute("id");
          if (!id)
            break;
          showDropDownMenu(id);
          activeDescendant.classList.add("!bg-violet-quaternary");
        }
        flag = true;
        break;
      }
      case "Tab": {
        if (!isExpanded)
          break;
        hideDropDownMenu();
        break;
      }
      case "Escape": {
        if (isExpanded) {
          hideDropDownMenu();
          flag = true;
          break;
        }
        if ((_g = inputRef.current) == null ? void 0 : _g.hasAttribute("value")) {
          (_h = inputRef.current) == null ? void 0 : _h.removeAttribute("value");
          (_j = Array.from(((_i = menuRef.current) == null ? void 0 : _i.children) || []).find(
            (element) => element.getAttribute("aria-selected") === "true"
          )) == null ? void 0 : _j.setAttribute("aria-selected", "false");
          flag = true;
          break;
        }
        break;
      }
      case "Home": {
        const firstElement = (_k = menuRef.current) == null ? void 0 : _k.firstElementChild;
        if (!firstElement)
          break;
        if (!isExpanded) {
          const id = firstElement.getAttribute("id");
          if (!id)
            break;
          showDropDownMenu(id);
        }
        const activeDescendant = Array.prototype.find.call(
          (_l = menuRef.current) == null ? void 0 : _l.children,
          (child) => {
            var _a2;
            return child.getAttribute("id") === ((_a2 = inputRef.current) == null ? void 0 : _a2.getAttribute("aria-activedescendant"));
          }
        );
        activeDescendant.classList.remove("!bg-violet-quaternary");
        firstElement.classList.add("!bg-violet-quaternary");
        firstElement.scrollIntoView();
        flag = true;
        break;
      }
      case "End": {
        const lastElement = (_m = menuRef.current) == null ? void 0 : _m.lastElementChild;
        if (!lastElement)
          break;
        if (!isExpanded) {
          const id = lastElement.getAttribute("id");
          if (!id)
            break;
          showDropDownMenu(id);
        }
        const activeDescendant = Array.prototype.find.call(
          (_n = menuRef.current) == null ? void 0 : _n.children,
          (child) => {
            var _a2;
            return child.getAttribute("id") === ((_a2 = inputRef.current) == null ? void 0 : _a2.getAttribute("aria-activedescendant"));
          }
        );
        activeDescendant.classList.remove("!bg-violet-quaternary");
        lastElement.classList.add("!bg-violet-quaternary");
        lastElement.scrollIntoView();
        flag = true;
        break;
      }
      case "ArrowDown": {
        if (isExpanded) {
          const activeDescendant = Array.prototype.find.call(
            (_o = menuRef.current) == null ? void 0 : _o.children,
            (child) => {
              var _a2;
              return child.getAttribute("id") === ((_a2 = inputRef.current) == null ? void 0 : _a2.getAttribute(
                "aria-activedescendant"
              ));
            }
          );
          if (!activeDescendant)
            return;
          const nextActiveDescendant = (activeDescendant == null ? void 0 : activeDescendant.nextElementSibling) || ((_p = menuRef.current) == null ? void 0 : _p.firstElementChild);
          const id = nextActiveDescendant.getAttribute("id");
          if (!id)
            return;
          (_q = inputRef.current) == null ? void 0 : _q.setAttribute("aria-activedescendant", id);
          activeDescendant.classList.remove("!bg-violet-quaternary");
          nextActiveDescendant == null ? void 0 : nextActiveDescendant.classList.add(
            "!bg-violet-quaternary"
          );
        } else {
          const activeDescendant = Array.from(((_r = menuRef.current) == null ? void 0 : _r.children) || []).find(
            (child) => child.getAttribute("aria-selected") === "true"
          ) || ((_s = menuRef.current) == null ? void 0 : _s.firstElementChild);
          if (!activeDescendant)
            return;
          const id = activeDescendant.getAttribute("id");
          if (!id)
            return;
          showDropDownMenu(id);
          activeDescendant.scrollIntoView({ block: "nearest" });
        }
        flag = true;
        break;
      }
      case "ArrowUp": {
        if (isExpanded) {
          const activeDescendant = Array.prototype.find.call(
            (_t = menuRef.current) == null ? void 0 : _t.children,
            (child) => {
              var _a2;
              return child.getAttribute("id") === ((_a2 = inputRef.current) == null ? void 0 : _a2.getAttribute(
                "aria-activedescendant"
              ));
            }
          );
          if (!activeDescendant)
            return;
          const nextActiveDescendant = (activeDescendant == null ? void 0 : activeDescendant.previousElementSibling) || ((_u = menuRef.current) == null ? void 0 : _u.lastElementChild);
          const id = nextActiveDescendant.getAttribute("id");
          if (!id)
            return;
          (_v = inputRef.current) == null ? void 0 : _v.setAttribute("aria-activedescendant", id);
          activeDescendant.classList.remove("!bg-violet-quaternary");
          nextActiveDescendant == null ? void 0 : nextActiveDescendant.classList.add(
            "!bg-violet-quaternary"
          );
        } else {
          const activeDescendant = Array.from(((_w = menuRef.current) == null ? void 0 : _w.children) || []).find(
            (child) => child.getAttribute("aria-selected") === "true"
          ) || ((_x = menuRef.current) == null ? void 0 : _x.lastElementChild);
          if (!activeDescendant)
            return;
          const id = activeDescendant.getAttribute("id");
          if (!id)
            return;
          showDropDownMenu(id);
          activeDescendant.scrollIntoView({ block: "nearest" });
        }
        flag = true;
        break;
      }
    }
    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      readOnly: true,
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-expanded": "false",
      "aria-controls": selectMenuId,
      "aria-activedescendant": "",
      onClick: composeEventHandlers(onClick, onClickHandler),
      onKeyDown: composeEventHandlers(onKeyDown, onKeyDownHandler),
      className: cnBase(
        Select.input,
        "flex-auto cursor-pointer select-none px-4 text-white outline-none placeholder:text-white/30",
        className
      ),
      ref: inputRef,
      ...props
    }
  );
};
Input.displayName = "Select.Input";
const Trigger = ({
  className,
  onClick,
  ...props
}) => {
  const { triggerId, selectMenuId, inputRef, triggerRef, menuRef } = useSelectContext();
  const onClickHandler = (event) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const trigger2 = event.currentTarget;
    const isOpen = trigger2.getAttribute("aria-expanded") === "true";
    if (!isOpen) {
      const activeDescendant = Array.from(((_a = menuRef.current) == null ? void 0 : _a.children) || []).find(
        (child) => child.getAttribute("aria-selected") === "true"
      ) || ((_b = menuRef.current) == null ? void 0 : _b.firstElementChild);
      if (!activeDescendant)
        return;
      const id = activeDescendant.getAttribute("id");
      if (!id)
        return;
      (_c = inputRef.current) == null ? void 0 : _c.setAttribute("aria-activedescendant", id);
      activeDescendant.scrollIntoView({ block: "nearest" });
    } else {
      (_d = inputRef.current) == null ? void 0 : _d.setAttribute("aria-activedescendant", "");
    }
    (_e = inputRef.current) == null ? void 0 : _e.setAttribute("aria-expanded", String(!isOpen));
    (_f = triggerRef.current) == null ? void 0 : _f.setAttribute("aria-expanded", String(!isOpen));
    (_g = inputRef.current) == null ? void 0 : _g.focus();
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      id: triggerId,
      type: "button",
      role: "combobox",
      "aria-expanded": "false",
      "aria-haspopup": "listbox",
      "aria-controls": selectMenuId,
      "aria-activedescendant": "",
      tabIndex: -1,
      className: cnBase(
        Select.trigger,
        "group border-none px-4 outline-none",
        className
      ),
      onClick: composeEventHandlers(onClick, onClickHandler),
      ref: triggerRef,
      ...props
    }
  );
};
const Menu = ({ className, onClick, ...props }) => {
  const { selectMenuId, inputRef, triggerRef, menuRef } = useSelectContext();
  const onClickHandler = (event) => {
    var _a, _b, _c, _d, _e;
    const currentSelectedOption = event.target.closest(
      "li"
    );
    const menu2 = event.currentTarget;
    const previousSelectedOption = Array.prototype.find.call(
      menu2.children,
      (child) => child.getAttribute("aria-selected") === "true"
    );
    previousSelectedOption == null ? void 0 : previousSelectedOption.setAttribute("aria-selected", "false");
    previousSelectedOption == null ? void 0 : previousSelectedOption.classList.remove("current-option");
    currentSelectedOption == null ? void 0 : currentSelectedOption.setAttribute("aria-selected", "true");
    (_a = inputRef.current) == null ? void 0 : _a.setAttribute(
      "value",
      String(currentSelectedOption == null ? void 0 : currentSelectedOption.getAttribute("value")) || ""
    );
    (_b = inputRef.current) == null ? void 0 : _b.setAttribute("aria-expanded", "false");
    (_c = triggerRef.current) == null ? void 0 : _c.setAttribute("aria-expanded", "false");
    (_d = inputRef.current) == null ? void 0 : _d.setAttribute("aria-activedescendant", "");
    (_e = inputRef.current) == null ? void 0 : _e.focus();
  };
  return /* @__PURE__ */ jsx(
    "ul",
    {
      id: selectMenuId,
      role: "listbox",
      tabIndex: -1,
      onClick: composeEventHandlers(onClick, onClickHandler),
      ref: menuRef,
      className: cnBase(Select.menu, "rounded-b-lg shadow-lg", className),
      ...props
    }
  );
};
Menu.displayName = "Select.Menu";
const Option = ({ className, ...props }) => {
  const optionId = `option-${useId()}`;
  return /* @__PURE__ */ jsx(
    "li",
    {
      id: optionId,
      role: "option",
      "aria-selected": "false",
      className: cnBase(
        "px-4 py-2 last:rounded-b-lg hover:bg-violet-quaternary aria-selected:bg-violet-secondary",
        className
      ),
      ...props
    }
  );
};
Option.displayName = "Select.Option";
export {
  Button as B,
  Input as I,
  Menu as M,
  Option as O,
  Root as R,
  Trigger as T,
  useAttachWalletMutation as a,
  buttonVariants as b,
  useFetchWalletQuery as c,
  useFetchWalletListQuery as d,
  useFetchWithdrawListQuery as u
};
