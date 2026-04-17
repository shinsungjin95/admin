import { makeAutoObservable } from "mobx";
import api from "@/api";
import {getStore, Store, useStore} from "@/store";


export class ExampleStore {
    store: Store;
    list = [];
    totalCount = 0;
    dndList = [
        {
            value: 1,
            name: "first-item-wrap",
            children: [
                {value: 1, name: "f-item1"},
                {value: 2, name: "f-item2"},
            ],
        },
        {
            value: 2,
            name: "second-item-wrap",
            children: [
                {value: 1, name: "s-item1"},
                {value: 2, name: "s-item2"},
            ],
        },
    ]

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
