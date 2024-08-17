import { rootApi } from "@/shared/api";

import type {
    FetchWalletListResponse,
    FetchWithdrawListResponse,
    AttachWalletRequest
} from "./types";

export const walletApi = rootApi
    .enhanceEndpoints({ addTagTypes: ["Wallet"] })
    .injectEndpoints({
        endpoints: builder => ({
            fetchWallet: builder.query<any, any>({ query: () => "/wallet/" }),

            fetchWalletList: builder.query<FetchWalletListResponse, void>({
                query: () => "/wallet/list"
            }),

            fetchWithdrawList: builder.query<FetchWithdrawListResponse, void>({
                query: () => "/withdraw/"
            }),

            attachWallet: builder.mutation<any, AttachWalletRequest>({
                query: body => ({
                    url: "/wallet/",
                    method: "POST",
                    body: body
                })
            }),

            withdrawal: builder.mutation<any, any>({
                query: () => ({
                    url: "/withdraw/",
                    method: "POST"
                })
            })
        })
    });

export const {
    useFetchWalletQuery,
    useLazyFetchWalletQuery,
    useFetchWalletListQuery,
    useLazyFetchWalletListQuery,
    useFetchWithdrawListQuery,
    useLazyFetchWithdrawListQuery,
    useAttachWalletMutation,
    useWithdrawalMutation
} = walletApi;
