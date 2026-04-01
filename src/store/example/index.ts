import { makeAutoObservable } from "mobx";
import api from "@/api";
import {getStore, Store, useStore} from "@/store";

type SearchParams = string;
export class ExampleStore {
    store: Store;
    list = [];
    totalCount = 0;

    constructor(store: Store) {
        this.store = store;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async getBanners({ searchParams }: { searchParams: SearchParams }) {
        try {

            const search = new URLSearchParams(searchParams.startsWith("?") ? searchParams.slice(1) : searchParams);
            const paramsOffset = search.get("offset");
            if(paramsOffset){
                search.set("offset", `${parseInt(paramsOffset) - 1}`);
            }
            const finalParams = `?${search.toString()}`;
            const response = await api.get(`test${finalParams}`);
            console.log("data", response);
            this.list = response.data.list ?? [];
            this.totalCount = response?.data.count ?? 0;
        } catch (error) {
            console.error("banners fetch error:", error);
        }
    }
}

export const useExampleStore = () => {
    return useStore().exampleStore;
};

export const getExampleStore = () => {
    return getStore().exampleStore;
};
