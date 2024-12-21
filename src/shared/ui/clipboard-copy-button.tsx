import { toast } from "sonner";

import { composeEventHandlers } from "../lib/utils/compose-event-handlers";

interface ClipboardCopyButtonProps
    extends React.ComponentPropsWithoutRef<"button"> {
    textToCopy: number | string | undefined;
}

export const ClipboardCopyButton: React.FC<ClipboardCopyButtonProps> = ({
    textToCopy,
    title = "Скопировать в буфер обмена",
    type = "button",
    onClick,
    ...props
}) => {
    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = async () => {
        if (textToCopy === undefined) return;

        try {
            await navigator.clipboard.writeText(String(textToCopy));
            toast("Ссылка скопирована в буфер обмена");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button
            title={title}
            type={type}
            onClick={composeEventHandlers(onClick, onClickHandler)}
            {...props}
        />
    );
};
