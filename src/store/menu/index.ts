import {makeAutoObservable} from "mobx";
import {getStore, Store, useStore} from "@/store";
import {convertMenu} from "@/util/menu.ts";
import {MENU_LIST} from "@/constants";
import React from "react";
import {nanoid} from "nanoid";

export class MenuStore {
    store: Store;
    currentMenuData = [];
    navigationData = [];
    newMenuData = {
        parentId: null,
        type: "",
        value: "",
    }

    constructor(store: Store, initialNavigation?: any) {
        this.store = store;
        makeAutoObservable(this, {}, {autoBind: true});
        if (initialNavigation) {

            // console.log(JSON.stringify(initialNavigation.navigation))
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

    setAddListData (data) {
        if (!data) return;
        this.newMenuData = data;
    }

    setAddMenu(type?: string) {
        if (type === "parent") {
            this.navigationData = [
                ...this.navigationData,
                {
                    id: nanoid(),
                    type: "parent",
                    title: this.newMenuData.value,
                    children: [],
                },
            ];
        }
        this.setClearAddMenuData();
    }

    setAddMenuValue(value: string) {
        this.newMenuData.value = value;
    }

    setClearAddMenuData() {
        this.newMenuData = {
            parentId: null,
            type: "",
            value: "",
        }
    }


    setSaveButton() {

    }


}

export const useMenuStore = () => {
    return useStore().menuStore;
};

export const getMenuStore = () => {
    return getStore().menuStore;
};
