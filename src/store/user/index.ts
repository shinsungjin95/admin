import { makeAutoObservable } from "mobx";
import {getStore, Store, useStore} from "@/store";
import {COOKIE_NAME} from "@/constants";
import api from "@/api";

export class UserStore {
    store: Store;
    user = {};

    constructor(store: Store) {
        this.store = store;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async setLogin(payload) {
        return await api.post("/auth/login", payload);
    }

    async setLogout(removeCookie) {
        removeCookie(COOKIE_NAME, { path: "/" });
    }
}

export const useUserStore = () => {
    return useStore().userStore;
};

export const getUserStore = () => {
    return getStore().userStore;
};

