import { makeAutoObservable } from "mobx";
import api from "@/api";
import {getStore, Store, useStore} from "@/store";
import {EXAMPLE_DND_LIST_INIT} from "@/pages/protected/detail/contoller";


export class ExampleStore {
    store: Store;
    list = [];
    totalCount = 0;
    dndList = EXAMPLE_DND_LIST_INIT;

    constructor(store: Store) {
        this.store = store;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async getFetchTable(params: URLSearchParams) {
        const search = new URLSearchParams(params);
        const paramsOffset = search.get("offset");
        if(paramsOffset){
            search.set("offset", `${parseInt(paramsOffset) - 1}`);
        }
        const finalParams = `?${search.toString()}`;
        const response = await api.get(`test${finalParams}`);
        console.log("res > ", response)
    }

    setDataClear() {
        this.list = [];
        this.totalCount = 0;
    }


    setEtcDataClear() {
        this.dndList = EXAMPLE_DND_LIST_INIT;
    }


    setReOrderDndList(list) {
        this.dndList = list;
    }
}

export const useExampleStore = () => {
    return useStore().exampleStore;
};

export const getExampleStore = () => {
    return getStore().exampleStore;
};
