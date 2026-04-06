import { makeAutoObservable } from "mobx";
import {getStore, Store, useStore} from "@/store";
export class MenuStore {
    store: Store;
    menuData = [];
    constructor(store: Store, initialNavigation?: any) {
        this.store = store;
        makeAutoObservable(this, {}, {autoBind: true});
        if (initialNavigation) {
            this.menuData = initialNavigation.navigation;
        }
    }

}

export const useMenuStore = () => {
    return useStore().menuStore;
};

export const getMenuStore = () => {
    return getStore().menuStore;
};
