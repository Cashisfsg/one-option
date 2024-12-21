import { ClipboardCopyButton } from "./clipboard-copy-button";

import IconsSprite from "@/assets/img/svg/icons-spite.svg";

interface ClipboardCopyProps
    extends Omit<React.ComponentPropsWithoutRef<"form">, "children"> {
    textToCopy: number | string | undefined;
}

export const ClipboardCopy: React.FC<ClipboardCopyProps> = ({
    textToCopy,
    ...props
}) => {
    return (
        <form
            className="grid grid-cols-[minmax(0,_1fr)_auto] gap-x-2 @container"
            {...props}
        >
            <input
                defaultValue={textToCopy}
                readOnly
                className="h-11 rounded-md bg-quaternary px-4 py-3 text-sm-base-xs-sm"
            />

            <ClipboardCopyButton
                textToCopy={textToCopy}
                className="flex size-11 items-center justify-center rounded-md bg-violet-primary"
            >
                <span className="sr-only">Скопировать в буфер обмена</span>
                <svg
                    height="20"
                    width="20"
                >
                    <use xlinkHref={`${IconsSprite}#copy`} />
                </svg>
            </ClipboardCopyButton>
        </form>
    );
};
