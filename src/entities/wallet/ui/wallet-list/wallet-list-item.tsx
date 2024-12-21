import { ClipboardCopyButton } from "@/shared/ui/clipboard-copy-button";

import { Wallet } from "../../api";

import IconsSprite from "@/assets/img/svg/icons-spite.svg";

interface WalletListItemProps {
    wallet: Wallet;
}

export const WalletListItem: React.FC<WalletListItemProps> = ({ wallet }) => {
    return (
        <div className="col-span-2 -mx-6 grid grid-cols-subgrid px-6 py-4 odd:bg-quaternary">
            <dt>{wallet.type_wallet}</dt>
            <dd>
                <ClipboardCopyButton
                    textToCopy={wallet.wallet_id}
                    style={{ outline: "none" }}
                    className="group grid w-full grid-cols-[minmax(0,_1fr)_max-content] items-center gap-x-2 truncate text-right"
                >
                    <span className="truncate">{wallet.wallet_id}</span>
                    <svg
                        height="1rem"
                        width="1rem"
                        className="opacity-0 transition-opacity duration-300 mh:group-hover:opacity-100"
                    >
                        <use xlinkHref={`${IconsSprite}#copy`} />
                    </svg>
                </ClipboardCopyButton>
            </dd>
        </div>
    );
};
