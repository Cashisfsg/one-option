import { Input, inputVariants } from "@/shared/ui/input";
import { Fetch } from "@/shared/ui/fetch";

import {
    useFetchWalletQuery,
    useAttachWalletMutation
} from "@/entities/wallet/api";
import { Select } from "@/shared/ui/select";

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
                    <fieldset className="grid gap-y-2">
                        <label>Выберите тип кошелька</label>
                        <Select.Root>
                            <Select.Input
                                placeholder="Выберите тип кошелька"
                                name="type"
                            />
                            <Select.Trigger>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition-transform duration-300 group-aria-expanded:rotate-180"
                                >
                                    <path
                                        d="M7.24677 11.1399L2.45054 5.6585C1.88478 5.01192 2.34396 4 3.20312 4H12.7956C13.6547 4 14.1139 5.01192 13.5482 5.6585L8.75193 11.1399C8.35352 11.5952 7.64518 11.5952 7.24677 11.1399Z"
                                        fill="white"
                                    />
                                </svg>
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
