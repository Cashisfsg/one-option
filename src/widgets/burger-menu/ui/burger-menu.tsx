import React, { useMemo, useRef, useId, useLayoutEffect } from "react";
import ReactDOM from "react-dom";

import { useWindowEvent, useOutsideClick } from "@/shared/lib/hooks";
import { cn } from "@/shared/lib";
import { composeEventHandlers } from "@/shared/lib/utils/compose-event-handlers";

import {
    BurgerMenuContext,
    useBurgerMenuContext
} from "./use-burger-menu-context";

import NavigationSprite from "@/assets/img/svg/navigation-sprite.svg";
import IconsSprite from "@/assets/img/svg/icons-spite.svg";

import "./burger-menu.css";

interface BurgerMenuRoot
    extends Omit<React.ComponentProps<"nav">, "role" | "aria-label"> {}

const Root: React.FC<BurgerMenuRoot> = ({ className, children, ...props }) => {
    const burgerMenuTriggerId = useId();
    const burgerMenuId = useId();
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const currentFocusableElementIndex = useRef<number>(0);

    return (
        <BurgerMenuContext.Provider
            value={useMemo(
                () => ({
                    burgerMenuTriggerId,
                    burgerMenuId,
                    triggerRef,
                    currentFocusableElementIndex,
                    dialogRef
                }),
                []
            )}
        >
            <nav
                {...props}
                role="navigation"
                aria-label="Бургер меню"
                className={cn("burger-menu", className)}
            >
                {children}
            </nav>
        </BurgerMenuContext.Provider>
    );
};

Root.displayName = "BurgerMenu.Root";

const portalRoot = document.querySelector("body")!;
const contentRoot = document.querySelector("#root")!;

export const Portal: React.FC<React.PropsWithChildren> = ({ children }) => {
    return ReactDOM.createPortal(children, portalRoot);
};

Portal.displayName = "BurgerMenu.Portal";

interface TriggerProps
    extends Omit<
        React.ComponentProps<"button">,
        "type" | "aria-haspopup" | "aria-controls" | "aria-expanded"
    > {}

const Trigger: React.FC<TriggerProps> = ({ children, onClick, ...props }) => {
    const { burgerMenuTriggerId, burgerMenuId, triggerRef, dialogRef } =
        useBurgerMenuContext();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = event => {
        const button = event.currentTarget;
        const open = dialogRef.current?.hasAttribute("open");

        if (open) {
            dialogRef.current?.close();
        } else {
            dialogRef.current?.show();
            button.setAttribute("aria-expanded", "true");

            contentRoot.setAttribute("inert", "");
            contentRoot.setAttribute("aria-hidden", "true");
        }
    };

    return (
        <button
            {...props}
            id={burgerMenuTriggerId}
            type="button"
            aria-haspopup="menu"
            aria-controls={burgerMenuId}
            aria-expanded="false"
            onClick={composeEventHandlers(onClick, onClickHandler)}
            ref={triggerRef}
        >
            {children ? (
                children
            ) : (
                <>
                    <svg
                        height="2em"
                        width="2em"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <use xlinkHref={`${NavigationSprite}#burger-menu`} />
                    </svg>
                    <span className="sr-only">Открыть бургер меню</span>
                </>
            )}
        </button>
    );
};

Trigger.displayName = "BurgerMenu.Trigger";

interface CloseProps extends React.ComponentProps<"button"> {}

const Close: React.FC<CloseProps> = ({ onClick, ...props }) => {
    const { dialogRef } = useBurgerMenuContext();

    const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
        dialogRef.current?.close();
    };

    return (
        <button
            type="button"
            onClick={composeEventHandlers(onClick, onClickHandler)}
            {...props}
        >
            <svg
                height="1em"
                width="1em"
                aria-hidden="true"
                focusable="false"
            >
                <use xlinkHref={`${IconsSprite}#close`} />
            </svg>
            <span className="sr-only">Закрыть бургер меню</span>
        </button>
    );
};

Close.displayName = "BurgerMenu.Close";

interface ContentProps extends React.ComponentProps<"dialog"> {}

const Content: React.FC<ContentProps> = ({
    className,
    onClose,
    onKeyDown,
    children,
    ...props
}) => {
    const { currentFocusableElementIndex, triggerRef, dialogRef } =
        useBurgerMenuContext();
    const focusableElements = useRef<Element[] | null>(null);
    const menuItems = useRef<Element[] | null>(null);

    useLayoutEffect(() => {
        if (!dialogRef.current) return;

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
        dialogRef.current?.close();
    };

    useOutsideClick(dialogRef, closeBurgerMenu, { capture: true });
    useWindowEvent("visibilitychange", () => {
        if (!dialogRef.current?.hasAttribute("open") || !document.hidden)
            return;

        dialogRef.current?.close();
    });

    const onCloseHandler: React.ReactEventHandler<HTMLDialogElement> = () => {
        contentRoot.removeAttribute("inert");
        contentRoot.removeAttribute("aria-hidden");
        triggerRef.current?.setAttribute("aria-expanded", "false");
        triggerRef.current?.focus();
    };

    const onKeyDownHandler: React.KeyboardEventHandler<
        HTMLDialogElement
    > = event => {
        const { key, shiftKey } = event;

        if (key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            dialogRef.current?.close();
        }

        if (key === "Tab") {
            const firstFocusableElement = focusableElements.current?.at(
                currentFocusableElementIndex.current
            );
            const lastFocusableElement = focusableElements.current?.at(-1);

            if (
                !(firstFocusableElement instanceof HTMLElement) ||
                !(lastFocusableElement instanceof HTMLElement)
            )
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
            const previousFocusableMenuItem = menuItems.current?.at(
                currentFocusableElementIndex.current
            );
            const firstMenuItem = menuItems.current?.at(0);

            if (
                !(previousFocusableMenuItem instanceof HTMLElement) ||
                !(firstMenuItem instanceof HTMLElement)
            ) {
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
            const previousFocusableMenuItem = menuItems.current?.at(
                currentFocusableElementIndex.current
            );
            const lastMenuItem = menuItems.current?.at(-1);

            if (
                !(previousFocusableMenuItem instanceof HTMLElement) ||
                !(lastMenuItem instanceof HTMLElement)
            ) {
                return;
            }

            previousFocusableMenuItem.setAttribute("tabIndex", "-1");
            lastMenuItem.setAttribute("tabIndex", "0");
            lastMenuItem.focus();
            currentFocusableElementIndex.current =
                (menuItems.current?.length || 1) - 1;

            event.preventDefault();
            event.stopPropagation();
        }

        if (key === "ArrowUp") {
            const previousFocusableMenuItem = menuItems.current?.at(
                currentFocusableElementIndex.current
            );

            const nextFocusableMenuItem =
                document.activeElement === menuItems.current?.at(0)
                    ? menuItems.current?.at(-1)
                    : menuItems.current?.at(
                          currentFocusableElementIndex.current - 1
                      );

            if (
                !(previousFocusableMenuItem instanceof HTMLElement) ||
                !(nextFocusableMenuItem instanceof HTMLElement)
            ) {
                return;
            }

            previousFocusableMenuItem.setAttribute("tabIndex", "-1");
            nextFocusableMenuItem.setAttribute("tabIndex", "0");
            nextFocusableMenuItem.focus();
            currentFocusableElementIndex.current =
                currentFocusableElementIndex.current === 0
                    ? (menuItems.current?.length || 1) - 1
                    : currentFocusableElementIndex.current - 1;

            event.preventDefault();
            event.stopPropagation();
        }

        if (key === "ArrowDown") {
            const previousFocusableMenuItem = menuItems.current?.at(
                currentFocusableElementIndex.current
            );

            const nextFocusableMenuItem =
                document.activeElement === menuItems.current?.at(-1)
                    ? menuItems.current?.at(0)
                    : menuItems.current?.at(
                          currentFocusableElementIndex.current + 1
                      );

            if (
                !(previousFocusableMenuItem instanceof HTMLElement) ||
                !(nextFocusableMenuItem instanceof HTMLElement)
            ) {
                return;
            }

            previousFocusableMenuItem.setAttribute("tabIndex", "-1");
            nextFocusableMenuItem.setAttribute("tabIndex", "0");
            nextFocusableMenuItem.focus();
            currentFocusableElementIndex.current =
                currentFocusableElementIndex.current ===
                (menuItems.current?.length || 1) - 1
                    ? 0
                    : currentFocusableElementIndex.current + 1;

            event.preventDefault();
            event.stopPropagation();
        }
    };

    return (
        <dialog
            className={cn("burger-menu_dialog", className)}
            onClose={composeEventHandlers(onClose, onCloseHandler)}
            onKeyDown={composeEventHandlers(onKeyDown, onKeyDownHandler)}
            ref={dialogRef}
            {...props}
        >
            <section className="burger-menu_content">{children}</section>
        </dialog>
    );
};

Content.displayName = "BurgerMenu.Content";

interface HeaderProps extends React.ComponentProps<"header"> {}

const Header: React.FC<HeaderProps> = props => {
    return <header {...props} />;
};

Header.displayName = "BurgerMenu.Header";

interface MenuProps
    extends Omit<React.ComponentProps<"ul">, "role" | "aria-labelledby"> {
    children: React.FC<MenuItemProps>;
}

const Menu: React.FC<MenuProps> = props => {
    const { burgerMenuId, burgerMenuTriggerId } = useBurgerMenuContext();

    return (
        <ul
            id={burgerMenuId}
            role="menu"
            aria-labelledby={burgerMenuTriggerId}
            {...props}
        />
    );
};

Menu.displayName = "BurgerMenu.Menu";

interface MenuItemProps extends React.ComponentProps<"li"> {
    index: number;
    children: React.ReactElement<React.ComponentProps<"a">>;
}

const MenuItem: React.FC<MenuItemProps> = ({
    index,
    className,
    children,
    ...props
}) => {
    const { dialogRef, currentFocusableElementIndex } = useBurgerMenuContext();

    const anchorElement = React.Children.only(children) as React.ReactElement;
    const { onClick, onMouseOver, ...anchorProps } = anchorElement.props;

    if (!React.isValidElement(anchorElement)) return <>{children}</>;

    const onClickHandler: React.MouseEventHandler<HTMLAnchorElement> = () => {
        dialogRef.current?.close();
    };

    const onMouseOverHandler: React.MouseEventHandler<
        HTMLAnchorElement
    > = event => {
        const target = event.currentTarget;
        target.focus();
        currentFocusableElementIndex.current = index;
    };

    return (
        <li
            role="presentation"
            className={className}
            {...props}
        >
            {React.cloneElement(anchorElement, {
                tabIndex: -1,
                role: "menuitem",
                onClick: composeEventHandlers(onClick, onClickHandler),
                onMouseOver: composeEventHandlers(
                    onMouseOver,
                    onMouseOverHandler
                ),
                ...anchorProps
            })}
        </li>
    );
};

MenuItem.displayName = "BurgerMenu.MenuItem";

export { Root, Trigger, Close, Content, Header, Menu, MenuItem };
