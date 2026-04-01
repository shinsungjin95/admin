import { makeAutoObservable } from "mobx";
import {getStore, Store, useStore} from "@/store";

export class UserStore {
    store: Store;
    user = {};

    constructor(store: Store) {
        this.store = store;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    login() {

    }

    logout() {

    }
}

export const useUserStore = () => {
    return useStore().userStore;
};

export const getUserStore = () => {
    return getStore().userStore;
};

