import { createSlice } from "@reduxjs/toolkit";

import { RootStore } from "@/app/providers/redux/types";
import { rootApi } from "./api";

type AuthorizedUser = {
    token: string;
    isAuthenticated: true;
};

type NonAuthorizedUser = {
    token: null;
    isAuthenticated: false;
};

type AuthState = AuthorizedUser | NonAuthorizedUser;

export const authSlice = createSlice({
    name: "auth",
    initialState: () => {
        const storedData = localStorage.getItem("token");

        if (!storedData)
            return {
                token: null,
                isAuthenticated: false
            };

        const { token } = JSON.parse(storedData);

        return {
            token,
            isAuthenticated: true
        } as AuthState;
    },
    reducers: {
        logout: state => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
        }
    },
    extraReducers: builder => {
        builder.addMatcher(
            rootApi.endpoints.signIn.matchFulfilled,
            (state, { payload }) => {
                localStorage.setItem(
                    "token",
                    JSON.stringify({ token: payload.token })
                );
                state.token = payload.token;
                state.isAuthenticated = true;
            }
        );
    }
});

export const { reducer: authReducer, actions: authActions } = authSlice;

export const { logout } = authSlice.actions;

export const getAuthenticationStatus = (state: RootStore) => ({
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated
});
