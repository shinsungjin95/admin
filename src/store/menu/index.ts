import {makeAutoObservable} from "mobx";
import {getStore, Store, useStore} from "@/store";
import {convertMenu} from "@/util/menu.ts";
import {MENU_LIST} from "@/constants";
import {nanoid} from "nanoid";
import api from "@/api";

export interface MenuItem {
    id: string;
    type: string;
    title: string;
    subtype?: string;
    children?: MenuItem[];
}

type AddMenuData = {
    parentId?: string | null;
    title: string;
};



export class MenuStore {
    store: Store;
    currentMenuData = [];
    navigationData = [];

    constructor(store: Store, initialNavigation?: any) {
        this.store = store;
        makeAutoObservable(this, {}, {autoBind: true});
        if (initialNavigation) {
            this.navigationData = initialNavigation.navigation;
            this.setCurrentMenu(initialNavigation.navigation);
        }
    }

    setCurrentMenu(list: MenuItem[]) {
        this.currentMenuData = MENU_LIST.map((menu) => {
            if (menu.menuId !== "homepage-setting") return menu;
            return {
                ...menu,
                children: menu.children?.map((child) =>
                    child.menuId === "content" ? {...child, children: convertMenu(list),} : child
                ),
            };
        });
    }

    /**
     * 메뉴 추가
     */
    setAddMenu(data: AddMenuData) {
        if (!data.parentId) {
            this.navigationData = [
                ...this.navigationData,
                {
                    id: nanoid(),
                    type: "parent",
                    title: data.title,
                    children: [],
                },
            ];

            return;
        }
        this.navigationData = this.navigationData.map((parent) => {
            if (parent.id !== data.parentId) {
                return parent;
            }
            return {
                ...parent,
                children: [
                    ...(parent.children ?? []),

                    {
                        id: nanoid(),
                        type: "board",
                        title: data.title,
                        subtype: "list",
                    },
                ],
            };
        });
    }

    setModifyMenu(data: {
        targetId: string;
        deleType?: boolean;
        title?: string;
        subtype?: string;
    }) {
        const modifyMenu = (items: MenuItem[]): MenuItem[] => {

            // 삭제
            if (data.deleType) {
                return items
                    .filter((item) => item.id !== data.targetId)
                    .map((item) => {
                        if (item.children?.length) {
                            return {
                                ...item,
                                children: modifyMenu(item.children),
                            };
                        }

                        return item;
                    });
            }

            // 수정
            return items.map((item) => {

                if (item.id === data.targetId) {
                    const modifyItem = {
                        ...item,
                        title: data.title,
                    };

                    if (data.subtype) {
                        modifyItem.subtype = data.subtype;
                    }

                    return modifyItem;
                }

                if (item.children?.length) {
                    return {
                        ...item,
                        children: modifyMenu(item.children),
                    };
                }

                return item;
            });
        };

        this.navigationData = modifyMenu(this.navigationData);
    }


    setNavigationData(data: MenuItem[]) {
        this.navigationData = data;
    }

    async setSaveButton() {
       return await api.post("menus", this.navigationData);
    }



}

export const useMenuStore = () => {
    return useStore().menuStore;
};

export const getMenuStore = () => {
    return getStore().menuStore;
};
