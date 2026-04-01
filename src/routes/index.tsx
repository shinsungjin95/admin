import {createBrowserRouter, Navigate} from "react-router-dom";
import {PATH, SEGMENT} from "./paths.js";
import {lazy} from "react";


const Root = lazy(() => import("@/routes/Root.tsx"));
const Home = lazy(() => import("@/pages/Home.tsx"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage.tsx"));



const router = createBrowserRouter([
    {
        path: PATH.HOME,
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
        ],
    },
]);
export default router;
