import ROUTES from "@/constants/routes.ts";

/**
 * 홈페이지 메뉴 목록 조회
 *
 * @returns {Promise<any[]>} 메뉴 목록
 */
export const getFetchMenu = async () => {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}menus`
        );
        if (!res.ok) {
            throw new Error("메뉴 조회 실패");
        }
        const navigation = await res.json();
        if(!navigation.success){
            throw new Error("메뉴 조회 실패");
        }
        return navigation.data;
    } catch (e) {
        console.error(e);
        return [];
    }
};

/**
 * API 메뉴 데이터를 관리자 사이드 메뉴 구조로 변환
 * 하위 메뉴가 없는 경우 콘텐츠 관리 페이지 path 생성
 *
 * @param {any[]} menus - API 메뉴 목록
 * @returns {any[]} 변환된 메뉴 목록
 */
export const convertMenu = (menus: any[]): any[] => {
    return menus.map((menu) => {
        const params = new URLSearchParams({
            menuId: menu.id,
            ...(menu.type && { type: menu.type }),
            ...(menu.subtype && { subtype: menu.subtype }),
        });

        return {
            menuId: menu.id,
            title: menu.title,
            ...(menu.children?.length
                ? {
                    children: convertMenu(menu.children),
                }
                : {
                    path: `${ROUTES.PROTECTED.HOME_PAGE_CONTENT}?${params.toString()}`,
                }),
        };
    });
};


/**
 * menuId에 해당하는 메뉴의 하위 메뉴 목록 조회
 * menuId가 없는 경우 전달받은 전체 메뉴 목록 반환
 *
 * @param {any[]} menu - 전체 메뉴 목록
 * @param {string | null} menuId - 조회할 메뉴 ID
 * @returns {any[]} 하위 메뉴 목록
 */
export const getMenu = (menu, menuId = null) => {
    if (!menuId) {
        return Array.isArray(menu) ? menu : [];
    }

    const find = (items) => {
        for (const item of items) {
            if (item.menuId === menuId) {
                return item.children || [];
            }
            if (item.children) {
                const result = find(item.children);
                if (result) return result;
            }
        }
        return null;
    };

    return find(menu) || [];
};

/**
 * 현재 URL 또는 menuId에 해당하는 메뉴 조회
 * breadcrumb 활성화 시 현재 메뉴까지의 상위 메뉴 경로 반환
 *
 * @param {any[]} menus - 전체 메뉴 목록
 * @param {string} pathname - 현재 URL pathname
 * @param {string | null} menuId - 현재 메뉴 ID
 * @param {boolean} breadcrumb - breadcrumb 반환 여부
 * @param {any[]} parents - 재귀 탐색용 상위 메뉴 목록
 * @returns {any | any[] | null} 현재 메뉴 또는 breadcrumb 메뉴 목록
 */
export const findCurrentMenu  = (
    menus,
    pathname,
    menuId = null,
    breadcrumb = false,
    parents = []
) => {
    for (const item of menus) {
        const newParents = [...parents, item];
        if (menuId && item.menuId === menuId) {
            return breadcrumb ? newParents : item;
        }
        if (!menuId && item.path === pathname) {
            return breadcrumb ? newParents : item;
        }
        if (item.children) {
            const found = findCurrentMenu (
                item.children,
                pathname,
                menuId,
                breadcrumb,
                newParents
            );

            if (found) return found;
        }
    }

    return null;
};

/**
 * menuId에 해당하는 메뉴의 계층별 활성화 key 조회
 * 메뉴 인덱스를 기준으로 부모부터 현재 메뉴까지의 key 생성
 *
 * @param {any[]} menus - 전체 메뉴 목록
 * @param {string} targetMenuId - 활성화할 메뉴 ID
 * @param {string} parentKey - 재귀 탐색용 상위 메뉴 key
 * @returns {string[] | null} 활성화 메뉴 key 목록
 */
export const findActiveKeys = (menus, targetMenuId, parentKey = "") => {
    for (let i = 0; i < menus.length; i++) {
        const item = menus[i];
        const key = parentKey ? `${parentKey}-${i}` : `${i}`;

        if (item.menuId === targetMenuId) {
            return [key];
        }

        if (item.children) {
            const childResult = findActiveKeys(item.children, targetMenuId, key);
            if (childResult) {
                return [key, ...childResult];
            }
        }
    }
    return null;
};
