import {makeAutoObservable} from "mobx";
import {getStore, Store, useStore} from "@/store";
import {convertMenu} from "@/util/menu.ts";
import {MENU_LIST} from "@/constants";

export class MenuStore {
    store: Store;
    currentMenuData = [];
    navigationData = [];

    constructor(store: Store, initialNavigation?: any) {
        this.store = store;
        makeAutoObservable(this, {}, {autoBind: true});
        if (initialNavigation) {

            console.log(JSON.stringify(initialNavigation.navigation))
            this.navigationData = initialNavigation.navigation;
            this.currentMenuData = MENU_LIST.map((menu) => {
                if (menu.menuId !== "homepage-setting") return menu;
                return {
                    ...menu,
                    children: menu.children?.map((child) =>
                        child.menuId === "content"
                            ? {
                                ...child,
                                children: convertMenu(initialNavigation.navigation),
                            }
                            : child
                    ),
                };
            });
        }
    }





}

export const useMenuStore = () => {
    return useStore().menuStore;
};

export const getMenuStore = () => {
    return getStore().menuStore;
};
