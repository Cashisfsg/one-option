export type Wallet = {
    type_wallet: string;
    wallet_id: string;
};

export type FetchWalletsRequest = {
    name: string;
}[];

export type FetchWalletListResponse = Wallet[];

export type FetchWithdrawListResponse = {
    wallet: string;
}[];

export type AttachWalletRequest = Wallet;

export interface WithdrawalRequest {
    wallet: string;
    amount: string;
}

export type WithdrawalResponse = {
    detail: string;
};
