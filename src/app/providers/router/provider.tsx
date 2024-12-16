import { Suspense, lazy } from "react";

import {
    createBrowserRouter,
    RouterProvider as Provider,
    Navigate
} from "react-router-dom";

import { publicRoutes, privateRoutes } from "./routes";

import { useAuth } from "@/shared/lib/hooks/use-auth";

import { GoogleAuthenticationPage } from "@/pages/authentication/google";

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
import { FAQPage } from "@/pages/FAQ/page";

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
        path: publicRoutes.root,
        element: <StartPage />
    },

    {
        path: "auth",
        // element: <AuthenticationLayout />,
        lazy: async () =>
            await import("@/pages/authentication/layout").then(module => ({
                Component: module.AuthenticationLayout
            })),
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
        path: "faq",
        element: <FAQPage />
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
]);

export const routes = [
    {
        path: privateRoutes.root,
        lazy: async () =>
            await import("@/pages/app-layout").then(module => ({
                Component: module.AppLayout
            })),
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
                path: privateRoutes.statistics,
                element: (
                    <Suspense>
                        <StatisticPage />
                    </Suspense>
                )
            },
            {
                path: privateRoutes.withdrawal,
                element: (
                    <Suspense>
                        <WithdrawalPage />
                    </Suspense>
                )
            },
            {
                path: privateRoutes.account,
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
];

export const privateRouter = createBrowserRouter(routes);

export const RouterProvider = () => {
    const { isAuthenticated } = useAuth();

    const router = isAuthenticated ? privateRouter : publicRouter;
    // const router = privateRouter;

    return <Provider router={router} />;
};
