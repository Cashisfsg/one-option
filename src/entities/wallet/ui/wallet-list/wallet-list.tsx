import { cnBase } from "tailwind-variants";
import { Wallet } from "../../api";

import { WalletListItem } from "./wallet-list-item";

interface WalletListProps
    extends Omit<React.ComponentPropsWithoutRef<"ul">, "children"> {
    wallets: Wallet[];
}

export const WalletList: React.FC<WalletListProps> = ({
    className,
    wallets,
    ...props
}) => {
    return (
        <dl
            className={cnBase("", className)}
            {...props}
        >
            {wallets.map(wallet => (
                <WalletListItem
                    key={wallet.wallet_id}
                    wallet={wallet}
                />
            ))}
        </dl>
    );
};
