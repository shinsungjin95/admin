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
const HomePageBannerSetting = lazy(() => import("@/pages/protected/homepage/banner"));
const Guide = lazy(() => import("@/pages/protected/guide"));
const SearchTable = lazy(() => import("@/pages/protected/detail/SearchTable.tsx"));
const ModalInfo = lazy(() => import("@/pages/protected/detail/ModalInfo.tsx"));
const EtcInfo = lazy(() => import("@/pages/protected/detail/EtcInfo.tsx"));
const Menu5 = lazy(() => import("@/pages/protected/detail/Menu5.tsx"));
const Menu6 = lazy(() => import("@/pages/protected/detail/Menu6.tsx"));
const AnyDetail = lazy(() => import("@/pages/protected/detail/AnyDetail.tsx"));


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
                        path: `${ROUTES.PROTECTED.HOME_PAGE_BANNER}`,
                        element: <HomePageBannerSetting />,
                    },


                    {
                        path: `${ROUTES.PROTECTED.GUIDE}`,
                        element: <Guide />,
                    },
                    {
                        path: `${ROUTES.PROTECTED.SEARCH_TABLE}`,
                        element: <SearchTable />,
                    },
                    {
                        path: `${ROUTES.PROTECTED.MODAL}`,
                        element: <ModalInfo />,
                    },
                    {
                        path: `${ROUTES.PROTECTED.ETC}`,
                        element: <EtcInfo />,
                    },
                    {
                        path: `${ROUTES.PROTECTED.MENU5}`,
                        element: <Menu5 />,
                    },
                    {
                        path: `${ROUTES.PROTECTED.MENU6}`,
                        element: <Menu6 />,
                    },
                    {
                        path: `${ROUTES.PROTECTED.MENU5_DETAIL}`,
                        element: <AnyDetail />,
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
