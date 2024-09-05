import { Wallet } from "../../api";

import { WalletListItem } from "./wallet-list-item";

interface WalletListProps
    extends Omit<React.ComponentPropsWithoutRef<"ul">, "children"> {
    wallets: Wallet[];
}

export const WalletList: React.FC<WalletListProps> = ({
    wallets,
    ...props
}) => {
    return (
        <ul {...props}>
            {wallets.map(wallet => (
                <WalletListItem
                    key={wallet.wallet_id}
                    wallet={wallet}
                />
            ))}
        </ul>
    );
};
