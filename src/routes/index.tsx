import {createBrowserRouter} from "react-router-dom";
import {lazy} from "react";
import ROUTES from "@/constants/routes.ts";


const Root = lazy(() => import("@/routes/Root.tsx"));
const Home = lazy(() => import("@/pages/Home.tsx"));
const Menu1 = lazy(() => import("@/pages/depths/DepthsMenu1.tsx"));
const Menu2 = lazy(() => import("@/pages/depths/DepthsMenu2.tsx"));
const Menu3 = lazy(() => import("@/pages/depths/DepthsMenu3.tsx"));
const Menu4 = lazy(() => import("@/pages/depths/DepthsMenu4.tsx"));
const Menu5 = lazy(() => import("@/pages/depths/DepthsMenu5.tsx"));
const DetailPage = lazy(() => import("@/pages/depths/DepthsDetail.tsx"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage.tsx"));



const router = createBrowserRouter([
    {
        path: `${ROUTES.SETTING.path}`,
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: `${ROUTES.DEPTHS.path}${ROUTES.DEPTHS.children.MENU1.path}`,
                element: <Menu1/>,
            },
            {
                path: `${ROUTES.DEPTHS.path}${ROUTES.DEPTHS.children.MENU2.path}`,
                element: <Menu2/>,
            },
            {
                path: `${ROUTES.DEPTHS.path}${ROUTES.DEPTHS.children.MENU3.path}`,
                element: <Menu3/>,
            },
            {
                path: `${ROUTES.DEPTHS.path}${ROUTES.DEPTHS.children.MENU4.path}`,
                element: <Menu4/>,
            },
            {
                path: `${ROUTES.DEPTHS.path}${ROUTES.DEPTHS.children.MENU5.path}`,
                element: <Menu5/>,
            },
            {
                path: `${ROUTES.DEPTHS.path}${ROUTES.DEPTHS.children.DETAIL_MENU.path}`,
                element: <DetailPage/>,
            },
        ],
    },
]);
export default router;
