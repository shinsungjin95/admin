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

    /**
     * 사용자 로그인 요청
     *
     * @param payload - 로그인 정보
     * @returns API 응답 데이터
     */
    async setLogin(payload) {
        return await api.post("/auth/login", payload);
    }

    /**
     * 인증 토큰 쿠키 제거 및 로그아웃 처리
     *
     * @param removeCookie - 쿠키 제거 함수
     */
    async setLogout(removeCookie) {
        removeCookie(COOKIE_NAME, { path: "/" });
    }
}

/**
 * React 컴포넌트에서 UserStore 조회
 *
 * @returns {UserStore} UserStore 인스턴스
 */
export const useUserStore = () => {
    return useStore().userStore;
};

/**
 * React 컴포넌트 외부에서 UserStore 조회
 *
 * @returns {UserStore} UserStore 인스턴스
 */
export const getUserStore = () => {
    return getStore().userStore;
};

