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

    /**
     * 검색 조건에 따른 콘텐츠 목록 조회
     * 페이지 offset을 API 기준으로 변환하고 불필요한 파라미터 제거
     * 조회 결과를 contentList와 contentCount에 저장
     *
     * @param {URLSearchParams} params - 콘텐츠 목록 검색 파라미터
     */
    async getContentTable(params: URLSearchParams) {
        const search = new URLSearchParams(params);
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

    /**
     * 콘텐츠 상세 데이터 조회 및 contentData 저장
     *
     * @param detailId - 조회할 콘텐츠 상세 ID
     */
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

    /**
     * 콘텐츠 신규 등록 또는 수정
     * detailId 존재 여부에 따라 등록/수정 구분
     * 기존 이미지 정보와 새로 선택한 이미지 파일을 FormData로 전송
     *
     * @param {string} menuId - 콘텐츠가 속한 메뉴 ID
     * @param {string | null} detailId - 수정할 콘텐츠 상세 ID
     * @returns API 응답 데이터
     */
    async setContentData(menuId: string, detailId: string | null = null) {
        const formData = new FormData();
        formData.append("menuId", menuId);
        formData.append("title", this.contentData.title);
        formData.append("content", this.contentData.content);

        // 수정일 때만
        if (detailId) {
            formData.append("detailId", detailId);
            formData.append("existingImages", JSON.stringify(this.contentData.images));
        }

        // 신규/수정 둘 다 새로 선택한 파일 전송
        this.contentData.files.forEach((file) => {
            formData.append("images", file);
        });

        const config = {
            headers: {"Content-Type": "multipart/form-data"}
        };
        if (detailId) {
            return await api.patch("contents/detail", formData, config);
        }
        return await api.post("contents", formData, config);
    }

    /**
     * 선택된 콘텐츠 삭제
     * 선택된 목록 인덱스를 콘텐츠 ID 배열로 변환 후 삭제 요청
     *
     * @param idx - 삭제할 콘텐츠의 contentList 인덱스 목록
     * @returns API 응답 데이터
     */
    async setDeleteContent(idx) {
        const ids = idx.map((index) => {
            return this.contentList[index]["id"];
        });
        return await api.delete("contents", {data: {ids: ids}});
    }

    /**
     * 콘텐츠 목록 및 전체 개수 초기화
     */
    setContentListDataClear() {
        this.contentList = [];
        this.contentCount = 0;
    }

    /**
     * contentData의 특정 필드 값 변경
     *
     * @param type - 변경할 필드
     * @param value - 변경할 값
     */
    setcontentData(type, value) {
        this.contentData[type] = value;
    }

    /**
     * 콘텐츠 등록 및 수정 데이터 초기화
     */
    setcontentDataClear() {
        this.contentData = {
            title: "",
            images: [],
            files: [],
            content: ""
        }
    }

    /**
     * 새로 선택한 이미지 파일을 files 목록에 추가
     *
     * @param {File[]} files - 추가할 이미지 파일 목록
     */
    addContentFiles(files: File[]) {
        this.contentData.files = [
            ...this.contentData.files,
            ...files,
        ];
    }

    /**
     * 선택한 신규 이미지 파일 제거
     *
     * @param {number} index - 제거할 파일 인덱스
     */
    removeContentFile(index: number) {
        this.contentData.files = this.contentData.files.filter(
            (_, fileIndex) => fileIndex !== index
        );
    }

    /**
     * 기존 콘텐츠 이미지 제거
     *
     * @param {number} index - 제거할 이미지 인덱스
     */
    removeContentImage(index: number) {
        this.contentData.images = this.contentData.images.filter(
            (_, imageIndex) => imageIndex !== index
        );
    }
}

/**
 * React 컴포넌트에서 ContentStore 조회
 *
 * @returns {ContentStore} ContentStore 인스턴스
 */
export const useContentStore = () => {
    return useStore().contentStore;
}

/**
 * React 컴포넌트 외부에서 ContentStore 조회
 *
 * @returns {ContentStore} ContentStore 인스턴스
 */
export const getContentStore = () => {
    return getStore().contentStore;
}
