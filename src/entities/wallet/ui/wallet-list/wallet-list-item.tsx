import { Wallet } from "../../api";

interface WalletListItemProps {
    wallet: Wallet;
}

export const WalletListItem: React.FC<WalletListItemProps> = ({ wallet }) => {
    return (
        <div className="-mx-6 grid grid-cols-[minmax(min-content,_auto)_minmax(0,_1fr)] gap-x-8 px-6 py-4 odd:bg-quaternary">
            <dt className="bg-quaternary">{wallet.type_wallet}</dt>
            <dd className="truncate">{wallet.wallet_id}</dd>
        </div>
    );
};
