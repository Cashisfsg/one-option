export type Wallet = {
    type_wallet: string;
    wallet_id: string;
};

export interface FetchWalletListResponse {
    type_wallet: string;
    wallet_id: string;
}

export interface FetchWithdrawListResponse {
    wallet: string;
}

export type AttachWalletRequest = Wallet;
