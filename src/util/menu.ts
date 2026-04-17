
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


export const findMenuByPath = (
    menus,
    pathname,
    breadcrumb = false,
    parents = []
) => {
    for (const item of menus) {
        const newParents = [...parents, item];
        if (item.path === pathname) {
            return breadcrumb ? newParents : item;
        }
        if (item.children) {
            const found = findMenuByPath(
                item.children,
                pathname,
                breadcrumb,
                newParents
            );
            if (found) return found;
        }
    }
    return null;
};


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
