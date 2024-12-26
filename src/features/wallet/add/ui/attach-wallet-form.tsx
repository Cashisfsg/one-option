import { useState } from "react";

import { Input } from "@/shared/ui/input";
import { Fetch } from "@/shared/ui/fetch";
import { useDialogContext } from "@/shared/ui/dialog";

import {
    useFetchWalletQuery,
    useAttachWalletMutation
} from "@/entities/wallet/api";

import { Select } from "@/shared/ui/select";
import { ErrorMessage } from "@/shared/ui/error";

import { handleErrorResponse } from "@/shared/lib/helpers/handle-error-response";

import IconsSprite from "@/assets/img/svg/icons-spite.svg";

interface AttachWalletFormProps
    extends React.ComponentPropsWithoutRef<"form"> {}

interface FormFields {
    wallet_type: HTMLInputElement;
    wallet_id: HTMLInputElement;
}

export const AttachWalletForm: React.FC<AttachWalletFormProps> = props => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const { dialogRef } = useDialogContext();
    const [attachWallet] = useAttachWalletMutation();

    const onSubmitHandler: React.FormEventHandler<
        HTMLFormElement & FormFields
    > = async event => {
        event.preventDefault();

        setErrorMessage(undefined);
        const form = event.currentTarget;

        try {
            const { wallet_type, wallet_id } = event.currentTarget;

            await attachWallet({
                type_wallet: wallet_type.value,
                wallet_id: wallet_id.value
            }).unwrap();

            form.reset();
            dialogRef.current?.close();
        } catch (error) {
            handleErrorResponse(error, message => setErrorMessage(message));
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            {...props}
        >
            <Fetch
                useQuery={useFetchWalletQuery}
                args={undefined}
                renderSuccess={wallets => (
                    <fieldset className="grid gap-y-2">
                        <label>Выберите тип кошелька</label>
                        <Select.Root>
                            <Select.Input
                                placeholder="Выберите тип кошелька"
                                required
                                name="wallet_type"
                                className="w-full"
                            />
                            <Select.Trigger>
                                <svg
                                    height="1em"
                                    width="1em"
                                    className="transition-transform duration-300 group-aria-expanded:rotate-180"
                                >
                                    <use
                                        xlinkHref={`${IconsSprite}#caret-down`}
                                    />
                                </svg>
                                <span className="sr-only">
                                    Раскрыть выпадающий список
                                </span>
                            </Select.Trigger>
                            <Select.Menu>
                                {wallets.map(wallet => (
                                    <Select.Option
                                        key={wallet?.name}
                                        value={wallet?.name}
                                    >
                                        {wallet?.name}
                                    </Select.Option>
                                ))}
                            </Select.Menu>
                        </Select.Root>
                    </fieldset>
                )}
                loadingFallback={
                    <label>
                        <span>Выберите тип кошелька:</span>
                        <Input
                            placeholder="Выберите тип кошелька"
                            required
                            readOnly
                        />
                    </label>
                }
                renderError={() => (
                    <label>
                        <span>Выберите тип кошелька:</span>
                        <Input
                            placeholder="Выберите тип кошелька"
                            required
                            readOnly
                        />
                    </label>
                )}
            />

            <label>
                <span>Кошелек:</span>
                <Input
                    placeholder="Введите ID кошелька"
                    required
                    alert={true}
                    name="wallet_id"
                    minLength={1}
                    maxLength={100}
                    aria-invalid={!!errorMessage}
                    className="peer border-2 border-transparent aria-[invalid=true]:border-red-primary"
                />
                <ErrorMessage>{errorMessage}</ErrorMessage>
            </label>
        </form>
    );
};
