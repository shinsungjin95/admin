import {makeAutoObservable} from "mobx";
import {getStore, Store, useStore} from "@/store";

export class BannerStore {
    store: Store;

    
    constructor(store: Store) {
        this.store = store;
        makeAutoObservable(this, {}, {autoBind: true});
    }
    


}
export const useBannerStore = () => {
    return useStore().bannerStore;
}

export const getBannerStore = () => {
    return getStore().bannerStore;
}
