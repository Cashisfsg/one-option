import { Wallet } from "../../api";

interface WalletListItemProps
    extends Omit<React.ComponentPropsWithoutRef<"li">, "children"> {
    wallet: Wallet;
}

export const WalletListItem: React.FC<WalletListItemProps> = ({
    wallet,
    ...props
}) => {
    return <li {...props}>{wallet.type_wallet}</li>;
};
