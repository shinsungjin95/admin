import {makeAutoObservable, runInAction} from "mobx";
import {getStore, Store, useStore} from "@/store";
import api from "@/api";

export class BannerStore {
    store: Store;
    bannerList = [];
    bannerConfig = {
        effect: "",
        opt_colors: "white",
        navigation: {
            active: true,
        },
        pagination: {
            active: true,
            type: "",
            position: "",
        },
        autoplay: {
            active: true,
            delay: 2000,
        },
    };
    bannerData = {
        id: undefined,
        title: "",
        link: "",
        pcImage: null,
        pcFile: null,
        moImage: null,
        moFile: null,
        sortOrder: undefined,
    }

    
    constructor(store: Store) {
        this.store = store;
        makeAutoObservable(this, {}, {autoBind: true});
    }

    /**
     * 배너 목록 조회 및 bannerList 저장
     *
     * @returns API 응답 데이터
     */
    async getBannerList() {
        const response = await api.get("banners");
        if (response.data.success) {
            runInAction(() => {
                this.bannerList = response.data.data.items;
                this.bannerConfig = response.data.data.config;
            });
        }
        return response;
    }

    /**
     * 배너 신규 등록 또는 수정
     * bannerData의 id 존재 여부에 따라 등록/수정 구분
     *
     * @returns API 응답 데이터
     */
    async setBanner() {
        const formData = new FormData();
        formData.append("title", this.bannerData.title);
        formData.append("link", this.bannerData.link);
        if (this.bannerData.pcFile) {
            formData.append("pcImage", this.bannerData.pcFile);
        }
        if (this.bannerData.moFile) {
            formData.append("moImage", this.bannerData.moFile);
        }
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        // 수정
        if (this.bannerData.id) {
            formData.append("id", String(this.bannerData.id));
            formData.append("sortOrder", String(this.bannerData.sortOrder));
            return await api.patch("banners", formData, config);
        }

        // 신규
        formData.append("active", "true");
        return await api.post("banners", formData, config);
    }

    /**
     * 배너 활성화 상태 변경
     *
     * @param id - 변경할 배너 ID
     * @param active - 활성화 여부
     * @returns API 응답 데이터
     */
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

    /**
     * 배너 노출 순서 변경 및 bannerList 갱신
     *
     * @param list - 변경된 배너 목록
     * @returns API 응답 데이터
     */
    async setBannerOrder(list) {
        this.bannerList = list;
        const orders = list.map((item, index) => ({id: item.id, sortOrder: index}));
        return await api.patch("banners/order", {orders});
    }

    /**
     * 선택된 배너 삭제
     * 선택된 목록 인덱스를 배너 ID 배열로 변환 후 삭제 요청
     *
     * @param idx - 삭제할 배너의 bannerList 인덱스 목록
     * @returns API 응답 데이터
     */
    async setDeleteBanner(idx) {
        console.log(idx)
        const ids = idx.map((index) => {
            return this.bannerList[index]["id"];
        });
        return await api.delete("banners", {data: {ids: ids}});
    }

    /**
     * bannerData의 특정 필드 값 변경
     *
     * @param type - 변경할 필드
     * @param value - 변경할 값
     */
    setBannerData(type, value) {
        this.bannerData[type] = value;
    }

    /**
     * 수정 대상 배너 데이터를 bannerData에 설정
     *
     * @param data - 수정할 배너 데이터
     */
    setModifyBannerData(data) {
        this.bannerData = {
            id: data.id,
            title: data.title,
            link: data.link,
            pcImage: data.image?.pc ?? null,
            pcFile: null,
            moImage: data.image?.mo ?? null,
            moFile: null,
            sortOrder: data.sort_order,
        };
    }

    /**
     * 배너 설정값 변경
     * subType 존재 여부에 따라 상위 설정 또는 하위 설정값 변경
     *
     * @param type - 변경할 설정 타입
     * @param value - 변경할 값
     * @param subType - 변경할 하위 설정 타입
     */
    setBannerConfig(type, value, subType = undefined) {
        if (subType) {
            this.bannerConfig[type][subType] = value;
            return;
        }

        this.bannerConfig[type] = value;
    }

    /**
     * 배너 설정 저장
     *
     * @returns API 응답 데이터
     */
    async setPatchBannerConfig() {
        const payLoad = {
            config: this.bannerConfig
        };
        return await api.patch("banners/config", payLoad);
    }



    /**
     * 배너 목록 초기화
     */
    setBannerListClear() {
        this.bannerList = [];
    }

    /**
     * 배너 설정값 초기화
     */
    setBannerOptionsClear() {
        this.bannerConfig = {
            effect: "",
            opt_colors: "white",
            navigation: {
                active: true,
            },
            pagination: {
                active: true,
                type: "",
                position: "",
            },
            autoplay: {
                active: true,
                delay: 2000,
            },
        };
    }


    /**
     * 배너 등록 및 수정 데이터 초기화
     */
    setBannerDataClear() {
        this.bannerData = {
            id: undefined,
            title: "",
            link: "",

            pcImage: null,
            pcFile: null,

            moImage: null,
            moFile: null,

            sortOrder: undefined,
        };
    }
}

/**
 * React 컴포넌트에서 BannerStore 조회
 *
 * @returns {BannerStore} BannerStore 인스턴스
 */
export const useBannerStore = () => {
    return useStore().bannerStore;
}

/**
 * React 컴포넌트 외부에서 BannerStore 조회
 *
 * @returns {BannerStore} BannerStore 인스턴스
 */
export const getBannerStore = () => {
    return getStore().bannerStore;
}
