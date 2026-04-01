import { makeAutoObservable } from "mobx";
import type { ComponentType } from "react";
import { getStore, Store, useStore } from "@/store";
import type { ModalProps } from "@components/Modal";

type ModalAction<T = unknown> = (data?: T) => boolean | void;

export type ModalItem = {
    component?: ComponentType<any>;
    props?: Partial<ModalProps> & {
        onConfirm?: ModalAction;
        onCancel?: ModalAction;
    };
};

export class ModalStore {
    store: Store;
    modals: ModalItem[] = [];

    constructor(store: Store) {
        this.store = store;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    open(payload: ModalItem) {
        const { component, props } = payload;
        let modalData: ModalItem = {
            props
        }
        if (component){
            modalData["component"] = component
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