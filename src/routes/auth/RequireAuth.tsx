import { Navigate, Outlet, useLocation } from "react-router-dom";
import {getToken} from "@/util/auth.tsx";
import {LOGIN_PATH} from "@/constants";

const RequireAuth = () => {
    const location = useLocation();
    const token = getToken();
    if (!token && location.pathname !== LOGIN_PATH) {
        return <Navigate to={LOGIN_PATH} replace />;
    }
    return <Outlet />;
};

export default RequireAuth;