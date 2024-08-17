import { Input } from "@/shared/ui/input/input";

interface AttachWalletFormProps
    extends React.ComponentPropsWithoutRef<"form"> {}

export const AttachWalletForm: React.FC<AttachWalletFormProps> = props => {
    return (
        <form {...props}>
            <label>
                <span>Выберите тип кошелька:</span>
                <Input placeholder="Выберите тип кошелька" />
            </label>

            <label>
                <span>Кошелек:</span>
                <Input placeholder="Введите ID кошелька" />
            </label>
        </form>
    );
};
