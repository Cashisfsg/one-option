import { useRef, useId } from "react";

import { composeEventHandlers } from "@/shared/lib/utils/compose-event-handlers";

import { Portal as DialogPortal } from "../portal";
import { DialogContext, useDialogContext } from "./use-dialog-context";

import Dialog from "./Dialog.module.css";

interface RootProps extends React.PropsWithChildren {}

export const Root: React.FC<RootProps> = ({ children }) => {
    const dialogId = `dialog-${useId()}`;
    const dialogRef = useRef<HTMLDialogElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    return (
        <DialogContext.Provider value={{ dialogId, dialogRef, triggerRef }}>
            {children}
        </DialogContext.Provider>
    );
};

Root.displayName = "Dialog.Root";

interface TriggerProps
    extends Omit<
        React.ComponentProps<"button">,
        "aria-expanded" | "aria-haspopup" | "aria-controls"
    > {}

export const Trigger: React.FC<TriggerProps> = ({ onClick, ...props }) => {
    const { dialogId, dialogRef, triggerRef } = useDialogContext();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = event => {
        const trigger = event.currentTarget;
        const rootElement = document.querySelector("#root")!;
        const dialogOpen = trigger.getAttribute("aria-expanded") === "true";

        if (dialogOpen) {
            dialogRef.current?.close();
        } else {
            dialogRef.current?.showModal();
            rootElement.setAttribute("inert", "");
            rootElement.setAttribute("aria-hidden", "true");
        }

        trigger.setAttribute("aria-expanded", String(!dialogOpen));
    };

    return (
        <button
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls={dialogId}
            onClick={composeEventHandlers(onClick, onClickHandler)}
            ref={triggerRef}
            {...props}
        />
    );
};

Trigger.displayName = "Dialog.Trigger";

interface PortalProps extends React.PropsWithChildren {}

export const Portal: React.FC<PortalProps> = ({ children }) => {
    return <DialogPortal>{children}</DialogPortal>;
};

Portal.displayName = "Dialog.Portal";

interface ContentProps extends React.ComponentProps<"dialog"> {}

export const Content: React.FC<ContentProps> = ({
    className,
    onClick,
    onClose,
    children,
    ...props
}) => {
    const contentId = `dialog-content-${useId()}`;
    const contentRef = useRef<HTMLElement>(null);

    const { dialogRef, triggerRef } = useDialogContext();

    const handleOverlayClick: React.MouseEventHandler<
        HTMLDialogElement
    > = () => {
        dialogRef.current?.close();
    };

    const onCloseHandler: React.ReactEventHandler<HTMLDialogElement> = () => {
        const rootElement = document.querySelector("div#root");

        if (!rootElement) return;

        rootElement.removeAttribute("inert");
        rootElement.removeAttribute("aria-hidden");
        triggerRef.current?.setAttribute("aria-expanded", "false");
        triggerRef.current?.focus();
    };

    return (
        <dialog
            className={Dialog.modal}
            onClick={composeEventHandlers(onClick, handleOverlayClick)}
            onClose={composeEventHandlers(onClose, onCloseHandler)}
            ref={dialogRef}
            {...props}
        >
            <section
                id={contentId}
                className={
                    className
                        ? `${Dialog.Content} ${className}`
                        : Dialog.content
                }
                // className={Dialog.content}
                onClick={event => event.stopPropagation()}
                ref={contentRef}
            >
                {children}
            </section>
        </dialog>
    );
};

Content.displayName = "Dialog.Content";

interface CloseProps
    extends Omit<
        React.ComponentProps<"button">,
        "aria-haspopup" | "aria-controls"
    > {}

export const Close: React.FC<CloseProps> = ({ onClick, ...props }) => {
    const { dialogRef, triggerRef } = useDialogContext();

    const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
        dialogRef.current?.close();
        triggerRef.current?.setAttribute("aria-expanded", "false");
    };

    return (
        <button
            onClick={composeEventHandlers(onClick, onClickHandler)}
            {...props}
        />
    );
};

Close.displayName = "Dialog.Close";
