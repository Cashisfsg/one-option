import { rootApi } from "@/shared/api";

import type { FetchUserDataResponse } from "./types";

export const userApi = rootApi
    .enhanceEndpoints({ addTagTypes: ["User"] })
    .injectEndpoints({
        endpoints: builder => ({
            fetchUserData: builder.query<FetchUserDataResponse, void>({
                query: () => "/profile/"
            })
        })
    });

export const { useFetchUserDataQuery, useLazyFetchUserDataQuery } = userApi;
