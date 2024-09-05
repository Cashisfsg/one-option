import { Input, inputVariants } from "@/shared/ui/input";
import { Fetch } from "@/shared/ui/fetch";

import {
    useFetchWalletQuery,
    useAttachWalletMutation
} from "@/entities/wallet/api";

interface AttachWalletFormProps
    extends React.ComponentPropsWithoutRef<"form"> {}

interface FormFields {
    type: HTMLSelectElement;
    id: HTMLInputElement;
}

export const AttachWalletForm: React.FC<AttachWalletFormProps> = props => {
    const [attachWallet] = useAttachWalletMutation();

    const onChangeHandled: React.ChangeEventHandler<
        HTMLSelectElement
    > = event => {
        event.currentTarget.classList.replace("text-white/30", "text-white");
    };

    const onSubmitHandler: React.FormEventHandler<
        HTMLFormElement & FormFields
    > = async event => {
        event.preventDefault();

        try {
            const { type, id } = event.currentTarget;

            attachWallet({
                type_wallet: type.value,
                wallet_id: id.value
            }).unwrap();
        } catch (error) {
            console.error(error);
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
                    <label>
                        <span>Выберите тип кошелька:</span>
                        <select
                            required
                            name="type"
                            defaultValue=""
                            onChange={onChangeHandled}
                            className={inputVariants({
                                className: "text-white/30"
                            })}
                        >
                            <option
                                value=""
                                disabled
                            >
                                Выберите тип кошелька
                            </option>
                            {wallets.map(wallet => (
                                <option
                                    key={wallet?.name}
                                    value={wallet?.name}
                                    className="text-white"
                                >
                                    {wallet?.name}
                                </option>
                            ))}
                        </select>
                    </label>
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
                    name="id"
                    minLength={1}
                    maxLength={100}
                />
                {/* {isError ? (
                    <output htmlFor="">{error?.data?.wallet_address}</output>
                ) : null} */}
            </label>
        </form>
    );
};
