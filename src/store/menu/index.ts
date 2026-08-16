import {makeAutoObservable} from "mobx";
import {getStore, Store, useStore} from "@/store";
import {convertMenu} from "@/util/menu.ts";
import {MENU_LIST} from "@/constants";
import {nanoid} from "nanoid";
import api from "@/api";

export interface MenuItem {
    id: string;
    type: string;
    title: string;
    subtype?: string;
    children?: MenuItem[];
}

type AddMenuData = {
    parentId?: string | null;
    title: string;
};



export class MenuStore {
    store: Store;
    currentMenuData = [];
    navigationData = [];


    /**
     * MenuStore 초기화 및 MobX observable 설정
     * 초기 메뉴 데이터 존재 시 navigationData와 관리자 메뉴 설정
     *
     * @param {Store} store - 전역 Store
     * @param initialNavigation - 초기 메뉴 데이터
     */
    constructor(store: Store, initialNavigation?: any) {
        this.store = store;
        makeAutoObservable(this, {}, {autoBind: true});
        if (initialNavigation) {
            this.navigationData = initialNavigation.navigation;
            this.setCurrentMenu(initialNavigation.navigation);
        }
    }

    /**
     * 홈페이지 콘텐츠 메뉴를 API 메뉴 데이터 기준으로 구성
     *
     * @param {MenuItem[]} list - 홈페이지 메뉴 목록
     */
    setCurrentMenu(list: MenuItem[]) {
        this.currentMenuData = MENU_LIST.map((menu) =>
            menu.menuId === "homepage-content-setting"
                ? {...menu, children: convertMenu(list)} : menu
        );
    }

    /**
     * 신규 메뉴 추가
     * parentId가 없는 경우 부모 메뉴 추가
     * parentId가 있는 경우 해당 부모의 하위 게시판 메뉴 추가
     *
     * @param {AddMenuData} data - 추가할 메뉴 정보
     */
    setAddMenu(data: AddMenuData) {
        if (!data.parentId) {
            this.navigationData = [
                ...this.navigationData,
                {
                    id: nanoid(),
                    type: "parent",
                    title: data.title,
                    children: [],
                },
            ];

            return;
        }
        this.navigationData = this.navigationData.map((parent) => {
            if (parent.id !== data.parentId) {
                return parent;
            }
            return {
                ...parent,
                children: [
                    ...(parent.children ?? []),

                    {
                        id: nanoid(),
                        type: "board",
                        title: data.title,
                        subtype: "list",
                    },
                ],
            };
        });
    }


    /**
     * 대상 메뉴 수정 또는 삭제
     * deleType 활성화 시 targetId에 해당하는 메뉴 삭제
     * 수정 시 메뉴명 및 게시판 subtype 변경
     *
     * @param data - 메뉴 수정 및 삭제 정보
     * @param {string} data.targetId - 대상 메뉴 ID
     * @param {boolean} data.deleType - 삭제 여부
     * @param {string} data.title - 변경할 메뉴명
     * @param {string} data.subtype - 변경할 게시판 타입
     */
    setModifyMenu(data: {
        targetId: string;
        deleType?: boolean;
        title?: string;
        subtype?: string;
    }) {
        const modifyMenu = (items: MenuItem[]): MenuItem[] => {

            // 삭제
            if (data.deleType) {
                return items.filter((item) => item.id !== data.targetId).map((item) => {
                    if (item.children?.length) {
                        return {
                            ...item,
                            children: modifyMenu(item.children),
                        };
                    }

                    return item;
                });
            }

            // 수정
            return items.map((item) => {
                if (item.id === data.targetId) {
                    const modifyItem = {
                        ...item,
                        title: data.title,
                    };

                    if (data.subtype) {
                        modifyItem.subtype = data.subtype;
                    }

                    return modifyItem;
                }

                if (item.children?.length) {
                    return {
                        ...item,
                        children: modifyMenu(item.children),
                    };
                }

                return item;
            });
        };

        this.navigationData = modifyMenu(this.navigationData);
    }

    /**
     * 메뉴 관리 navigationData 변경
     *
     * @param {MenuItem[]} data - 변경된 메뉴 목록
     */
    setNavigationData(data: MenuItem[]) {
        this.navigationData = data;
    }

    /**
     * 현재 navigationData를 메뉴 API에 저장
     *
     * @returns API 응답 데이터
     */
    async setSaveButton() {
       return await api.post("menus", this.navigationData);
    }

}

/**
 * React 컴포넌트에서 MenuStore 조회
 *
 * @returns {MenuStore} MenuStore 인스턴스
 */
export const useMenuStore = () => {
    return useStore().menuStore;
};

/**
 * React 컴포넌트 외부에서 MenuStore 조회
 *
 * @returns {MenuStore} MenuStore 인스턴스
 */
export const getMenuStore = () => {
    return getStore().menuStore;
};
