import { Suspense, lazy } from "react";

import {
    createBrowserRouter,
    RouterProvider as Provider,
    Navigate
} from "react-router-dom";

import { useAuth } from "@/shared/lib/hooks/use-auth";

import { GoogleAuthenticationPage } from "@/pages/authentication/google";

import { AuthenticationLayout } from "@/pages/authentication/layout";
import { AppLayout } from "@/pages/app-layout";
import { SignInPage } from "@/pages/authentication/sign-in";
import { SignUpPage } from "@/pages/authentication/sign-up";

const ResetPasswordPage = lazy(async () =>
    import("@/pages/authentication/password-reset").then(module => ({
        default: module.ResetPasswordPage
    }))
);

const ResetPasswordConfirmPage = lazy(async () =>
    import("@/pages/authentication/recover-password-confirm").then(module => ({
        default: module.ResetPasswordConfirmPage
    }))
);

import { StartPage } from "@/pages/start-page";

const DashboardPage = lazy(async () =>
    import("@/pages/dashboard").then(module => ({
        default: module.DashboardPage
    }))
);

const ReferralPage = lazy(async () =>
    import("@/pages/referral-page").then(module => ({
        default: module.ReferralPage
    }))
);

const SubReferralPage = lazy(async () =>
    import("@/pages/sub-referral-page").then(module => ({
        default: module.SubReferralPage
    }))
);

const StatisticPage = lazy(async () =>
    import("@/pages/statistic").then(module => ({
        default: module.StatisticPage
    }))
);

const WithdrawalPage = lazy(async () =>
    import("@/pages/withdrawal").then(module => ({
        default: module.WithdrawalPage
    }))
);

const ProfilePage = lazy(async () =>
    import("@/pages/profile/page").then(module => ({
        default: module.ProfilePage
    }))
);

const publicRouter = createBrowserRouter([
    {
        path: "/",
        element: <StartPage />
    },
    {
        path: "auth",
        element: <AuthenticationLayout />,
        children: [
            {
                path: "sign/in",
                element: <SignInPage />
            },
            {
                path: "sign/up",
                element: <SignUpPage />
            },
            {
                path: "password/reset",
                element: (
                    <Suspense fallback={<>Loading...</>}>
                        <ResetPasswordPage />
                    </Suspense>
                )
            },
            {
                path: "password/reset/confirm/:token",
                element: (
                    <Suspense fallback={<>Loading...</>}>
                        <ResetPasswordConfirmPage />
                    </Suspense>
                )
            }
        ]
    },
    {
        path: "password/reset",
        element: (
            <Suspense fallback={<>Loading...</>}>
                <ResetPasswordPage />
            </Suspense>
        )
    },
    {
        path: "password/reset/confirm",
        element: (
            <Suspense fallback={<>Loading...</>}>
                <ResetPasswordConfirmPage />
            </Suspense>
        )
    },
    {
        path: "google/complete/",
        element: <GoogleAuthenticationPage />
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
]);

const privateRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense>
                        <DashboardPage />
                    </Suspense>
                )
            },
            {
                path: "referral",
                element: (
                    <Suspense>
                        <ReferralPage />
                    </Suspense>
                )
            },
            {
                path: "sub/referral",
                element: (
                    <Suspense>
                        <SubReferralPage />
                    </Suspense>
                )
            },
            {
                path: "statistic",
                element: (
                    <Suspense>
                        <StatisticPage />
                    </Suspense>
                )
            },
            {
                path: "withdrawal",
                element: (
                    <Suspense>
                        <WithdrawalPage />
                    </Suspense>
                )
            },
            {
                path: "profile",
                element: (
                    <Suspense>
                        <ProfilePage />
                    </Suspense>
                )
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
]);

export const RouterProvider = () => {
    const { isAuthenticated } = useAuth();

    const router = isAuthenticated ? privateRouter : publicRouter;

    return <Provider router={router} />;
};
