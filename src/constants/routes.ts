const ROUTES = {
    SETTING: {
        path: "/",
    },
    DEPTHS: {
        path: "/depth",
        children: {
            MENU1: {
                path: "/menu1",
            },
            MENU2: {
                path: "/menu2",
            },
            MENU3: {
                path: "/menu3",
            },
            MENU4: {
                path: "/menu4",
            },
            MENU5: {
                path: "/menu5",
            },
            DETAIL_MENU: {
                path: "/detail/:id",
            }
        }

    }
};

export default ROUTES;
