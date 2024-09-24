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
                    "relative flex h-11 items-stretch justify-between rounded-lg bg-quaternary has-[button[aria-expanded=true]]:rounded-b-none has-[input[aria-expanded=true]]:rounded-b-none",
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
    ...props
}) => {
    const { selectMenuId, triggerRef, inputRef } = useSelectContext();

    const onClickHandler: React.MouseEventHandler<HTMLInputElement> = event => {
        const input = event.currentTarget;
        const isOpen = input.getAttribute("aria-expanded") === "true";

        inputRef.current?.setAttribute("aria-expanded", String(!isOpen));
        triggerRef.current?.setAttribute("aria-expanded", String(!isOpen));
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
        "id" | "role" | "aria-expanded" | "aria-haspopup" | "aria-controls"
    > {}

export const Trigger: React.FC<TriggerProps> = ({
    className,
    onClick,
    onKeyDown,
    ...props
}) => {
    const { triggerId, selectMenuId, inputRef, triggerRef, menuRef } =
        useSelectContext();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = event => {
        const trigger = event.currentTarget;
        const isOpen = trigger.getAttribute("aria-expanded") === "true";

        inputRef.current?.setAttribute("aria-expanded", String(!isOpen));
        triggerRef.current?.setAttribute("aria-expanded", String(!isOpen));
    };

    const onKeyDownHandler: React.KeyboardEventHandler<
        HTMLButtonElement
    > = event => {
        const { key } = event;
        const trigger = event.currentTarget;
        const currentOption = Array.prototype.find.call(
            menuRef.current?.children,
            (child: HTMLLinkElement) =>
                child.getAttribute("aria-selected") === "true"
        ) as HTMLLIElement;

        event.preventDefault();
        event.stopPropagation();

        switch (key) {
            case "Enter":
            case "Space":
                trigger.setAttribute("aria-expanded", "true");
                break;

            case "Home":
                menuRef.current?.firstElementChild?.classList.add(
                    "current-option"
                );
                trigger.setAttribute("aria-expanded", "true");
                break;

            case "End":
                menuRef.current?.lastElementChild?.classList.add(
                    "current-option"
                );
                trigger.setAttribute("aria-expanded", "true");
                break;

            case "ArrowUp": {
                if (trigger.getAttribute("aria-expanded") === "false") {
                    trigger.setAttribute("aria-expanded", "true");
                    break;
                }

                const option =
                    currentOption?.previousElementSibling ||
                    menuRef.current?.firstElementChild;
                const id = option?.getAttribute("id");

                currentOption?.classList.remove("current-option");
                option?.classList.add("current-option");
                trigger.setAttribute("aria-expanded", "true");
                trigger.setAttribute("aria-activedescendant", id || "");
                break;
            }

            case "ArrowDown": {
                if (trigger.getAttribute("aria-expanded") === "false") {
                    trigger.setAttribute("aria-expanded", "true");
                    break;
                }

                const option =
                    currentOption?.nextElementSibling ||
                    menuRef.current?.lastElementChild;
                const id = option?.getAttribute("id");

                currentOption?.classList.remove("current-option");
                option?.classList.add("current-option");
                trigger.setAttribute("aria-expanded", "true");
                trigger.setAttribute("aria-activedescendant", id || "");

                break;
            }

            default:
                break;
        }
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
            // popovertarget={selectMenuId}
            className={cnBase(
                Select.trigger,
                "group border-none px-4 outline-none",
                className
            )}
            onClick={composeEventHandlers(onClick, onClickHandler)}
            onKeyDown={composeEventHandlers(onKeyDown, onKeyDownHandler)}
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
        inputRef.current?.setAttribute(
            "value",
            String(currentSelectedOption?.getAttribute("value")) || ""
        );
        inputRef.current?.setAttribute("aria-expanded", "false");
        triggerRef.current?.setAttribute("aria-expanded", "false");
        triggerRef.current?.setAttribute("aria-activedescendant", "");
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
            aria-selected="true"
            className={cnBase(
                "px-4 py-2 last:rounded-b-lg odd:bg-quaternary even:bg-quaternary hover:bg-violet-quaternary",
                className
            )}
            {...props}
        />
    );
};

Option.displayName = "Select.Option";
