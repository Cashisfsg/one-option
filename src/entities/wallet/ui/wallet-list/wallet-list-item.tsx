import { cnBase } from "tailwind-variants";

import { Wallet } from "../../api";

interface WalletListItemProps
    extends Omit<React.ComponentPropsWithoutRef<"li">, "children"> {
    wallet: Wallet;
}

export const WalletListItem: React.FC<WalletListItemProps> = ({
    className,
    wallet,
    ...props
}) => {
    return (
        <li
            className={cnBase(
                "flex items-center justify-between gap-x-8",
                className
            )}
            {...props}
        >
            <span>{wallet.type_wallet}</span>
            <span className="truncate">{wallet.wallet_id}</span>
        </li>
    );
};
