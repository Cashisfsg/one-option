import { rootApi } from "@/shared/api";
import { userApi } from "@/entities/user/api";

import type {
    FetchWalletListResponse,
    FetchWithdrawListResponse,
    AttachWalletRequest
} from "./types";

export const walletApi = rootApi
    .enhanceEndpoints({ addTagTypes: ["Wallet", "Withdrawal"] })
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
                query: () => "/withdraw/",
                providesTags: ["Withdrawal"]
            }),

            attachWallet: builder.mutation<any, AttachWalletRequest>({
                query: body => ({
                    url: "/wallet/",
                    method: "POST",
                    body: body
                }),
                invalidatesTags: (result, error, arg) =>
                    error
                        ? []
                        : [{ type: "Wallet", id: arg.wallet_id }, "Withdrawal"]
            }),

            withdrawal: builder.mutation<
                any,
                { wallet: string; amount: string }
            >({
                query: body => ({
                    url: "/withdraw/",
                    method: "POST",
                    body: body
                }),
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        dispatch(userApi.util.invalidateTags(["Balance"]));
                    } catch {}
                }
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
