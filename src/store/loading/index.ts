import {makeAutoObservable} from "mobx";
import {getStore, Store, useStore} from "@/store";

export class LoadingStore {
    store: Store;
    count = 0;
    visible = false;
    constructor(store: Store) {
        this.store = store;
        makeAutoObservable(this, {}, {autoBind: true});
    }

    /**
     * 진행 중인 로딩 요청 개수 증가
     */
    startLoading() {
        this.count += 1;
    }

    /**
     * 로딩 표시 상태 변경
     * 로딩 종료 시 요청 개수 감소 및 모든 요청 완료 후 로딩 숨김
     *
     * @param {boolean} value - 로딩 표시 여부
     */
    setLoadingState(value: boolean) {
        if(value){
            this.visible = value;
        } else{
            this.count = Math.max(0, this.count - 1);
            if (this.count === 0) {
                this.visible = value;
            }
        }
    }
}

/**
 * React 컴포넌트에서 LoadingStore 조회
 *
 * @returns {LoadingStore} LoadingStore 인스턴스
 */
export const useLoadingStore = () => {
    return useStore().loadingStore;
}

/**
 * React 컴포넌트 외부에서 LoadingStore 조회
 *
 * @returns {LoadingStore} LoadingStore 인스턴스
 */
export const getLoadingStore = () => {
    return getStore().loadingStore;
}
