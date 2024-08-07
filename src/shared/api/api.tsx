import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithLogout } from "@/shared/api/config";

import type {
    SignInRequest,
    SignInSuccessResponse,
    SignUpRequest,
    SuccessResponse
} from "./types";

export const rootApi = createApi({
    reducerPath: "rootApi",
    baseQuery: baseQueryWithLogout,
    endpoints: builder => ({
        signIn: builder.mutation<SignInSuccessResponse, SignInRequest>({
            query: body => ({
                url: "/login/",
                method: "POST",
                body: body
            })
        }),
        signUp: builder.mutation<SuccessResponse, SignUpRequest>({
            query: body => ({
                url: "/register/",
                method: "POST",
                body: body
            })
        }),
        signOut: builder.mutation<SuccessResponse, void>({
            query: () => ({
                url: "/logout/",
                method: "POST"
            })
        })
    })
});

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } =
    rootApi;
