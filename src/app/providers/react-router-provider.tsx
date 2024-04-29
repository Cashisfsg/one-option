import { Suspense, lazy } from "react";

import {
    createBrowserRouter,
    RouterProvider as Provider,
    Navigate
} from "react-router-dom";

import { App } from "@/App";
import { AppLayout } from "@/pages/app-layout";
import { SignInPage } from "@/pages/sign-in-page";
import { SignUpPage } from "@/pages/sign-up-page";
import { StartPage } from "@/pages/start-page";

const DashboardPage = lazy(async () =>
    import("@/pages/dashboard-page").then(module => ({
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
    import("@/pages/statistic-page").then(module => ({
        default: module.StatisticPage
    }))
);

const CashOutPage = lazy(async () =>
    import("@/pages/cash-out-page").then(module => ({
        default: module.CashOutPage
    }))
);

const ProfilePage = lazy(async () =>
    import("@/pages/profile-page").then(module => ({
        default: module.ProfilePage
    }))
);

const router = createBrowserRouter([
    {
        path: "/start",
        element: <StartPage />
    },
    {
        path: "sign",
        element: <App />,
        children: [
            {
                path: "in",
                element: <SignInPage />
            },
            {
                path: "up",
                element: <SignUpPage />
            }
        ]
    },
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
                path: "/referral",
                element: (
                    <Suspense>
                        <ReferralPage />
                    </Suspense>
                )
            },
            {
                path: "/sub/referral",
                element: (
                    <Suspense>
                        <SubReferralPage />
                    </Suspense>
                )
            },
            {
                path: "/statistic",
                element: (
                    <Suspense>
                        <StatisticPage />
                    </Suspense>
                )
            },
            {
                path: "/cash/out",
                element: (
                    <Suspense>
                        <CashOutPage />
                    </Suspense>
                )
            },
            {
                path: "/profile",
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
        element: <Navigate to="/sign/in" />
    }
]);

export const ReactRouterProvider = () => {
    return <Provider router={router} />;
};
