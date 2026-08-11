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
                    menuId: "content",
                    title: "컨텐츠 관리",
                    children: [],
                },
                {
                    menuId: "banner",
                    title: "배너 관리",
                    path: `${ROUTES.PROTECTED.HOME_PAGE_BANNER}`,
                },
            ]
        },
        {
            menuId: "detail-guide",
            title: "상세 정보",
            children: [
                {
                    menuId: "detail-guide-depths",
                    title: "정보 내용",
                    children: [
                        {
                            menuId: "etc",
                            title: "홈페이지 메뉴 세팅",
                            path: `${ROUTES.PROTECTED.ETC}`,
                        },
                        {
                            menuId: "search-table",
                            title: "검색 테이블 정보",
                            path: `${ROUTES.PROTECTED.SEARCH_TABLE}`,
                        },
                        {
                            menuId: "modal",
                            title: "모달 정보",
                            path: `${ROUTES.PROTECTED.MODAL}`,
                        },
                        {
                            menuId: "depths-inner",
                            title: "메뉴 계층",
                            children: [
                                {
                                    menuId: "menu5",
                                    title: "기타 메뉴1",
                                    path: `${ROUTES.PROTECTED.MENU5}`,
                                    detail: {

                                    },
                                },
                                {
                                    menuId: "menu6",
                                    title: "기타 메뉴2",
                                    path: `${ROUTES.PROTECTED.MENU6}`,
                                },
                            ]
                        }
                    ]
                },
            ]
        },
    ]

