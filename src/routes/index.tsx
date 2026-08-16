import {createBrowserRouter, Navigate} from "react-router-dom";
import {lazy} from "react";
import ROUTES from "@/constants/routes.ts";
import RequireAuth from "@/routes/auth/RequireAuth.tsx";
import PublicOnly from "@routes/auth/PublicOnly.tsx";
import {INDEX_PATH} from "@/constants";



// 에러 / 404
const ErrorPage = lazy(() => import("@/pages/error/ErrorPage.tsx"));
const NotFoundPage = lazy(() => import("@/pages/error/NotFoundPage.tsx"));
const ForbiddenPage = lazy(() => import("@/pages/error/ForbiddenPage.tsx"));

// protected
const Root = lazy(() => import("@/routes/Root.tsx"));
const HomePageMenuSetting = lazy(() => import("@/pages/protected/homepage/menu"));
const HomePageContentSetting = lazy(() => import("@/pages/protected/homepage/content"));
const HomePageContentDetail = lazy(() => import("@/pages/protected/homepage/content/detail"));
const HomePageBannerSetting = lazy(() => import("@/pages/protected/homepage/banner"));
const Guide = lazy(() => import("@/pages/protected/guide"));


// public
const LoginRoot = lazy(() => import("@/routes/LoginRoot.tsx"));
const MemberLogin = lazy(() => import("@/pages/public/member/login"));


const router = createBrowserRouter([
    {
        path: "/",
        element: <RequireAuth />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <Root />,
                children: [
                    {
                        index: true,
                        element: (
                            <Navigate
                                to={`${INDEX_PATH}`}
                                replace
                            />
                        ),
                    },
                    {
                        path: `${ROUTES.PROTECTED.HOME_PAGE_MENU}`,
                        element: <HomePageMenuSetting />,
                    },
                    {
                        path: `${ROUTES.PROTECTED.HOME_PAGE_CONTENT}`,
                        element: <HomePageContentSetting />,
                    },
                    {
                        path: `${ROUTES.PROTECTED.HOME_PAGE_CONTENT_detail}`,
                        element: <HomePageContentDetail />,
                    },

                    {
                        path: `${ROUTES.PROTECTED.HOME_PAGE_BANNER}`,
                        element: <HomePageBannerSetting />,
                    },
                    {
                        path: `${ROUTES.PROTECTED.GUIDE}`,
                        element: <Guide />,
                    },
                ],
            },
        ],
    },
    {
        element: <PublicOnly />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <LoginRoot />,
                children: [
                    {
                        path: `${ROUTES.PUBLIC.LOGIN}`,
                        element: <MemberLogin />,
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
    {
        path: "/403",
        element: <ForbiddenPage />,
    },
]);
export default router;
