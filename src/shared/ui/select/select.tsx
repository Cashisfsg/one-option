import React, { useRef, useMemo, useId } from "react";
import { cnBase } from "tailwind-variants";

import { SelectContext, useSelectContext } from "./use-select-context";

import { composeEventHandlers } from "@/shared/lib/utils/compose-event-handlers";

import Select from "./Select.module.css";

interface RootProps extends React.ComponentPropsWithoutRef<"div"> {}

export const Root: React.FC<RootProps> = ({ className, ...props }) => {
    const triggerId = `trigger-${useId()}`;
    const selectMenuId = `select-menu-${useId()}`;

    const inputRef = useRef<HTMLInputElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

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

    return (
        <SelectContext.Provider value={contextValue}>
            <div
                className={cnBase(
                    Select.root,
                    "relative flex h-11 items-stretch justify-between rounded-lg bg-quaternary outline-offset-2 focus-within:outline focus-within:outline-1 focus-within:outline-white has-[button[aria-expanded=true]]:rounded-b-none has-[input[aria-expanded=true]]:rounded-b-none",
                    className
                )}
                {...props}
            />
        </SelectContext.Provider>
    );
};

Root.displayName = "Select.Root";

interface InputProps
    extends Omit<
        React.ComponentPropsWithoutRef<"input">,
        | "role"
        | "aria-autocomplete"
        | "aria-expanded"
        | "aria-controls"
        | "aria-activedescendant"
    > {}

export const Input: React.FC<InputProps> = ({
    type = "text",
    className,
    onClick,
    onKeyDown,
    ...props
}) => {
    const { selectMenuId, triggerRef, inputRef, menuRef } = useSelectContext();

    const onClickHandler: React.MouseEventHandler<HTMLInputElement> = event => {
        const input = event.currentTarget;
        const isOpen = input.getAttribute("aria-expanded") === "true";

        if (!isOpen) {
            const activeDescendant =
                Array.from(menuRef.current?.children || []).find(
                    child => child.getAttribute("aria-selected") === "true"
                ) || menuRef.current?.firstElementChild;
            if (!activeDescendant) return;

            const id = activeDescendant.getAttribute("id");
            if (!id) return;

            inputRef.current?.setAttribute("aria-activedescendant", id);
            activeDescendant.scrollIntoView({ block: "nearest" });
        } else {
            inputRef.current?.setAttribute("aria-activedescendant", "");
        }

        inputRef.current?.setAttribute("aria-expanded", String(!isOpen));
        triggerRef.current?.setAttribute("aria-expanded", String(!isOpen));
        inputRef.current?.focus();
    };

    const onKeyDownHandler: React.KeyboardEventHandler<
        HTMLInputElement
    > = event => {
        const { code } = event;
        let flag = false;
        const isExpanded =
            inputRef.current?.getAttribute("aria-expanded") === "true";

        const showDropDownMenu = (activedescendantId: string) => {
            inputRef.current?.setAttribute("aria-expanded", "true");
            triggerRef.current?.setAttribute("aria-expanded", "true");
            inputRef.current?.setAttribute(
                "aria-activedescendant",
                activedescendantId
            );
        };

        const hideDropDownMenu = () => {
            inputRef.current?.setAttribute("aria-expanded", "false");
            triggerRef.current?.setAttribute("aria-expanded", "false");
            inputRef.current?.setAttribute("aria-activedescendant", "");
        };

        if (!inputRef.current) return;

        switch (code) {
            case "Space":
            case "Enter": {
                if (isExpanded) {
                    const activeDescendant = Array.prototype.find.call(
                        menuRef.current?.children,
                        child =>
                            child.getAttribute("id") ===
                            inputRef.current?.getAttribute(
                                "aria-activedescendant"
                            )
                    );
                    if (!activeDescendant) break;
                    const value = activeDescendant.getAttribute("value");

                    inputRef.current.value = value;

                    hideDropDownMenu();
                    const previousSelectedOption = Array.prototype.find.call(
                        menuRef.current?.children,
                        child => child.getAttribute("aria-selected") === "true"
                    );
                    previousSelectedOption?.setAttribute(
                        "aria-selected",
                        "false"
                    );
                    activeDescendant.setAttribute("aria-selected", "true");
                } else {
                    const activeDescendant =
                        Array.prototype.find.call(
                            menuRef.current?.children,
                            child =>
                                child.getAttribute("aria-selected") === "true"
                        ) || menuRef.current?.firstElementChild;

                    if (!activeDescendant) break;

                    const id = activeDescendant.getAttribute("id");

                    if (!id) break;

                    showDropDownMenu(id);
                    activeDescendant.classList.add("!bg-violet-quaternary");
                }

                flag = true;
                break;
            }

            case "Tab": {
                if (!isExpanded) break;
                hideDropDownMenu();
                break;
            }

            case "Escape": {
                if (isExpanded) {
                    hideDropDownMenu();
                    flag = true;
                    break;
                }

                if (inputRef.current.value !== "") {
                    inputRef.current.value = "";
                    Array.from(menuRef.current?.children || [])
                        .find(
                            element =>
                                element.getAttribute("aria-selected") === "true"
                        )
                        ?.setAttribute("aria-selected", "false");
                    flag = true;
                    break;
                }

                break;
            }

            case "Home": {
                const firstElement = menuRef.current?.firstElementChild;
                if (!firstElement) break;

                if (!isExpanded) {
                    const id = firstElement.getAttribute("id");
                    if (!id) break;
                    showDropDownMenu(id);
                }

                const activeDescendant = Array.prototype.find.call(
                    menuRef.current?.children,
                    child =>
                        child.getAttribute("id") ===
                        inputRef.current?.getAttribute("aria-activedescendant")
                );
                activeDescendant.classList.remove("!bg-violet-quaternary");
                firstElement.classList.add("!bg-violet-quaternary");
                firstElement.scrollIntoView();

                flag = true;
                break;
            }

            case "End": {
                const lastElement = menuRef.current?.lastElementChild;
                if (!lastElement) break;

                if (!isExpanded) {
                    const id = lastElement.getAttribute("id");
                    if (!id) break;
                    showDropDownMenu(id);
                }

                const activeDescendant = Array.prototype.find.call(
                    menuRef.current?.children,
                    child =>
                        child.getAttribute("id") ===
                        inputRef.current?.getAttribute("aria-activedescendant")
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
                        menuRef.current?.children,
                        child =>
                            child.getAttribute("id") ===
                            inputRef.current?.getAttribute(
                                "aria-activedescendant"
                            )
                    );
                    if (!activeDescendant) return;

                    const nextActiveDescendant =
                        activeDescendant?.nextElementSibling ||
                        menuRef.current?.firstElementChild;
                    const id = nextActiveDescendant.getAttribute("id");
                    if (!id) return;
                    inputRef.current?.setAttribute("aria-activedescendant", id);
                    activeDescendant.classList.remove("!bg-violet-quaternary");
                    nextActiveDescendant?.classList.add(
                        "!bg-violet-quaternary"
                    );
                } else {
                    const activeDescendant =
                        Array.from(menuRef.current?.children || []).find(
                            child =>
                                child.getAttribute("aria-selected") === "true"
                        ) || menuRef.current?.firstElementChild;
                    if (!activeDescendant) return;

                    const id = activeDescendant.getAttribute("id");
                    if (!id) return;

                    showDropDownMenu(id);
                    activeDescendant.scrollIntoView({ block: "nearest" });
                }

                flag = true;
                break;
            }

            case "ArrowUp": {
                if (isExpanded) {
                    const activeDescendant = Array.prototype.find.call(
                        menuRef.current?.children,
                        child =>
                            child.getAttribute("id") ===
                            inputRef.current?.getAttribute(
                                "aria-activedescendant"
                            )
                    );
                    if (!activeDescendant) return;
                    const nextActiveDescendant =
                        activeDescendant?.previousElementSibling ||
                        menuRef.current?.lastElementChild;
                    const id = nextActiveDescendant.getAttribute("id");
                    if (!id) return;
                    inputRef.current?.setAttribute("aria-activedescendant", id);
                    activeDescendant.classList.remove("!bg-violet-quaternary");
                    nextActiveDescendant?.classList.add(
                        "!bg-violet-quaternary"
                    );
                } else {
                    const activeDescendant =
                        Array.from(menuRef.current?.children || []).find(
                            child =>
                                child.getAttribute("aria-selected") === "true"
                        ) || menuRef.current?.lastElementChild;
                    if (!activeDescendant) return;

                    const id = activeDescendant.getAttribute("id");
                    if (!id) return;

                    showDropDownMenu(id);
                    activeDescendant.scrollIntoView({ block: "nearest" });
                }

                flag = true;
                break;
            }

            default:
                break;
        }

        if (flag) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    return (
        <input
            type={type}
            readOnly
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="false"
            aria-controls={selectMenuId}
            aria-activedescendant=""
            onClick={composeEventHandlers(onClick, onClickHandler)}
            onKeyDown={composeEventHandlers(onKeyDown, onKeyDownHandler)}
            className={cnBase(
                Select.input,
                "flex-auto cursor-pointer select-none px-4 text-white outline-none placeholder:text-white/30",
                className
            )}
            ref={inputRef}
            {...props}
        />
    );
};

Input.displayName = "Select.Input";

interface TriggerProps
    extends Omit<
        React.ComponentPropsWithoutRef<"button">,
        | "id"
        | "role"
        | "aria-expanded"
        | "aria-haspopup"
        | "aria-controls"
        | "tabIndex"
    > {}

export const Trigger: React.FC<TriggerProps> = ({
    className,
    onClick,
    ...props
}) => {
    const { triggerId, selectMenuId, inputRef, triggerRef, menuRef } =
        useSelectContext();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = event => {
        const trigger = event.currentTarget;
        const isOpen = trigger.getAttribute("aria-expanded") === "true";

        if (!isOpen) {
            const activeDescendant =
                Array.from(menuRef.current?.children || []).find(
                    child => child.getAttribute("aria-selected") === "true"
                ) || menuRef.current?.firstElementChild;
            if (!activeDescendant) return;

            const id = activeDescendant.getAttribute("id");
            if (!id) return;

            inputRef.current?.setAttribute("aria-activedescendant", id);
            activeDescendant.scrollIntoView({ block: "nearest" });
        } else {
            inputRef.current?.setAttribute("aria-activedescendant", "");
        }

        inputRef.current?.setAttribute("aria-expanded", String(!isOpen));
        triggerRef.current?.setAttribute("aria-expanded", String(!isOpen));
        inputRef.current?.focus();
    };

    return (
        <button
            id={triggerId}
            type="button"
            role="combobox"
            aria-expanded="false"
            aria-haspopup="listbox"
            aria-controls={selectMenuId}
            aria-activedescendant=""
            tabIndex={-1}
            className={cnBase(
                Select.trigger,
                "group border-none px-4 outline-none",
                className
            )}
            onClick={composeEventHandlers(onClick, onClickHandler)}
            ref={triggerRef}
            {...props}
        />
    );
};

interface MenuProps
    extends Omit<
        React.ComponentPropsWithoutRef<"ul">,
        "id" | "role" | "tabIndex" | "aria-multiselectable"
    > {}

export const Menu: React.FC<MenuProps> = ({ className, onClick, ...props }) => {
    const { selectMenuId, inputRef, triggerRef, menuRef } = useSelectContext();

    const onClickHandler: React.MouseEventHandler<HTMLUListElement> = event => {
        if (!inputRef.current) return;

        const currentSelectedOption = (event.target as HTMLElement).closest(
            "li"
        );
        const menu = event.currentTarget;
        const previousSelectedOption = Array.prototype.find.call(
            menu.children,
            (child: HTMLLinkElement) =>
                child.getAttribute("aria-selected") === "true"
        ) as HTMLLIElement;

        previousSelectedOption?.setAttribute("aria-selected", "false");
        previousSelectedOption?.classList.remove("current-option");
        currentSelectedOption?.setAttribute("aria-selected", "true");
        inputRef.current.value =
            String(currentSelectedOption?.getAttribute("value")) || "";

        inputRef.current?.setAttribute("aria-expanded", "false");
        triggerRef.current?.setAttribute("aria-expanded", "false");
        inputRef.current?.setAttribute("aria-activedescendant", "");
        inputRef.current?.focus();
    };

    return (
        <ul
            id={selectMenuId}
            role="listbox"
            tabIndex={-1}
            onClick={composeEventHandlers(onClick, onClickHandler)}
            ref={menuRef}
            className={cnBase(Select.menu, "rounded-b-lg shadow-lg", className)}
            {...props}
        />
    );
};

Menu.displayName = "Select.Menu";

interface OptionProps
    extends Omit<React.ComponentPropsWithoutRef<"li">, "role"> {}

export const Option: React.FC<OptionProps> = ({ className, ...props }) => {
    const optionId = `option-${useId()}`;

    return (
        <li
            id={optionId}
            role="option"
            aria-selected="false"
            className={cnBase(
                "px-4 py-2 last:rounded-b-lg hover:bg-violet-quaternary aria-selected:bg-violet-secondary",
                className
            )}
            {...props}
        />
    );
};

Option.displayName = "Select.Option";
