import { Input } from "@/shared/ui/input/input";

import { useAttachWalletMutation } from "@/entities/wallet";

interface AttachWalletFormProps
    extends React.ComponentPropsWithoutRef<"form"> {}

interface FormFields {
    type: HTMLInputElement;
    id: HTMLInputElement;
}

export const AttachWalletForm: React.FC<AttachWalletFormProps> = props => {
    const [attachWallet, { isError, error }] = useAttachWalletMutation();

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
            <label>
                <span>Выберите тип кошелька:</span>
                <Input
                    placeholder="Выберите тип кошелька"
                    required
                    name="type"
                />
            </label>

            <label>
                <span>Кошелек:</span>
                <Input
                    placeholder="Введите ID кошелька"
                    required
                    name="id"
                    minLength={1}
                    maxLength={100}
                />
                {isError ? (
                    <output htmlFor="">{error?.data?.message}</output>
                ) : null}
            </label>
        </form>
    );
};
