import { Cookies } from "react-cookie";
import { COOKIE_NAME } from "@/constants";

const cookies = new Cookies();

export const getToken = () => {
    return cookies.get(COOKIE_NAME);
};