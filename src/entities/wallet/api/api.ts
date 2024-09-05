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
            fetchWallet: builder.query<{ name: string }[], void>({
                query: () => "/wallet/"
            }),

            fetchWalletList: builder.query<FetchWalletListResponse, void>({
                query: () => "/wallet/list",
                providesTags: result =>
                    result
                        ? [
                              ...result.map(({ wallet_id }) => ({
                                  type: "Wallet" as const,
                                  id: wallet_id as string
                              })),
                              "Wallet"
                          ]
                        : ["Wallet"]
            }),

            fetchWithdrawList: builder.query<FetchWithdrawListResponse, void>({
                query: () => "/withdraw/"
            }),

            attachWallet: builder.mutation<any, AttachWalletRequest>({
                query: body => ({
                    url: "/wallet/",
                    method: "POST",
                    body: body
                }),
                invalidatesTags: (result, error, arg) =>
                    error ? [] : [{ type: "Wallet", id: arg.wallet_id }]
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
