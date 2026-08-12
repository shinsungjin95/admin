import {makeAutoObservable, runInAction} from "mobx";
import {getStore, Store, useStore} from "@/store";
import api from "@/api";

export class ContentStore {
    store: Store;
    contentList: [];
    contentCount: 0;
    contentData = {
        title: "",
        images: [],
        files: [],
        content: ""
    }

    
    constructor(store: Store) {
        this.store = store;
        makeAutoObservable(this, {}, {autoBind: true});
    }

    async getFetchTable(params: URLSearchParams) {
        const search = new URLSearchParams(params);
        const paramsOffset = search.get("offset");
        if(paramsOffset){
            search.set("offset", `${parseInt(paramsOffset) - 1}`);
        }
        search.delete("type");
        search.delete("subtype");
        const finalParams = `?${search.toString()}`;
        const response = await api.get(`contents${finalParams}`);
        if(response.data.success){
            runInAction(() => {
                this.contentList = response.data.data.list;
                this.contentCount = response.data.data.totalCount;
            });
        }
    }


    async getContentDetialData(detailId) {
        const response = await api.get(`contents/detail?detailId=${detailId}`);

        if (response.data.success) {
            runInAction(() => {
                this.contentData = {
                    title: response.data.data.title,
                    images: response.data.data.images || [],
                    files: [],
                    content: response.data.data.content || "",
                };
            });
        }
    }
    async setContentData(
        menuId: string,
        detailId: string | null = null
    ) {
        const formData = new FormData();

        formData.append("menuId", menuId);
        formData.append("title", this.contentData.title);
        formData.append("content", this.contentData.content);

        // 수정일 때만
        if (detailId) {
            formData.append("detailId", detailId);

            formData.append(
                "existingImages",
                JSON.stringify(this.contentData.images)
            );
        }

        // 신규/수정 둘 다 새로 선택한 파일 전송
        this.contentData.files.forEach((file) => {
            formData.append("images", file);
        });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        if (detailId) {
            return await api.patch(
                "contents/detail",
                formData,
                config
            );
        }

        return await api.post(
            "contents",
            formData,
            config
        );
    }


    setContentListDataClear() {
        this.contentList = [];
        this.contentCount = 0;
    }


    setcontentData(type, value) {
        this.contentData[type] = value;
    }


    setcontentDataClear() {
        this.contentData = {
            title: "",
            images: [],
            files: [],
            content: ""
        }
    }


    addContentFiles(files: File[]) {
        this.contentData.files = [
            ...this.contentData.files,
            ...files,
        ];
    }

    removeContentFile(index: number) {
        this.contentData.files = this.contentData.files.filter(
            (_, fileIndex) => fileIndex !== index
        );
    }

    removeContentImage(index: number) {
        this.contentData.images = this.contentData.images.filter(
            (_, imageIndex) => imageIndex !== index
        );
    }


}
export const useContentStore = () => {
    return useStore().contentStore;
}

export const getContentStore = () => {
    return getStore().contentStore;
}
