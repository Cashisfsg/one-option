import { rootApi, SuccessResponse } from "@/shared/api";

import type {
    FetchUserDataResponse,
    FetchUserBalanceResponse,
    UpdateUserDataRequest,
    UpdateUserDataResponse
} from "./types";

export const userApi = rootApi
    .enhanceEndpoints({ addTagTypes: ["User", "Balance"] })
    .injectEndpoints({
        endpoints: builder => ({
            fetchUserData: builder.query<FetchUserDataResponse, void>({
                query: () => "/profile/",
                providesTags: ["User"]
            }),

            fetchUserBalance: builder.query<FetchUserBalanceResponse, void>({
                query: () => "/profile/balance",
                providesTags: ["Balance"]
            }),

            fetchLevelsList: builder.query<
                {
                    level: number;
                    income_percent: string;
                    turnover: string;
                    deposit: string;
                },
                void
            >({
                query: () => "/level/list"
            }),

            updateUserCredentials: builder.mutation<
                UpdateUserDataResponse,
                UpdateUserDataRequest
            >({
                query: body => ({
                    url: "/profile/",
                    method: "POST",
                    body: body
                }),
                invalidatesTags: (result, error) => (error ? [] : ["User"])
            }),

            updateUserPhoto: builder.mutation<SuccessResponse, File>({
                query: photo => {
                    const formData = new FormData();
                    formData.append("photo", photo);
                    return {
                        url: "/profile/",
                        method: "PATCH",
                        body: formData,
                        headers: {
                            Accept: "application/json"
                        }
                    };
                },
                invalidatesTags: (result, error) => (error ? [] : ["User"])
            })
        })
    });

export const {
    useFetchUserDataQuery,
    useLazyFetchUserDataQuery,
    useFetchUserBalanceQuery,
    useLazyFetchUserBalanceQuery,
    useFetchLevelsListQuery,
    useLazyFetchLevelsListQuery,
    useUpdateUserCredentialsMutation,
    useUpdateUserPhotoMutation
} = userApi;
