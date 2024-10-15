import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithLogout } from "@/shared/api/config";

import type {
    SignInRequest,
    SignInSuccessResponse,
    RecoverPasswordRequest,
    ConfirmPasswordRequest,
    ChangePasswordRequest,
    ChangePasswordResponse,
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
        incrementTokenCounter: builder.mutation<any, { token_ref: string }>({
            query: body => ({
                url: "/register/token/count/",
                method: "POST",
                body: body
            })
        }),
        recoverPassword: builder.mutation<
            SuccessResponse,
            RecoverPasswordRequest
        >({
            query: body => ({
                url: "/password_reset/",
                method: "POST",
                body: body
            })
        }),
        confirmPassword: builder.mutation<
            SuccessResponse,
            ConfirmPasswordRequest
        >({
            query: ({ token, new_password, confirm_password }) => ({
                url: `/password_reset/${token}/`,
                method: "POST",
                body: {
                    new_password,
                    confirm_password
                }
            })
        }),
        changePassword: builder.mutation<
            ChangePasswordResponse,
            ChangePasswordRequest
        >({
            query: body => ({
                url: "/change_password/",
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

export const {
    useSignInMutation,
    useSignUpMutation,
    useRecoverPasswordMutation,
    useConfirmPasswordMutation,
    useChangePasswordMutation,
    useIncrementTokenCounterMutation,
    useSignOutMutation
} = rootApi;
