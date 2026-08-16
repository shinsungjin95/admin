import { Bounce } from "react-toastify";
import ROUTES from "@/constants/routes.ts";

export const COOKIE_NAME = import.meta.env.VITE_COOKIES_NAME;

export const MODAL_TRANSITION_TIMEOUT = 300;

export const TOAST_OPTIONS = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: false,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "light",
    transition: Bounce,
};

export const LOGIN_PATH = `${ROUTES.PUBLIC.LOGIN}`;
export const INDEX_PATH = `${ROUTES.PROTECTED.GUIDE}`;
export const EXCLUDE_TOKEN_PATH = [
"/auth/login",
];


export const MENU_LIST =
    [
        {
            menuId: "guide",
            title: "가이드",
            path: `${ROUTES.PROTECTED.GUIDE}`,
        },
        {
            menuId: "homepage-setting",
            title: "홈페이지 관리",
            children: [
                {
                    menuId: "menu",
                    title: "메뉴 관리",
                    path: `${ROUTES.PROTECTED.HOME_PAGE_MENU}`,
                },
                {
                    menuId: "banner",
                    title: "배너 관리",
                    path: `${ROUTES.PROTECTED.HOME_PAGE_BANNER}`,
                },
            ]
        },
        
        {
            menuId: "homepage-content-setting",
            title: "홈페이지 컨텐츠 관리",
            children: [],
        },
    ]

