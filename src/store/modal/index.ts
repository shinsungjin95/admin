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

    /**
     * 전달받은 모달 데이터를 modals 목록에 추가
     *
     * @param {ModalItem} payload - 모달 컴포넌트 및 props 정보
     */
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

    /**
     * 가장 최근에 열린 모달 닫기
     */
    close() {
        this.modals.pop();
    }

    /**
     * 열려 있는 모든 모달 닫기
     */
    closeAll() {
        this.modals = [];
    }
}

/**
 * React 컴포넌트에서 ModalStore 조회
 *
 * @returns {ModalStore} ModalStore 인스턴스
 */
export const useModalStore = () => {
    return useStore().modalStore;
};

/**
 * React 컴포넌트 외부에서 ModalStore 조회
 *
 * @returns {ModalStore} ModalStore 인스턴스
 */
export const getModalStore = () => {
    return getStore().modalStore;
};