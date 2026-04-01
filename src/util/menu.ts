/**
 * slug 배열을 기준으로 메뉴 트리에서 해당 페이지 객체를 찾는다.
 */
export type MenuItem = {
    id: number | string;
    title: string;
    slug: string;
    children?: MenuItem[];
};
export const findPageBySlug = (menu: MenuItem[], slugs: string[], depth: number = 0): MenuItem | null => {
    if (!Array.isArray(slugs) || slugs.length === 0) {
        return null;
    }
    for (const item of menu) {
        if (item.slug === slugs[depth]) {
            if (depth === slugs.length - 1) {
                return item;
            }
            if (item.children) {
                const found = findPageBySlug(item.children, slugs, depth + 1);
                if (found) return found;
            }
        }
    }
    return null;
};


/**
 * 메뉴 트리에서 현재 페이지 기준 breadcrumb 경로와
 * 각 depth의 sibling 메뉴 목록을 생성한다.
 * 각 items에는 active 여부가 포함된다.
 */

type BreadcrumbItem = {
    current: MenuItem;
    items: {
        id: MenuItem["id"];
        title: string;
        slug: string;
        active: boolean;
    }[];
};

export const getBreadcrumbMenus = (menu: MenuItem[], targetId: MenuItem["id"]): BreadcrumbItem[] | null => {
    let path: MenuItem[] | null = null;
    const find = (items: MenuItem[], parents: MenuItem[] = []): boolean => {
        for (const item of items) {
            const currentPath = [...parents, item];

            if (item.id === targetId) {
                path = currentPath;
                return true;
            }
            if (item.children) {
                const found = find(item.children, currentPath);
                if (found) return true;
            }
        }
        return false;
    };
    find(menu);
    if (!path) return null;

    return path.map((node, index) => {
        const siblings =
            index === 0 ? menu : path![index - 1].children || [];

        return {
            current: node,
            items: siblings.map(item => ({
                id: item.id,
                title: item.title,
                slug: item.slug,
                active: item.id === node.id
            }))
        };
    });
};


/**
 * 특정 메뉴 id의 자식 메뉴 목록을 가져온다.
 *
 * @param {Array} menu 전체 메뉴 트리
 * @param {number|string|null} id 기준이 되는 메뉴 id
 *
 * @returns {Array} 해당 메뉴의 children 배열 (없으면 빈 배열)
 */
export const getMenu = (
    menu: MenuItem[],
    id: MenuItem["id"] | null = null
): MenuItem[] => {
    if (!id) {
        return Array.isArray(menu) ? menu : [];
    }

    const find = (items: MenuItem[]): MenuItem[] | null => {
        for (const item of items) {
            if (item.id === id) {
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
 * 특정 메뉴 id 기준으로 URL 경로를 생성한다.
 *
 * @param {Array} menu 전체 메뉴 트리
 * @param {number|string} id 찾을 메뉴 id
 * @param {Array<string>} parents 상위 slug 누적 배열 (재귀 내부 사용)
 *
 * @returns {string|undefined} 생성된 URL 경로
 */
export const getMenuPath = (
    menu: MenuItem[],
    id: MenuItem["id"],
    parents: string[] = []
): string | undefined => {
    for (const item of menu) {
        const path = [...parents, item.slug];

        if (item.id === id) {
            if (item.children && item.children.length) {
                return "/" + [...path, item.children[0].slug].join("/");
            }
            return "/" + path.join("/");
        }

        if (item.children) {
            const result = getMenuPath(item.children, id, path);
            if (result) return result;
        }
    }
};


/**
 * 현재 페이지 기준으로 depth 탭 메뉴 데이터를 생성한다.
 */
type PageTab = {
    id: MenuItem["id"];
    title: string;
    slug: string;
    active: boolean;
    children: {
        id: MenuItem["id"];
        title: string;
        slug: string;
        active: boolean;
    }[] | null;
};

export const getPageTabs = (
    menu: MenuItem[],
    currentId: MenuItem["id"],
    path: MenuItem[] | null
): PageTab[] | null => {
    if (!path) return null;

    const parent = path[1];

    if (!parent?.children) return null;

    return parent.children.map(item => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        active:
            item.id === currentId ||
            item.children?.some(child => child.id === currentId) ||
            false,
        children:
            item.children?.map(child => ({
                id: child.id,
                title: child.title,
                slug: child.slug,
                active: child.id === currentId
            })) || null
    }));
};