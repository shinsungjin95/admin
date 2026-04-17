import { useCookies } from "react-cookie";
import {COOKIE_NAME} from "@/constants";

export const getToken = () => {
    const [cookies] = useCookies([COOKIE_NAME]);
    return cookies[COOKIE_NAME];
};