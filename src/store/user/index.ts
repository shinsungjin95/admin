import { makeAutoObservable } from "mobx";
import {getStore, Store, useStore} from "@/store";
import {COOKIE_NAME} from "@/constants";

export class UserStore {
    store: Store;
    user = {};

    constructor(store: Store) {
        this.store = store;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async setLogin(setCookie) {
        const randomToken = Math.random().toString(36).substring(2);
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);
        setCookie(COOKIE_NAME, randomToken, {
            path: "/",       // 전체 경로에서 사용
            expires,         // 만료시간
        });
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

