import { Bounce } from "react-toastify";
import ROUTES from "@/constants/routes.ts";
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
export const MENU =[
    {
        name: "guide",
        link: `${ROUTES.SETTING.path}`
    },
    {
        name: "depths menu",
        children: [
            {
                name: "menu1",
                link: `${ROUTES.DEPTHS.path}${ROUTES.DEPTHS.children.MENU1.path}`,
            },


            {
                name: "2 depths-1",
                children: [
                    {
                        name: "3 depths-1",
                        children: [
                            {
                                name: "menu4",
                                link: `${ROUTES.DEPTHS.path}${ROUTES.DEPTHS.children.MENU4.path}`,
                            },
                            {
                                name: "4 depths",
                                children: [
                                    {
                                        name: "5 depths",
                                        link: `${ROUTES.DEPTHS.path}${ROUTES.DEPTHS.children.MENU5.path}`,
                                    }
                                ],
                            }
                        ],
                    },
                    {
                        name: "3 depths-2",
                        children: [
                            {
                                name: "menu4",
                                link: `${ROUTES.DEPTHS.path}${ROUTES.DEPTHS.children.MENU4.path}`,
                            },
                        ],
                    },
                ],
            },



            {
                name: "2 depths-2",
                children: [
                    {
                        name: "menu2 + detail",
                        link: `${ROUTES.DEPTHS.path}${ROUTES.DEPTHS.children.MENU2.path}`,
                        children: [
                            {
                                name: "detail page",
                                link: `${ROUTES.DEPTHS.path}${ROUTES.DEPTHS.children.DETAIL_MENU.path}`,
                                display: "none",
                            },
                        ]
                    },

                    {
                        name: "menu3",
                        link: `${ROUTES.DEPTHS.path}${ROUTES.DEPTHS.children.MENU3.path}`,
                    },
                    {
                        name: "3 depths-1",
                        children: [
                            {
                                name: "menu4",
                                link: `${ROUTES.DEPTHS.path}${ROUTES.DEPTHS.children.MENU4.path}`,
                            },
                            {
                                name: "4 depths-1",
                                children: [
                                    {
                                        name: "5 depths",
                                        link: `${ROUTES.DEPTHS.path}${ROUTES.DEPTHS.children.MENU5.path}`,
                                    }
                                ],
                            }
                        ],
                    },
                ],
            },
        ]
    },
];

