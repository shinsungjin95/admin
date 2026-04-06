import { makeAutoObservable } from "mobx";
import { getStore, Store, useStore } from "@/store";
import type {ModalItem} from "@components/Modal";

export class ModalStore {
    store: Store;
    modals: ModalItem[] = [];

    constructor(store: Store) {
        this.store = store;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    open(payload: ModalItem) {
        const { component, props } = payload;
        const modalData: ModalItem = {
            props: props ?? {}
        };
        if (component) {
            modalData.component = component;
        }
        this.modals.push(modalData);
    }

    close() {
        this.modals.pop();
    }

    closeAll() {
        this.modals = [];
    }
}

export const useModalStore = () => {
    return useStore().modalStore;
};

export const getModalStore = () => {
    return getStore().modalStore;
};