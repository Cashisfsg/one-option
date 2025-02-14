import React, { useId, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import { cnBase } from "tailwind-variants";

import { TooltipContext, useTooltipContext } from "./use-tooltip-context";

interface TooltipProps {
    children: React.ReactNode;
}

const Root: React.FC<TooltipProps> = ({ children }) => {
    const triggerRef = useRef<HTMLElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const triggerId = useId();
    const tooltipId = useId();
    const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const contextValue = useMemo(
        () => ({ triggerRef, tooltipRef, triggerId, tooltipId, timerRef }),
        [triggerId, tooltipId]
    );

    return (
        <TooltipContext.Provider value={contextValue}>
            {children}
        </TooltipContext.Provider>
    );
};

const Trigger: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { triggerId, tooltipId, triggerRef, tooltipRef, timerRef } =
        useTooltipContext();

    const triggerElement = React.Children.only(children) as React.ReactElement;
    const props = triggerElement.props;

    if (!React.isValidElement(triggerElement)) return <>{children}</>;

    const onMouseEnterHandler = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.currentTarget;

        if (tooltipRef.current?.getAttribute("aria-hidden") === "false") {
            clearTimeout(timerRef.current);
        } else {
            timerRef.current = setTimeout(() => {
                if (!tooltipRef.current) return;

                const scrollOffset = document.documentElement.scrollTop;
                const tooltipElement = tooltipRef.current;
                const tooltipRect = tooltipElement.getBoundingClientRect();
                const anchorRect = target.getBoundingClientRect();

                if (
                    (anchorRect.right + anchorRect.left) / 2 -
                        tooltipRect.width / 2 -
                        16 <
                    0
                ) {
                    tooltipElement.style.left = `${16}px`;
                } else {
                    tooltipElement.style.left = `${
                        (anchorRect.right + anchorRect.left) / 2 -
                        tooltipRect.width / 2
                    }px`;
                }

                tooltipElement.style.top = `${
                    anchorRect.bottom + scrollOffset + 16
                }px`;

                tooltipElement.setAttribute("aria-hidden", "false");
            }, 1000);
        }
    };

    const onMouseLeaveHandler = () => {
        if (tooltipRef.current?.getAttribute("aria-hidden") === "true") {
            clearTimeout(timerRef.current);
        } else {
            timerRef.current = setTimeout(() => {
                tooltipRef.current?.setAttribute("aria-hidden", "true");
            }, 500);
        }
    };

    const onClickHandler: React.PointerEventHandler<HTMLElement> = event => {
        event.stopPropagation();

        if (tooltipRef.current?.getAttribute("aria-hidden") === "true") {
            const target = event.currentTarget;

            if (!tooltipRef.current) return;

            const scrollOffset = document.documentElement.scrollTop;
            const tooltipElement = tooltipRef.current;
            const tooltipRect = tooltipElement.getBoundingClientRect();
            const anchorRect = target.getBoundingClientRect();

            if (
                (anchorRect.right + anchorRect.left) / 2 -
                    tooltipRect.width / 2 -
                    16 <
                0
            ) {
                tooltipElement.style.left = `${16}px`;
            } else {
                tooltipElement.style.left = `${
                    (anchorRect.right + anchorRect.left) / 2 -
                    tooltipRect.width / 2
                }px`;
            }

            tooltipElement.style.top = `${
                anchorRect.bottom + scrollOffset + 16
            }px`;

            tooltipElement.setAttribute("aria-hidden", "false");
        } else {
            tooltipRef.current?.setAttribute("aria-hidden", "true");
        }
    };

    const onFocusHandler: React.FocusEventHandler<HTMLElement> = event => {
        event.stopPropagation();
        const target = event.currentTarget;

        if (tooltipRef.current?.getAttribute("aria-hidden") === "false") {
            clearTimeout(timerRef.current);
        } else {
            timerRef.current = setTimeout(() => {
                if (!tooltipRef.current) return;

                const scrollOffset = document.documentElement.scrollTop;
                const tooltipElement = tooltipRef.current;
                const tooltipRect = tooltipElement.getBoundingClientRect();
                const anchorRect = target.getBoundingClientRect();

                if (
                    (anchorRect.right + anchorRect.left) / 2 -
                        tooltipRect.width / 2 -
                        16 <
                    0
                ) {
                    tooltipElement.style.left = `${16}px`;
                } else {
                    tooltipElement.style.left = `${
                        (anchorRect.right + anchorRect.left) / 2 -
                        tooltipRect.width / 2
                    }px`;
                }

                tooltipElement.style.top = `${
                    anchorRect.bottom + scrollOffset + 16
                }px`;

                tooltipElement.setAttribute("aria-hidden", "false");
            }, 1000);
        }
    };

    const onBlurHandler = () => {
        tooltipRef.current?.setAttribute("aria-hidden", "true");
    };

    const onKeyDownHandler: React.KeyboardEventHandler<HTMLElement> = event => {
        if (event.key === "Escape") {
            event.stopPropagation();
            tooltipRef.current?.setAttribute("aria-hidden", "true");
        } else if (event.key === " " || event.key === "Space") {
            event.preventDefault();

            if (tooltipRef.current?.getAttribute("aria-hidden") === "true") {
                tooltipRef.current?.setAttribute("aria-hidden", "false");
            } else {
                tooltipRef.current?.setAttribute("aria-hidden", "true");
            }
        }
    };

    return (
        <>
            {React.cloneElement(triggerElement as React.ReactElement, {
                id: triggerId,
                tabIndex: 0,
                "aria-haspopup": "true",
                "aria-labelledby": tooltipId,
                onMouseEnter: onMouseEnterHandler,
                onKeyDown: onKeyDownHandler,
                onFocus: onFocusHandler,
                onMouseLeave: onMouseLeaveHandler,
                onBlur: onBlurHandler,
                onPointerDown: onClickHandler,
                ref: triggerRef,
                ...props
            })}
        </>
    );
};

const portalRoot = document.querySelector("body")!;

const Portal: React.FC<React.PropsWithChildren> = ({ children }) => {
    return ReactDOM.createPortal(children, portalRoot);
};

interface TooltipContentProps extends React.ComponentProps<"div"> {}

const Content: React.FC<TooltipContentProps> = ({
    className,
    children,
    ...props
}) => {
    const { tooltipRef, timerRef } = useTooltipContext();

    const onMouseEnterHandler: React.MouseEventHandler<HTMLDivElement> = () => {
        if (tooltipRef.current?.getAttribute("aria-hidden") === "false") {
            clearTimeout(timerRef.current);
        }
    };

    const onMouseLeaveHandler: React.MouseEventHandler<HTMLDivElement> = () => {
        timerRef.current = setTimeout(() => {
            tooltipRef.current?.setAttribute("aria-hidden", "true");
        }, 500);
    };

    return (
        <div
            {...props}
            aria-hidden="true"
            role="tooltip"
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            className={cnBase(
                "absolute isolate aria-[hidden=false]:visible aria-[hidden=true]:invisible",
                className
            )}
            ref={tooltipRef}
        >
            {children}
        </div>
    );
};

export { Root, Trigger, Portal, Content };
