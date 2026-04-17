import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "@/util/auth.tsx";
import {INDEX_PATH} from "@/constants";

const PublicOnly = () => {
    const token = getToken();
    if (token) {
        return <Navigate to={INDEX_PATH} replace />;
    }
    return <Outlet />;
};

export default PublicOnly;