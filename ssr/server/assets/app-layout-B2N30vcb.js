import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate, Link, useLocation, NavLink, Outlet } from "react-router-dom";
import React, { useRef, useLayoutEffect, useCallback, useEffect, createContext, useContext, useId, useMemo } from "react";
import ReactDOM from "react-dom";
import { c as cn, d as useSignOutMutation, T as Title } from "../main.js";
import { c as composeEventHandlers } from "./compose-event-handlers-xlGPYA7j.js";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react-redux";
import "@reduxjs/toolkit";
import "@reduxjs/toolkit/query/react";
import "tailwind-variants";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
const useEvent = (callback) => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  const eventCallback = useCallback(
    (...args) => {
      return callbackRef.current.apply(null, args);
    },
    [callbackRef]
  );
  return eventCallback;
};
const useOutsideClick = (ref, callback, options) => {
  const handleClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick, options);
    return () => {
      document.removeEventListener("click", handleClick, options);
    };
  }, [ref, callback]);
};
function useWindowEvent(type, callback, options) {
  const eventCallback = useEvent(callback);
  useEffect(() => {
    document.addEventListener(type, eventCallback, options);
    return () => document.removeEventListener(type, eventCallback, options);
  }, [type, eventCallback, options]);
}
const BurgerMenuContext = createContext(null);
const useBurgerMenuContext = () => {
  const context = useContext(BurgerMenuContext);
  if (!context) {
    throw new Error(
      "Component must be rendered as child of dialog component"
    );
  }
  return context;
};
const Root = ({ className, children, ...props }) => {
  const burgerMenuTriggerId = useId();
  const burgerMenuId = useId();
  const triggerRef = useRef(null);
  const dialogRef = useRef(null);
  const currentFocusableElementIndex = useRef(0);
  return /* @__PURE__ */ jsx(
    BurgerMenuContext.Provider,
    {
      value: useMemo(
        () => ({
          burgerMenuTriggerId,
          burgerMenuId,
          triggerRef,
          currentFocusableElementIndex,
          dialogRef
        }),
        []
      ),
      children: /* @__PURE__ */ jsx(
        "nav",
        {
          ...props,
          role: "navigation",
          "aria-label": "Бургер меню",
          className: cn("burger-menu", className),
          children
        }
      )
    }
  );
};
Root.displayName = "BurgerMenu.Root";
const portalRoot = document.querySelector("body");
const contentRoot = document.querySelector("#root");
const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, portalRoot);
};
Portal.displayName = "BurgerMenu.Portal";
const Trigger = ({ children, onClick, ...props }) => {
  const { burgerMenuTriggerId, burgerMenuId, triggerRef, dialogRef } = useBurgerMenuContext();
  const onClickHandler = (event) => {
    var _a, _b, _c;
    const button = event.currentTarget;
    const open = (_a = dialogRef.current) == null ? void 0 : _a.hasAttribute("open");
    if (open) {
      (_b = dialogRef.current) == null ? void 0 : _b.close();
    } else {
      (_c = dialogRef.current) == null ? void 0 : _c.show();
      button.setAttribute("aria-expanded", "true");
      contentRoot.setAttribute("inert", "");
      contentRoot.setAttribute("aria-hidden", "true");
    }
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      id: burgerMenuTriggerId,
      type: "button",
      "aria-haspopup": "menu",
      "aria-controls": burgerMenuId,
      "aria-expanded": "false",
      onClick: composeEventHandlers(onClick, onClickHandler),
      ref: triggerRef,
      children: children ? children : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            width: "32",
            height: "32",
            viewBox: "0 0 32 32",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            "aria-hidden": "true",
            focusable: "false",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M4 10.6667V8H28V10.6667H4ZM4 17.3333H28V14.6667H4V17.3333ZM4 24H28V21.3333H4V24Z",
                fill: "currentColor"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Бургер меню" })
      ] })
    }
  );
};
Trigger.displayName = "BurgerMenu.Trigger";
const Close = ({ onClick, ...props }) => {
  const { dialogRef } = useBurgerMenuContext();
  const onClickHandler = () => {
    var _a;
    (_a = dialogRef.current) == null ? void 0 : _a.close();
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick: composeEventHandlers(onClick, onClickHandler),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            width: "1em",
            height: "1em",
            viewBox: "0 0 22 22",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M8.80002 11.0001L0.000237369 19.8L2.20022 22L11 13.2001L19.7998 22L21.9998 19.8L13.2 11.0001L22 2.19999L19.8001 0L11 8.80012L2.19998 2.37371e-05L0 2.20002L8.80002 11.0001Z",
                fill: "currentColor"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Закрыть меню" })
      ]
    }
  );
};
Close.displayName = "BurgerMenu.Close";
const Content = ({
  className,
  onClose,
  onKeyDown,
  children,
  ...props
}) => {
  const { currentFocusableElementIndex, triggerRef, dialogRef } = useBurgerMenuContext();
  const focusableElements = useRef(null);
  const menuItems = useRef(null);
  useLayoutEffect(() => {
    if (!dialogRef.current)
      return;
    focusableElements.current = Array.from(
      dialogRef.current.querySelectorAll(
        'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
    menuItems.current = Array.from(
      dialogRef.current.querySelectorAll(
        '[href]:not([disabled])[role="menuitem"]'
      )
    );
  }, [dialogRef]);
  const closeBurgerMenu = () => {
    var _a;
    (_a = dialogRef.current) == null ? void 0 : _a.close();
  };
  useOutsideClick(dialogRef, closeBurgerMenu, { capture: true });
  useWindowEvent("visibilitychange", () => {
    var _a, _b;
    if (!((_a = dialogRef.current) == null ? void 0 : _a.hasAttribute("open")) || !document.hidden)
      return;
    (_b = dialogRef.current) == null ? void 0 : _b.close();
  });
  const onCloseHandler = () => {
    var _a, _b;
    contentRoot.removeAttribute("inert");
    contentRoot.removeAttribute("aria-hidden");
    (_a = triggerRef.current) == null ? void 0 : _a.setAttribute("aria-expanded", "false");
    (_b = triggerRef.current) == null ? void 0 : _b.focus();
  };
  const onKeyDownHandler = (event) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    const { key, shiftKey } = event;
    if (key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      (_a = dialogRef.current) == null ? void 0 : _a.close();
    }
    if (key === "Tab") {
      const firstFocusableElement = (_b = focusableElements.current) == null ? void 0 : _b.at(
        currentFocusableElementIndex.current
      );
      const lastFocusableElement = (_c = focusableElements.current) == null ? void 0 : _c.at(-1);
      if (!(firstFocusableElement instanceof HTMLElement) || !(lastFocusableElement instanceof HTMLElement))
        return;
      if (shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          event.preventDefault();
        }
      }
    }
    if (key === "Home") {
      const previousFocusableMenuItem = (_d = menuItems.current) == null ? void 0 : _d.at(
        currentFocusableElementIndex.current
      );
      const firstMenuItem = (_e = menuItems.current) == null ? void 0 : _e.at(0);
      if (!(previousFocusableMenuItem instanceof HTMLElement) || !(firstMenuItem instanceof HTMLElement)) {
        return;
      }
      previousFocusableMenuItem.setAttribute("tabIndex", "-1");
      firstMenuItem.setAttribute("tabIndex", "0");
      firstMenuItem.focus();
      currentFocusableElementIndex.current = 0;
      event.preventDefault();
      event.stopPropagation();
    }
    if (key === "End") {
      const previousFocusableMenuItem = (_f = menuItems.current) == null ? void 0 : _f.at(
        currentFocusableElementIndex.current
      );
      const lastMenuItem = (_g = menuItems.current) == null ? void 0 : _g.at(-1);
      if (!(previousFocusableMenuItem instanceof HTMLElement) || !(lastMenuItem instanceof HTMLElement)) {
        return;
      }
      previousFocusableMenuItem.setAttribute("tabIndex", "-1");
      lastMenuItem.setAttribute("tabIndex", "0");
      lastMenuItem.focus();
      currentFocusableElementIndex.current = (((_h = menuItems.current) == null ? void 0 : _h.length) || 1) - 1;
      event.preventDefault();
      event.stopPropagation();
    }
    if (key === "ArrowUp") {
      const previousFocusableMenuItem = (_i = menuItems.current) == null ? void 0 : _i.at(
        currentFocusableElementIndex.current
      );
      const nextFocusableMenuItem = document.activeElement === ((_j = menuItems.current) == null ? void 0 : _j.at(0)) ? (_k = menuItems.current) == null ? void 0 : _k.at(-1) : (_l = menuItems.current) == null ? void 0 : _l.at(
        currentFocusableElementIndex.current - 1
      );
      if (!(previousFocusableMenuItem instanceof HTMLElement) || !(nextFocusableMenuItem instanceof HTMLElement)) {
        return;
      }
      previousFocusableMenuItem.setAttribute("tabIndex", "-1");
      nextFocusableMenuItem.setAttribute("tabIndex", "0");
      nextFocusableMenuItem.focus();
      currentFocusableElementIndex.current = currentFocusableElementIndex.current === 0 ? (((_m = menuItems.current) == null ? void 0 : _m.length) || 1) - 1 : currentFocusableElementIndex.current - 1;
      event.preventDefault();
      event.stopPropagation();
    }
    if (key === "ArrowDown") {
      const previousFocusableMenuItem = (_n = menuItems.current) == null ? void 0 : _n.at(
        currentFocusableElementIndex.current
      );
      const nextFocusableMenuItem = document.activeElement === ((_o = menuItems.current) == null ? void 0 : _o.at(-1)) ? (_p = menuItems.current) == null ? void 0 : _p.at(0) : (_q = menuItems.current) == null ? void 0 : _q.at(
        currentFocusableElementIndex.current + 1
      );
      if (!(previousFocusableMenuItem instanceof HTMLElement) || !(nextFocusableMenuItem instanceof HTMLElement)) {
        return;
      }
      previousFocusableMenuItem.setAttribute("tabIndex", "-1");
      nextFocusableMenuItem.setAttribute("tabIndex", "0");
      nextFocusableMenuItem.focus();
      currentFocusableElementIndex.current = currentFocusableElementIndex.current === (((_r = menuItems.current) == null ? void 0 : _r.length) || 1) - 1 ? 0 : currentFocusableElementIndex.current + 1;
      event.preventDefault();
      event.stopPropagation();
    }
  };
  return /* @__PURE__ */ jsx(
    "dialog",
    {
      className: cn("burger-menu_dialog", className),
      onClose: composeEventHandlers(onClose, onCloseHandler),
      onKeyDown: composeEventHandlers(onKeyDown, onKeyDownHandler),
      ref: dialogRef,
      ...props,
      children: /* @__PURE__ */ jsx("section", { className: "burger-menu_content", children })
    }
  );
};
Content.displayName = "BurgerMenu.Content";
const Header$1 = (props) => {
  return /* @__PURE__ */ jsx("header", { ...props });
};
Header$1.displayName = "BurgerMenu.Header";
const Menu = (props) => {
  const { burgerMenuId, burgerMenuTriggerId } = useBurgerMenuContext();
  return /* @__PURE__ */ jsx(
    "ul",
    {
      ...props,
      id: burgerMenuId,
      role: "menu",
      "aria-labelledby": burgerMenuTriggerId
    }
  );
};
Menu.displayName = "BurgerMenu.Menu";
const MenuItem = ({
  index,
  className,
  children,
  ...props
}) => {
  const { dialogRef, currentFocusableElementIndex } = useBurgerMenuContext();
  const anchorElement = React.Children.only(children);
  const { onClick, onMouseOver, ...anchorProps } = anchorElement.props;
  if (!React.isValidElement(anchorElement))
    return /* @__PURE__ */ jsx(Fragment, { children });
  const onClickHandler = () => {
    var _a;
    (_a = dialogRef.current) == null ? void 0 : _a.close();
  };
  const onMouseOverHandler = (event) => {
    const target = event.currentTarget;
    target.focus();
    console.log(index);
    currentFocusableElementIndex.current = index;
  };
  return /* @__PURE__ */ jsx(
    "li",
    {
      role: "none",
      className,
      ...props,
      children: React.cloneElement(anchorElement, {
        tabindex: -1,
        role: "menuitem",
        onClick: composeEventHandlers(onClick, onClickHandler),
        onMouseOver: composeEventHandlers(
          onMouseOver,
          onMouseOverHandler
        ),
        ...anchorProps
      })
    }
  );
};
MenuItem.displayName = "BurgerMenu.MenuItem";
const SignOutButton = ({
  className,
  children,
  ...props
}) => {
  const navigate = useNavigate();
  const [signOut] = useSignOutMutation();
  const onClickHandler = async (event) => {
    event.preventDefault();
    try {
      await signOut().unwrap();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to: "/",
      onClick: onClickHandler,
      className: cn("flex h-full items-center justify-center", className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Logout" })
      ]
    }
  );
};
const CashOutIcon = (props) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "1em",
      height: "1em",
      viewBox: "0 0 32 33",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M24.289 7.67378L19.5205 0.988281L1.987 14.9953L1.015 14.9848V14.9998H0.25V32.9998H31.75V14.9998H30.307L27.436 6.60128L24.289 7.67378ZM27.1375 14.9998H12.0955L23.299 11.1808L25.582 10.4503L27.1375 14.9998ZM21.325 8.68478L9.76 12.6268L18.919 5.30978L21.325 8.68478ZM3.25 27.2533V20.7433C3.88284 20.519 4.45766 20.1564 4.93254 19.6817C5.40743 19.2071 5.7704 18.6325 5.995 17.9998H26.005C26.2295 18.6327 26.5924 19.2076 27.0673 19.6825C27.5422 20.1574 28.1171 20.5203 28.75 20.7448V27.2548C28.1171 27.4793 27.5422 27.8422 27.0673 28.3171C26.5924 28.792 26.2295 29.3668 26.005 29.9998H5.998C5.77328 29.3663 5.40995 28.791 4.93453 28.3158C4.45911 27.8407 3.8836 27.4777 3.25 27.2533Z",
          fill: "currentColor"
        }
      )
    }
  );
};
const DashboardIcon = (props) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "1em",
      height: "1em",
      viewBox: "0 0 36 36",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "rect",
          {
            width: "16",
            height: "16",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx(
          "rect",
          {
            x: "20",
            width: "16",
            height: "16",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx(
          "rect",
          {
            x: "20",
            y: "20",
            width: "16",
            height: "16",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx(
          "rect",
          {
            y: "20",
            width: "16",
            height: "16",
            fill: "currentColor"
          }
        )
      ]
    }
  );
};
const ExitIcon = (props) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "1em",
      height: "1em",
      viewBox: "9 8 36 37",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M20.25 40.5L13.5 40.5L13.5 13.5L20.25 13.5L20.25 9L13.5 9C11.025 9 9 11.025 9 13.5L9 40.5C9 42.975 11.025 45 13.5 45L20.25 45L20.25 40.5ZM33.75 15.75L30.5775 18.9225L36.3825 24.75L18 24.75L18 29.25L36.3825 29.25L30.5775 35.0775L33.75 38.25L45 27L33.75 15.75Z",
          fill: "currentColor"
        }
      )
    }
  );
};
const NotificationIcon = (props) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "1em",
      height: "1em",
      viewBox: "0 2 30 30",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M27.5003 23.2279C26.379 22.0115 24.281 20.1816 24.281 14.1875C24.281 9.63477 21.1193 5.99023 16.856 5.09609V3.875C16.856 2.83965 16.0249 2 15 2C13.9751 2 13.144 2.83965 13.144 3.875V5.09609C8.88073 5.99023 5.71896 9.63477 5.71896 14.1875C5.71896 20.1816 3.62097 22.0115 2.49973 23.2279C2.15151 23.6059 1.99714 24.0576 2.00004 24.5C2.00642 25.4609 2.75334 26.375 3.86298 26.375H26.137C27.2467 26.375 27.9942 25.4609 28 24.5C28.0029 24.0576 27.8485 23.6053 27.5003 23.2279ZM5.91918 23.5625C7.15069 21.9236 8.49712 19.2072 8.5035 14.2215C8.5035 14.2098 8.50002 14.1992 8.50002 14.1875C8.50002 10.5629 11.4099 7.625 15 7.625C18.5901 7.625 21.5 10.5629 21.5 14.1875C21.5 14.1992 21.4965 14.2098 21.4965 14.2215C21.5029 19.2078 22.8493 21.9242 24.0808 23.5625H5.91918ZM15 32C17.0498 32 18.7125 30.3213 18.7125 28.25H11.2875C11.2875 30.3213 12.9502 32 15 32Z",
          fill: "currentColor"
        }
      )
    }
  );
};
const PartnershipAgreementIcon = (props) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "1em",
      height: "1em",
      viewBox: "0 0 36 36",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M12.375 15.75C11.7537 15.75 11.25 16.2537 11.25 16.875C11.25 17.4963 11.7537 18 12.375 18H23.625C24.2463 18 24.75 17.4963 24.75 16.875C24.75 16.2537 24.2463 15.75 23.625 15.75H12.375Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M11.25 21.375C11.25 20.7537 11.7537 20.25 12.375 20.25H23.625C24.2463 20.25 24.75 20.7537 24.75 21.375C24.75 21.9963 24.2463 22.5 23.625 22.5H12.375C11.7537 22.5 11.25 21.9963 11.25 21.375Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M11.25 25.875C11.25 25.2537 11.7537 24.75 12.375 24.75H16.875C17.4963 24.75 18 25.2537 18 25.875C18 26.4963 17.4963 27 16.875 27H12.375C11.7537 27 11.25 26.4963 11.25 25.875Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M21.375 0H9C6.51472 0 4.5 2.01472 4.5 4.5V31.5C4.5 33.9853 6.51472 36 9 36H27C29.4853 36 31.5 33.9853 31.5 31.5V10.125L21.375 0ZM21.375 2.25V6.75C21.375 8.61396 22.886 10.125 24.75 10.125H29.25V31.5C29.25 32.7426 28.2426 33.75 27 33.75H9C7.75736 33.75 6.75 32.7426 6.75 31.5V4.5C6.75 3.25736 7.75736 2.25 9 2.25H21.375Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
};
const ProfileIcon = (props) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "1em",
      height: "1em",
      viewBox: "8 8 34 34",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M25.0007 8.33301C20.3965 8.33301 16.6673 12.0622 16.6673 16.6663C16.6673 21.2705 20.3965 24.9997 25.0007 24.9997C29.6048 24.9997 33.334 21.2705 33.334 16.6663C33.334 12.0622 29.6048 8.33301 25.0007 8.33301ZM29.1673 16.6663C29.1673 14.3747 27.2923 12.4997 25.0007 12.4997C22.709 12.4997 20.834 14.3747 20.834 16.6663C20.834 18.958 22.709 20.833 25.0007 20.833C27.2923 20.833 29.1673 18.958 29.1673 16.6663ZM37.5007 35.4163C37.084 33.9372 30.6257 31.2497 25.0007 31.2497C19.3757 31.2497 12.9173 33.9372 12.5007 35.4372V37.4997H37.5007V35.4163ZM8.33398 35.4163C8.33398 29.8747 19.4382 27.083 25.0007 27.083C30.5632 27.083 41.6673 29.8747 41.6673 35.4163V41.6663H8.33398V35.4163Z",
          fill: "currentColor"
        }
      )
    }
  );
};
const ReferralProgramIcon = (props) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "1em",
      height: "1em",
      viewBox: "0 0 36 36",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M17.4418 0.148226C17.7877 -0.0494088 18.2123 -0.0494088 18.5582 0.148226L26.9957 4.96966C27.3462 5.16995 27.5625 5.54271 27.5625 5.94643V14.9364L35.4332 19.4339C35.7837 19.6342 36 20.007 36 20.4107V30.0536C36 30.4573 35.7837 30.83 35.4332 31.0303L26.9957 35.8518C26.6498 36.0494 26.2252 36.0494 25.8793 35.8518L18 31.3493L10.1207 35.8518C9.7748 36.0494 9.3502 36.0494 9.00434 35.8518L0.566844 31.0303C0.216322 30.83 0 30.4573 0 30.0536V20.4107C0 20.007 0.216322 19.6342 0.566844 19.4339L8.4375 14.9364V5.94643C8.4375 5.54271 8.65382 5.16995 9.00434 4.96966L17.4418 0.148226ZM9.5625 16.885L3.39251 20.4107L9.5625 23.9364L15.7325 20.4107L9.5625 16.885ZM16.875 22.3493L10.6875 25.885V32.9364L16.875 29.4007V22.3493ZM19.125 29.4007L25.3125 32.9364V25.885L19.125 22.3493V29.4007ZM20.2675 20.4107L26.4375 23.9364L32.6075 20.4107L26.4375 16.885L20.2675 20.4107ZM25.3125 14.9364V7.88501L19.125 11.4207V18.4721L25.3125 14.9364ZM16.875 18.4721V11.4207L10.6875 7.88501V14.9364L16.875 18.4721ZM11.83 5.94643L18 9.47214L24.17 5.94643L18 2.42072L11.83 5.94643ZM33.75 22.3493L27.5625 25.885V32.9364L33.75 29.4007V22.3493ZM8.4375 32.9364V25.885L2.25 22.3493V29.4007L8.4375 32.9364Z",
          fill: "currentColor"
        }
      )
    }
  );
};
const StatisticIcon = (props) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "1em",
      height: "1em",
      viewBox: "0 0 32 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M7 22C6.44772 22 6 22.4477 6 23V25C6 25.5523 6.44772 26 7 26H9C9.55228 26 10 25.5523 10 25V23C10 22.4477 9.55228 22 9 22H7Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M14 23C14 22.4477 14.4477 22 15 22H17C17.5523 22 18 22.4477 18 23V25C18 25.5523 17.5523 26 17 26H15C14.4477 26 14 25.5523 14 25V23Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M23 22C22.4477 22 22 22.4477 22 23V25C22 25.5523 22.4477 26 23 26H25C25.5523 26 26 25.5523 26 25V23C26 22.4477 25.5523 22 25 22H23Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M28 2C30.2091 2 32 3.79086 32 6V26C32 28.2091 30.2091 30 28 30H4C1.79086 30 0 28.2091 0 26V6C0 3.79086 1.79086 2 4 2H28ZM4 28H28C29.1046 28 30 27.1046 30 26V10H2V26C2 27.1046 2.89543 28 4 28ZM4 4C2.89543 4 2 4.89543 2 6V8H30V6C30 4.89543 29.1046 4 28 4H4Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
};
const SubReferralProgramIcon = (props) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "1em",
      height: "1em",
      viewBox: "0 0 36 30",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M32.2372 26.5511C33.3332 20.6471 35.4926 7.83853 35.9901 2.56836C36.0082 2.32247 35.9973 2.0396 35.9901 1.79767C35.9829 1.58017 35.9757 1.3957 35.9901 1.30092C35.9577 1.03399 35.8567 0.667085 35.5251 0.400274C35.1285 0.0667311 34.4976 0 34.2308 0C32.9691 0 31.0728 0.667085 21.8365 4.53636C18.6135 5.87053 12.1676 8.67245 2.46625 12.9086C0.905235 13.5424 0.0760602 14.1428 0.00756315 14.7432C-0.111405 15.7898 1.18643 16.193 2.96375 16.746L3.59825 16.9446C5.29265 17.5117 7.54945 18.1454 8.74634 18.1788C9.80985 18.2122 11.0067 17.7452 12.3334 16.8445C21.4039 10.7072 26.0581 7.60509 26.3573 7.53836L26.433 7.52637C26.6457 7.49312 26.8764 7.4567 27.0531 7.60509C27.1288 7.68403 27.1829 7.77995 27.2117 7.88457C27.2261 7.94327 27.2369 8.00378 27.2369 8.06429C27.2369 8.11157 27.2297 8.15884 27.2189 8.20544C27.0531 8.90589 18.5486 16.6778 18.0511 17.1782C16.1548 19.1128 14.0278 20.3135 17.3193 22.4817C18.6352 23.3519 19.6987 24.0774 20.755 24.7997C21.9663 25.6277 23.1668 26.4517 24.7278 27.485C26.588 28.7192 28.0517 30.1534 29.9768 29.9867C30.842 29.8866 31.7722 29.0527 32.2372 26.5511Z",
          fill: "currentColor"
        }
      )
    }
  );
};
const SupportIcon = (props) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "1em",
      height: "1em",
      viewBox: "0 0 36 36",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M18 3C9.729 3 3 9.729 3 18V24.2145C3 25.7505 4.3455 27 6 27H7.5C7.89782 27 8.27936 26.842 8.56066 26.5607C8.84196 26.2794 9 25.8978 9 25.5V17.7855C9 17.3877 8.84196 17.0061 8.56066 16.7248C8.27936 16.4435 7.89782 16.2855 7.5 16.2855H6.138C6.972 10.4805 11.967 6 18 6C24.033 6 29.028 10.4805 29.862 16.2855H28.5C28.1022 16.2855 27.7206 16.4435 27.4393 16.7248C27.158 17.0061 27 17.3877 27 17.7855V27C27 28.6545 25.6545 30 24 30H21V28.5H15V33H24C27.309 33 30 30.309 30 27C31.6545 27 33 25.7505 33 24.2145V18C33 9.729 26.271 3 18 3Z",
          fill: "currentColor"
        }
      )
    }
  );
};
const TelegramIcon = (props) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "1em",
      height: "1em",
      viewBox: "0 0 36 36",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M18 0C8.064 0 0 8.064 0 18C0 27.936 8.064 36 18 36C27.936 36 36 27.936 36 18C36 8.064 27.936 0 18 0ZM26.352 12.24C26.082 15.084 24.912 21.996 24.318 25.182C24.066 26.532 23.562 26.982 23.094 27.036C22.05 27.126 21.258 26.352 20.25 25.686C18.666 24.642 17.766 23.994 16.236 22.986C14.454 21.816 15.606 21.168 16.632 20.124C16.902 19.854 21.51 15.66 21.6 15.282C21.6125 15.2247 21.6108 15.1653 21.5952 15.1088C21.5795 15.0524 21.5502 15.0006 21.51 14.958C21.402 14.868 21.258 14.904 21.132 14.922C20.97 14.958 18.45 16.632 13.536 19.944C12.816 20.43 12.168 20.682 11.592 20.664C10.944 20.646 9.72 20.304 8.802 19.998C7.668 19.638 6.786 19.44 6.858 18.81C6.894 18.486 7.344 18.162 8.19 17.82C13.446 15.534 16.938 14.022 18.684 13.302C23.688 11.214 24.714 10.854 25.398 10.854C25.542 10.854 25.884 10.89 26.1 11.07C26.28 11.214 26.334 11.412 26.352 11.556C26.334 11.664 26.37 11.988 26.352 12.24Z",
          fill: "currentColor"
        }
      )
    }
  );
};
const SVGPicker = ({ name, ...props }) => {
  switch (name) {
    case "cash-out":
      return /* @__PURE__ */ jsx(CashOutIcon, { ...props });
    case "dashboard":
      return /* @__PURE__ */ jsx(DashboardIcon, { ...props });
    case "exit":
      return /* @__PURE__ */ jsx(ExitIcon, { ...props });
    case "notification":
      return /* @__PURE__ */ jsx(NotificationIcon, { ...props });
    case "partnership-agreement":
      return /* @__PURE__ */ jsx(PartnershipAgreementIcon, { ...props });
    case "referral":
      return /* @__PURE__ */ jsx(ReferralProgramIcon, { ...props });
    case "sub-referral":
      return /* @__PURE__ */ jsx(SubReferralProgramIcon, { ...props });
    case "statistic":
      return /* @__PURE__ */ jsx(StatisticIcon, { ...props });
    case "profile":
      return /* @__PURE__ */ jsx(ProfileIcon, { ...props });
    case "support":
      return /* @__PURE__ */ jsx(SupportIcon, { ...props });
    case "telegram":
      return /* @__PURE__ */ jsx(TelegramIcon, { ...props });
    default:
      return null;
  }
};
const NavigationSprite = "/assets/navigation-sprite.svg";
const links = [
  {
    url: "/",
    name: "dashboard",
    title: "Панель управления"
  },
  {
    url: "/referral",
    name: "partnership-program",
    title: "Парнерская программа"
  },
  {
    url: "/sub/referral",
    name: "sub-partnership-program",
    title: "Суб-партнерская программа"
  },
  {
    url: "/statistics",
    name: "statistics",
    title: "Статистика"
  },
  {
    url: "withdrawal",
    name: "withdrawal",
    title: "Вывод средств"
  },
  {
    url: "/account",
    name: "account",
    title: "Профиль"
  },
  {
    url: "/support",
    name: "support",
    title: "Поддержка"
  },
  {
    url: "/agreement",
    name: "partnership-agreement",
    title: "Партнерское соглашение"
  },
  {
    url: "/telegram",
    name: "telegram",
    title: "Telegram"
  }
];
const Header = () => {
  var _a;
  const location = useLocation();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("nav", { className: "container hidden justify-between md:flex", children: [
      /* @__PURE__ */ jsxs("ul", { className: "flex items-center gap-x-1.5", children: [
        /* @__PURE__ */ jsx("li", { className: "mr-4", children: /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsxs(
          "svg",
          {
            width: "109",
            height: "48",
            viewBox: "0 0 109 62",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M44.3866 21.1967V44.33L26.6661 44.33C44.3866 36.6364 40.4246 15.9343 30.3402 9.91998H47.1568L62.4125 29.8819V9.91998H73.1004V44.33H59.8403L44.3866 21.1967Z",
                  fill: "currentColor"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M109 44.33H76.9808V9.91998H109V18.1149H87.6686V23.3914H108.978V29.952H87.6686V35.2751H109V44.33Z",
                  fill: "currentColor"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M14.6416 14.2253L14.6392 14.2261V7.73177C10.4214 8.58832 6.7514 10.8731 4.04606 14.2957C1.14442 17.9666 -0.284067 22.616 0.0469461 27.3118C0.37796 32.0076 2.444 36.4028 5.83093 39.6164C9.21786 42.8299 13.6754 44.6243 18.3099 44.6399C22.9445 44.6555 27.4136 42.8911 30.8214 39.7004C34.2292 36.5097 36.3239 32.1285 36.6855 27.435C37.0471 22.7416 35.6489 18.0827 32.7713 14.3923C30.7728 11.8294 28.1633 9.86512 25.2211 8.66395L21.5282 0V14.056L21.5258 14.0554V17.4483C24.9688 18.745 27.4216 22.1025 27.4216 26.04C27.4216 31.101 23.3694 35.2038 18.3708 35.2038C13.3721 35.2038 9.31988 31.101 9.31988 26.04C9.31988 23.0046 10.7775 20.3139 13.0227 18.6463L14.6392 22.7577V17.6888L14.6416 17.6877V14.2253Z",
                  fill: "currentColor"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M18.0102 47.7805C20.5829 47.7805 22.6492 49.8466 22.6492 52.4191V57.3412C22.6492 59.9137 20.5829 62 18.0102 62H5.86362C3.29092 62 1.22466 59.9137 1.22466 57.3412V52.4191C1.22466 49.8466 3.29092 47.7805 5.86362 47.7805H18.0102ZM19.1244 57.3412V52.4191C19.1244 51.7911 18.6382 51.305 18.0102 51.305H5.86362C5.23564 51.305 4.74946 51.7911 4.74946 52.4191V57.3412C4.74946 57.9691 5.23564 58.4553 5.86362 58.4553H18.0102C18.6382 58.4553 19.1244 57.9691 19.1244 57.3412Z",
                  fill: "currentColor"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M35.7236 47.7603C38.1748 47.7603 40.16 49.7453 40.16 52.176C40.16 54.6269 38.1748 56.612 35.7236 56.612L27.8522 56.6322V61.9797H24.3274V47.7805L35.7236 47.7603ZM35.7236 53.0875C36.23 53.0875 36.6149 52.6824 36.6149 52.176C36.6149 51.6899 36.23 51.2847 35.7236 51.2847L27.8522 51.305V53.0875H35.7236Z",
                  fill: "currentColor"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M59.1677 47.7805V51.305H51.7332V61.9797H48.2084V51.305H40.7941V47.7805H59.1677Z",
                  fill: "currentColor"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M64.1447 61.9797H60.6199V47.74H64.1447V61.9797Z",
                  fill: "currentColor"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M80.0654 47.7805C82.6381 47.7805 84.7044 49.8466 84.7044 52.4191V57.3412C84.7044 59.9137 82.6381 62 80.0654 62H70.9091C68.3364 62 66.2701 59.9137 66.2701 57.3412V52.4191C66.2701 49.8466 68.3364 47.7805 70.9091 47.7805H80.0654ZM81.1796 57.3412V52.4191C81.1796 51.7911 80.6934 51.305 80.0654 51.305H70.9091C70.2811 51.305 69.7949 51.7911 69.7949 52.4191V57.3412C69.7949 57.9691 70.2811 58.4553 70.9091 58.4553H80.0654C80.6934 58.4553 81.1796 57.9691 81.1796 57.3412Z",
                  fill: "currentColor"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M108.959 61.9595L109 61.9797H103.895L90.3567 52.6014V61.9797H86.8319V47.74H90.377L105.434 58.5768V47.74H108.959V61.9595Z",
                  fill: "currentColor"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M12.9698 27.0247L11.2986 28.4952L12.7691 31.0248L14.9014 30.3552C15.171 30.5536 15.4347 30.7212 15.6926 30.8581C15.9504 30.995 16.2259 31.125 16.519 31.248L16.9602 33.48H19.9013L20.3425 31.248C20.6366 31.124 20.9125 30.994 21.1704 30.8581C21.4282 30.7222 21.6914 30.5546 21.9601 30.3552L24.0924 31.0248L25.5629 28.4952L23.8718 27.0072C23.9208 26.6848 23.9453 26.3624 23.9453 26.04C23.9453 25.7176 23.9208 25.3952 23.8718 25.0728L25.5629 23.5848L24.0924 21.0552L21.9601 21.7248C21.6905 21.5264 21.4272 21.3587 21.1704 21.2218C20.9135 21.0849 20.6375 20.955 20.3425 20.832L19.9013 18.6H17.026V23.4207C17.4472 23.1835 17.9154 23.0646 18.4307 23.064C19.2395 23.064 19.9322 23.3556 20.5086 23.9389C21.0851 24.5222 21.3728 25.2226 21.3718 26.04C21.3718 26.8584 21.0841 27.5592 20.5086 28.1425C19.9331 28.7258 19.2405 29.017 18.4307 29.016C17.6219 29.016 16.9298 28.7248 16.3543 28.1425C16.0245 27.8088 15.7891 27.4362 15.648 27.0247H12.9698Z",
                  fill: "currentColor"
                }
              )
            ]
          }
        ) }) }),
        links.slice(0, 6).map((link, index) => /* @__PURE__ */ jsx(
          "li",
          {
            role: "presentation",
            className: "size-[clamp(3rem,_0.375rem_+_5.45vw,_4.75rem)] bg-[#2b2930] has-[a[aria-current=page]]:bg-violet-primary",
            children: /* @__PURE__ */ jsxs(
              NavLink,
              {
                to: link.url,
                className: "flex h-full items-center justify-center text-2xl-3xl-md-xl",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: link.title }),
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      width: "1em",
                      height: "1em",
                      children: /* @__PURE__ */ jsx(
                        "use",
                        {
                          xlinkHref: `${NavigationSprite}#${link.name}`
                        }
                      )
                    }
                  )
                ]
              }
            )
          },
          index
        ))
      ] }),
      /* @__PURE__ */ jsxs("ul", { className: "flex gap-x-1.5", children: [
        links.slice(6).map((link, index) => /* @__PURE__ */ jsx(
          "li",
          {
            role: "presentation",
            className: "size-[clamp(3rem,_0.375rem_+_5.45vw,_4.75rem)] bg-[#2b2930] has-[a[aria-current=page]]:bg-violet-primary",
            children: /* @__PURE__ */ jsxs(
              NavLink,
              {
                to: link.url,
                className: "flex h-full items-center justify-center text-2xl-3xl-md-xl",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: link.title }),
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "icon",
                      height: "1em",
                      width: "1em",
                      children: /* @__PURE__ */ jsx(
                        "use",
                        {
                          xlinkHref: `${NavigationSprite}#${link.name}`
                        }
                      )
                    }
                  )
                ]
              }
            )
          },
          index
        )),
        /* @__PURE__ */ jsx(
          "li",
          {
            role: "presentation",
            className: "size-[clamp(3rem,_0.375rem_+_5.45vw,_4.75rem)] bg-[#2b2930] has-[a[aria-current=page]]:bg-violet-primary",
            children: /* @__PURE__ */ jsxs(SignOutButton, { className: "text-2xl-3xl-md-xl", children: [
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Выйти" }),
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "icon",
                  height: "1em",
                  width: "1em",
                  children: /* @__PURE__ */ jsx("use", { xlinkHref: `${NavigationSprite}#logout` })
                }
              )
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("header", { className: "container grid grid-cols-[auto_1fr_auto] place-items-center ", children: [
      /* @__PURE__ */ jsxs(Root, { className: "md:hidden", children: [
        /* @__PURE__ */ jsx(Trigger, { className: "size-12 rounded-md bg-quaternary p-2.5" }),
        /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsxs(Content, { className: "relative isolate z-10 bg-secondary p-4 shadow-lg", children: [
          /* @__PURE__ */ jsx(Header$1, { className: "flex items-center justify-between text-white", children: /* @__PURE__ */ jsxs(
            "svg",
            {
              width: "109",
              height: "62",
              viewBox: "0 0 109 62",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M44.3866 21.1967V44.33L26.6661 44.33C44.3866 36.6364 40.4246 15.9343 30.3402 9.91998H47.1568L62.4125 29.8819V9.91998H73.1004V44.33H59.8403L44.3866 21.1967Z",
                    fill: "currentColor"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M109 44.33H76.9808V9.91998H109V18.1149H87.6686V23.3914H108.978V29.952H87.6686V35.2751H109V44.33Z",
                    fill: "currentColor"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M14.6416 14.2253L14.6392 14.2261V7.73177C10.4214 8.58832 6.7514 10.8731 4.04606 14.2957C1.14442 17.9666 -0.284067 22.616 0.0469461 27.3118C0.37796 32.0076 2.444 36.4028 5.83093 39.6164C9.21786 42.8299 13.6754 44.6243 18.3099 44.6399C22.9445 44.6555 27.4136 42.8911 30.8214 39.7004C34.2292 36.5097 36.3239 32.1285 36.6855 27.435C37.0471 22.7416 35.6489 18.0827 32.7713 14.3923C30.7728 11.8294 28.1633 9.86512 25.2211 8.66395L21.5282 0V14.056L21.5258 14.0554V17.4483C24.9688 18.745 27.4216 22.1025 27.4216 26.04C27.4216 31.101 23.3694 35.2038 18.3708 35.2038C13.3721 35.2038 9.31988 31.101 9.31988 26.04C9.31988 23.0046 10.7775 20.3139 13.0227 18.6463L14.6392 22.7577V17.6888L14.6416 17.6877V14.2253Z",
                    fill: "currentColor"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M18.0102 47.7805C20.5829 47.7805 22.6492 49.8466 22.6492 52.4191V57.3412C22.6492 59.9137 20.5829 62 18.0102 62H5.86362C3.29092 62 1.22466 59.9137 1.22466 57.3412V52.4191C1.22466 49.8466 3.29092 47.7805 5.86362 47.7805H18.0102ZM19.1244 57.3412V52.4191C19.1244 51.7911 18.6382 51.305 18.0102 51.305H5.86362C5.23564 51.305 4.74946 51.7911 4.74946 52.4191V57.3412C4.74946 57.9691 5.23564 58.4553 5.86362 58.4553H18.0102C18.6382 58.4553 19.1244 57.9691 19.1244 57.3412Z",
                    fill: "currentColor"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M35.7236 47.7603C38.1748 47.7603 40.16 49.7453 40.16 52.176C40.16 54.6269 38.1748 56.612 35.7236 56.612L27.8522 56.6322V61.9797H24.3274V47.7805L35.7236 47.7603ZM35.7236 53.0875C36.23 53.0875 36.6149 52.6824 36.6149 52.176C36.6149 51.6899 36.23 51.2847 35.7236 51.2847L27.8522 51.305V53.0875H35.7236Z",
                    fill: "currentColor"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M59.1677 47.7805V51.305H51.7332V61.9797H48.2084V51.305H40.7941V47.7805H59.1677Z",
                    fill: "currentColor"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M64.1447 61.9797H60.6199V47.74H64.1447V61.9797Z",
                    fill: "currentColor"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M80.0654 47.7805C82.6381 47.7805 84.7044 49.8466 84.7044 52.4191V57.3412C84.7044 59.9137 82.6381 62 80.0654 62H70.9091C68.3364 62 66.2701 59.9137 66.2701 57.3412V52.4191C66.2701 49.8466 68.3364 47.7805 70.9091 47.7805H80.0654ZM81.1796 57.3412V52.4191C81.1796 51.7911 80.6934 51.305 80.0654 51.305H70.9091C70.2811 51.305 69.7949 51.7911 69.7949 52.4191V57.3412C69.7949 57.9691 70.2811 58.4553 70.9091 58.4553H80.0654C80.6934 58.4553 81.1796 57.9691 81.1796 57.3412Z",
                    fill: "currentColor"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M108.959 61.9595L109 61.9797H103.895L90.3567 52.6014V61.9797H86.8319V47.74H90.377L105.434 58.5768V47.74H108.959V61.9595Z",
                    fill: "currentColor"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M12.9698 27.0247L11.2986 28.4952L12.7691 31.0248L14.9014 30.3552C15.171 30.5536 15.4347 30.7212 15.6926 30.8581C15.9504 30.995 16.2259 31.125 16.519 31.248L16.9602 33.48H19.9013L20.3425 31.248C20.6366 31.124 20.9125 30.994 21.1704 30.8581C21.4282 30.7222 21.6914 30.5546 21.9601 30.3552L24.0924 31.0248L25.5629 28.4952L23.8718 27.0072C23.9208 26.6848 23.9453 26.3624 23.9453 26.04C23.9453 25.7176 23.9208 25.3952 23.8718 25.0728L25.5629 23.5848L24.0924 21.0552L21.9601 21.7248C21.6905 21.5264 21.4272 21.3587 21.1704 21.2218C20.9135 21.0849 20.6375 20.955 20.3425 20.832L19.9013 18.6H17.026V23.4207C17.4472 23.1835 17.9154 23.0646 18.4307 23.064C19.2395 23.064 19.9322 23.3556 20.5086 23.9389C21.0851 24.5222 21.3728 25.2226 21.3718 26.04C21.3718 26.8584 21.0841 27.5592 20.5086 28.1425C19.9331 28.7258 19.2405 29.017 18.4307 29.016C17.6219 29.016 16.9298 28.7248 16.3543 28.1425C16.0245 27.8088 15.7891 27.4362 15.648 27.0247H12.9698Z",
                    fill: "currentColor"
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(Menu, { className: "mt-4 w-max text-white-primary", children: links.map((link, index) => /* @__PURE__ */ jsx(
            MenuItem,
            {
              index,
              children: /* @__PURE__ */ jsxs(
                NavLink,
                {
                  to: link.url,
                  className: "flex cursor-pointer items-center gap-x-4 bg-[#2d2930] p-4 focus:bg-violet-primary focus:outline-none focus-visible:outline-transparent",
                  children: [
                    /* @__PURE__ */ jsx(
                      SVGPicker,
                      {
                        name: link.name,
                        className: "text-2xl"
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { children: link == null ? void 0 : link.title })
                  ]
                }
              )
            },
            index
          )) }),
          /* @__PURE__ */ jsx(Close, { className: "absolute inset-[1rem_1rem_auto_auto] rounded bg-quaternary p-3 text-white-primary" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Title, { className: "px-2-4-xs-lg text-center", children: (_a = links.find((link) => link.url === location.pathname)) == null ? void 0 : _a.title }),
      /* @__PURE__ */ jsx("button", { className: "size-12 rounded-md bg-quaternary md:hidden", children: /* @__PURE__ */ jsx(
        SVGPicker,
        {
          name: "notification",
          className: "mx-auto text-xl-2xl-xs-lg"
        }
      ) })
    ] })
  ] });
};
const AppLayout = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "container", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
};
export {
  AppLayout
};
