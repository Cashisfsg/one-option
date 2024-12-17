import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        const storedData =
            sessionStorage.getItem("token") || localStorage.getItem("token");

        if (storedData) {
            const parsedData = JSON.parse(storedData);

            if ("token" in parsedData) {
                return {
                    token: parsedData.token,
                    isAuthenticated: true
                } as AuthState;
            }
        }

        return {
            token: null,
            isAuthenticated: false
        } as AuthState;
    },
    reducers: {
        login: (
            state,
            action: PayloadAction<{ token: string; storage: Storage }>
        ) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            action.payload.storage.setItem(
                "token",
                JSON.stringify({ token: action.payload.token })
            );
        },
        logout: state => {
            state.token = null;
            state.isAuthenticated = false;
            sessionStorage.removeItem("token");
            localStorage.removeItem("token");
        }
    },
    extraReducers: builder => {
        builder
            // .addMatcher(
            //     rootApi.endpoints.signIn.matchFulfilled,
            //     (state, { payload }) => {
            //         state.token = payload.token;
            //         state.isAuthenticated = true;
            //         localStorage.setItem(
            //             "token",
            //             JSON.stringify({ token: payload.token })
            //         );
            //     }
            // )
            .addMatcher(rootApi.endpoints.signOut.matchFulfilled, state => {
                // userApi.util.resetApiState();
                state.token = null;
                state.isAuthenticated = false;
                sessionStorage.removeItem("token");
                localStorage.removeItem("token");
            });
    }
});

export const { reducer: authReducer, actions: authActions } = authSlice;

export const { login, logout } = authSlice.actions;
