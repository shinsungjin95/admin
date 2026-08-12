import { createContext, createElement, useContext } from "react";
import type { ReactNode } from "react";

import { ModalStore } from "./modal";
import { UserStore } from "./user";
import { ExampleStore } from "./example";
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
export class Store {
    modalStore: ModalStore;
    userStore: UserStore;
    exampleStore: ExampleStore;
    loadingStore: LoadingStore;
    menuStore: MenuStore;
    contentStore: ContentStore;
    bannerStore: BannerStore;

    constructor(initialState?: InitialState) {
        this.modalStore = new ModalStore(this);
        this.userStore = new UserStore(this);
        this.exampleStore = new ExampleStore(this);
        this.loadingStore = new LoadingStore(this);
        this.menuStore = new MenuStore(this, initialState);
        this.contentStore = new ContentStore(this);
        this.bannerStore = new BannerStore(this);
    }
}



export const StoreProvider = ({children, initialState}: StoreProviderProps) => {
    if (!store) {
        store = new Store(initialState);
    }
    return createElement(StoreContext.Provider, { value: store }, children);
};
export const useStore = (): Store => {
    const context = useContext(StoreContext);

    if (!context) {
        throw new Error("useStore must be used inside of StoreProvider");
    }

    return context;
};

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