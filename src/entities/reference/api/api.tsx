import { rootApi } from "@/shared/api";

import type {
    FetchReferenceStatisticResponse,
    FetchReferenceChartDataRequest,
    FetchReferenceChartDataResponse,
    FetchReferenceActivityDataResponse
} from "./types";

export const referenceApi = rootApi
    .enhanceEndpoints({ addTagTypes: ["Reference"] })
    .injectEndpoints({
        endpoints: builder => ({
            fetchReferenceStatistic: builder.query<
                FetchReferenceStatisticResponse,
                void
            >({
                query: () => "/profile/mainpage"
            }),

            fetchReferenceChartData: builder.query<
                FetchReferenceChartDataResponse,
                FetchReferenceChartDataRequest
            >({
                query: ({ frequency }) => `/profile/mainpage/chart_${frequency}`
            }),

            fetchReferenceActivityData: builder.query<
                { count: number; date: string },
                { frequency: "daily" | "weekly" | "monthly" }
            >({
                query: ({ frequency }) => `/referal/count/${frequency}`
            }),

            fetchReferenceLinks: builder.query<
                {
                    code: string;
                    link: string;
                    type_display: string;
                    referral_type: string;
                }[],
                void
            >({
                query: () => "/referal/link",
                transformResponse: (
                    response: {
                        code: string;
                        type_display: string;
                        referral_type: string;
                    }[]
                ) => {
                    return response.map(data => ({
                        code: data.code,
                        link: `${import.meta.env.VITE_BASE_API_URL}/${data.code}`,
                        type_display: data.type_display,
                        referral_type: data.referral_type
                    }));
                }
            }),

            fetchReferenceList: builder.query<
                FetchReferenceActivityDataResponse,
                void
            >({
                query: () => "/referal/list"
            })
        })
    });

export const {
    useFetchReferenceStatisticQuery,
    useLazyFetchReferenceStatisticQuery,
    useFetchReferenceChartDataQuery,
    useLazyFetchReferenceChartDataQuery,
    useFetchReferenceActivityDataQuery,
    useLazyFetchReferenceActivityDataQuery,
    useFetchReferenceListQuery,
    useLazyFetchReferenceListQuery,
    useFetchReferenceLinksQuery,
    useLazyFetchReferenceLinksQuery
} = referenceApi;
