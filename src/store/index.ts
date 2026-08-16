import { createContext, createElement, useContext } from "react";
import type { ReactNode } from "react";

import { ModalStore } from "./modal";
import { UserStore } from "./user";
import { LoadingStore } from "./loading";
import { MenuStore } from "./menu";
import { ContentStore } from "./homepage/contentStore";
import { BannerStore } from "./homepage/bannerStore";


type InitialState = Record<string, unknown>;
type StoreProviderProps = {
    children: ReactNode;
    initialState?: InitialState;
};
let store: Store | null;
export const StoreContext = createContext<Store | null>(null);

/**
 * 애플리케이션에서 사용하는 MobX Store 통합 관리
 * 각 기능별 Store 인스턴스 생성 및 연결
 */
export class Store {
    modalStore: ModalStore;
    userStore: UserStore;
    loadingStore: LoadingStore;
    menuStore: MenuStore;
    contentStore: ContentStore;
    bannerStore: BannerStore;


    /**
     * 전체 Store 초기화
     *
     * @param {InitialState} initialState - Store 초기 상태 데이터
     */
    constructor(initialState?: InitialState) {
        this.modalStore = new ModalStore(this);
        this.userStore = new UserStore(this);
        this.loadingStore = new LoadingStore(this);
        this.menuStore = new MenuStore(this, initialState);
        this.contentStore = new ContentStore(this);
        this.bannerStore = new BannerStore(this);
    }
}


/**
 * 전역 Store 생성 및 Context Provider 연결
 *
 * @param {StoreProviderProps} props - Provider 속성
 * @returns Store Context Provider
 */
export const StoreProvider = ({children, initialState}: StoreProviderProps) => {
    if (!store) {
        store = new Store(initialState);
    }
    return createElement(StoreContext.Provider, { value: store }, children);
};

/**
 * React 컴포넌트에서 전역 Store 조회
 *
 * @returns {Store} 전역 Store
 * @throws StoreProvider 외부에서 호출한 경우 에러 발생
 */
export const useStore = (): Store => {
    const context = useContext(StoreContext);

    if (!context) {
        throw new Error("useStore must be used inside of StoreProvider");
    }

    return context;
};

/**
 * React 컴포넌트 외부에서 전역 Store 조회
 *
 * @returns {Store} 전역 Store
 * @throws Store 초기화 전 호출한 경우 에러 발생
 */
export const getStore = (): Store => {
    if (!store) {
        throw new Error("Store has not been initialized");
    }
    return store;
};

declare global {
    interface Window {
        getStore: () => Store;
    }
}

window.getStore = getStore;