import { Cookies } from "react-cookie";
import { COOKIE_NAME } from "@/constants";


const cookies = new Cookies();


/**
 * 쿠키에 저장된 인증 토큰을 반환합니다.
 *
 * @returns 저장된 인증 토큰
 */
export const getToken = () => {
    return cookies.get(COOKIE_NAME);
};