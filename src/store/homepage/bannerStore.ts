import {makeAutoObservable, runInAction} from "mobx";
import {getStore, Store, useStore} from "@/store";
import api from "@/api";

export class BannerStore {
    store: Store;
    bannerList = [];
    bannerData = {
        id: undefined,
        title: "",
        link: "",
        image: null,
        file: null,
        sortOrder: undefined,
    }

    
    constructor(store: Store) {
        this.store = store;
        makeAutoObservable(this, {}, {autoBind: true});
    }


    async getBannerList() {
        const response = await api.get("banners");
        if (response.data.success) {
            runInAction(() => {
                this.bannerList = response.data.data;
            });
        }
        return response;
    }


    async setBanner() {
        const formData = new FormData();

        formData.append("title", this.bannerData.title);
        formData.append("link", this.bannerData.link);

        if (this.bannerData.file) {
            formData.append(
                "image",
                this.bannerData.file
            );
        }

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        // 수정
        if (this.bannerData.id) {
            formData.append(
                "id",
                String(this.bannerData.id)
            );

            formData.append(
                "sortOrder",
                String(this.bannerData.sortOrder)
            );

            return await api.patch(
                "banners",
                formData,
                config
            );
        }

        // 신규
        formData.append("active", "true");

        return await api.post(
            "banners",
            formData,
            config
        );
    }


    async setBannerActive(id, active) {
        const formData = new FormData();
        formData.append("id", String(id));
        formData.append("active", String(active));
        return await api.patch("banners", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    }

    async setBannerOrder(list) {
        this.bannerList = list;
        const orders = list.map((item, index) => ({id: item.id, sortOrder: index}));
        return await api.patch("banners/order", {orders});
    }


    async setDeleteBanner(idx) {
        console.log(idx)
        const ids = idx.map((index) => {
            return this.bannerList[index]["id"];
        });
        return await api.delete("banners", {data: {ids: ids}});
    }




    setBannerData(type, value) {
        this.bannerData[type] = value;
    }

    setModifyBannerData(data) {
        this.bannerData = {
            id: data.id,
            title: data.title,
            link: data.link,
            image: data.image,
            file: null,
            sortOrder: data.sort_order,
        };
    }

    setBannerListClear() {
        this.bannerList = [];
    }


    setBannerDataClear() {
        this.bannerData = {
            id: undefined,
            title: "",
            link: "",
            image: null,
            file: null,
            sortOrder: undefined,
        };
    }
    


}
export const useBannerStore = () => {
    return useStore().bannerStore;
}

export const getBannerStore = () => {
    return getStore().bannerStore;
}
