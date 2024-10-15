import { useId } from "react";
import { AttachWalletForm } from "@/features/wallet/add";

import { Dialog } from "@/shared/ui/dialog";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Title } from "@/shared/ui/title";

export const AttachWalletDialog = () => {
    const formId = `form-${useId()}`;

    const onCloseHandler: React.ReactEventHandler<HTMLDialogElement> = () => {
        document.forms[0]?.reset();
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger className="rounded-lg bg-violet-primary px-10 py-2.5">
                Добавить
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Content
                    onClose={onCloseHandler}
                    className="grid w-full gap-y-8 rounded-2xl bg-[#141218] px-8 pb-8 pt-4"
                >
                    <Title as="h2">Добавление кошелька</Title>

                    <AttachWalletForm id={formId} />

                    <footer className="flex flex-wrap-reverse justify-end gap-5">
                        <Dialog.Close
                            // type="reset"
                            // form={formId}
                            className={buttonVariants({
                                variant: "outlined",
                                className: "w-fit flex-auto sm:max-w-60"
                            })}
                        >
                            Отмена
                        </Dialog.Close>
                        <Button
                            form={formId}
                            className="w-fit flex-auto sm:max-w-60"
                        >
                            Добавить
                        </Button>
                    </footer>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
