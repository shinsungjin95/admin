// ===============================
// ✅ 타입 정의
// ===============================


import React from "react";

export type MenuItem = {
    name: string;
    link?: string;
    display?: "none" | "show";
    children?: MenuItem[];
};

export type BreadcrumbItem = {
    name: string;
    link?: string;
    path?: string;
};


// ===============================
// ✅ 기본 유틸
// ===============================
export const buildKey = (indexes: number[]): string => {
    return indexes.join(".");
}

export const normalize = (path?: string): string => {
    if (!path) return "";

    const queryIndex = path.indexOf("?");
    if (queryIndex !== -1) path = path.slice(0, queryIndex);

    if (path.length > 1 && path.endsWith("/")) {
        path = path.slice(0, -1);
    }

    return path;
};


// ===============================
// ✅ 핵심: 경로 매칭 (통합)
// ===============================
export const matchPath = (pattern?: string, pathname?: string) => {
    if (!pattern || !pathname) {
        return { matched: false, score: -1 };
    }
    let segmentCount = 0;
    const patternSegments = normalize(pattern).split("/");
    const pathnameSegments = normalize(pathname).split("/");

    if (pathnameSegments.length < patternSegments.length) {
        return { matched: false, score: -1 };
    }
    for (let index = 0; index < patternSegments.length; index++) {
        const patternSegment = patternSegments[index];
        const pathnameSegment = pathnameSegments[index];

        if (patternSegment.startsWith(":")) {
            continue;
        }

        if (patternSegment !== pathnameSegment) {
            return { matched: false, score: -1 };
        }

        segmentCount++;
    }

    return {
        matched: true,
        score: segmentCount,
    };
};


// ===============================
// ✅ 트리 탐색 (현재 경로 찾기)
// ===============================
export const findPath = (nodes: MenuItem[], pathname: string, indexes: number[] = []): number[] | null => {
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const current = [...indexes, i];

        if (node.link) {
            const { matched } = matchPath(node.link, pathname);
            if (matched) return current;
        }

        if (node.children?.length) {
            const child = findPath(node.children, pathname, current);
            if (child) return child;
        }
    }

    return null;
};


// ===============================
// ✅ active key 생성
// ===============================
export const getActiveKeysFromPath = (path: number[]): string[] => {
    const keys: string[] = [];

    for (let i = 0; i < path.length; i++) {
        keys.push(buildKey(path.slice(0, i + 1)));
    }

    return keys;
};


// ===============================
// ✅ open key toggle
// ===============================
export const toggleKey = (previousKeys: string, setOpenKey: React.Dispatch<React.SetStateAction<string[]>>) => {
    setOpenKey((prev) => {
        if (prev.includes(previousKeys)) {
            return prev.filter((k) => k !== previousKeys);
        }
        return [...prev, previousKeys];
    });
};


// ===============================
// ✅ breadcrumb 매칭
// ===============================
export const breadcrumbMatch = (
    pathname: string,
    list: MenuItem[]
): { nodes: MenuItem[]; score: number } | null => {
    let best: { nodes: MenuItem[]; score: number } | null = null;

    const walk = (node: MenuItem, trail: MenuItem[]) => {
        if (node.link) {
            const { matched, score } = matchPath(node.link, pathname);

            if (matched) {
                const candidate = {
                    nodes: [...trail, node],
                    score,
                };

                if (
                    !best ||
                    candidate.score > best.score ||
                    (candidate.score === best.score &&
                        candidate.nodes.length > best.nodes.length)
                ) {
                    best = candidate;
                }
            }
        }

        node.children?.forEach((child) =>
            walk(child, [...trail, node])
        );
    };

    list.forEach((item) => walk(item, []));

    return best;
};


// ===============================
// ✅ breadcrumb 생성
// ===============================
export const getBreadcrumbFromPath = (
    pathname: string,
    list: MenuItem[]
): BreadcrumbItem[] => {
    const match = breadcrumbMatch(pathname, list);
    if (!match) return [];

    return match.nodes.map((item) => ({
        name: item.name,
        path: item.link,
    }));
};