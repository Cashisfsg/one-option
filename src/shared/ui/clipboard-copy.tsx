import { toast } from "sonner";

import { composeEventHandlers } from "../lib/utils/compose-event-handlers";

import IconsSprite from "@/assets/img/svg/icons-spite.svg";

interface ClipboardCopyProps
    extends Omit<React.ComponentPropsWithoutRef<"form">, "children"> {
    textToCopy: number | string | undefined;
}

export const ClipboardCopy: React.FC<ClipboardCopyProps> = ({
    textToCopy,
    onSubmit,
    ...props
}) => {
    const copyToClipboard: React.FormEventHandler<
        HTMLFormElement
    > = async event => {
        event.preventDefault();

        if (textToCopy === undefined) return;

        try {
            await navigator.clipboard.writeText(String(textToCopy));
            toast("Ссылка скопирована в буфер обмена");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            onSubmit={composeEventHandlers(onSubmit, copyToClipboard)}
            className="grid grid-cols-[minmax(0,_1fr)_auto] gap-x-2 @container"
            {...props}
        >
            <input
                defaultValue={textToCopy}
                readOnly
                className="h-11 rounded-md bg-quaternary px-4 py-3 text-sm-base-xs-sm"
            />

            <button
                title="Скопировать в буфер обмена"
                className="flex size-11 items-center justify-center rounded-md bg-violet-primary"
            >
                <span className="sr-only">Скопировать в буфер обмена</span>
                <svg
                    height="20"
                    width="20"
                >
                    <use xlinkHref={`${IconsSprite}#copy`} />
                </svg>
            </button>
        </form>
    );
};
