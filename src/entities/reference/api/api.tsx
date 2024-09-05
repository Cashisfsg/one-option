import { rootApi } from "@/shared/api";

import type {
    FetchReferenceStatisticResponse,
    FetchReferenceChartDataRequest,
    FetchReferenceChartDataResponse
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
            })
        })
    });

export const {
    useFetchReferenceStatisticQuery,
    useLazyFetchReferenceStatisticQuery,
    useFetchReferenceChartDataQuery,
    useLazyFetchReferenceChartDataQuery
} = referenceApi;
