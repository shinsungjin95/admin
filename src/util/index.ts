/** 전역 navigate 보관용 */
let globalNavigate: ((...args: any[]) => any) | null = null;

/**
 * 전역 navigate 함수 저장
 */
export const setGlobalNavigate = (navigate: (...args: any[]) => any): void => {
    globalNavigate = navigate;
};

/**
 * 저장된 전역 navigate 함수 반환
 */
export const getGlobalNavigate = (): (...args: any[]) => any => {
    if (!globalNavigate) {
        throw new Error("Navigator is not set. Ensure Router is initialized.");
    }
    return globalNavigate;
};



/** 전역 URLSearchParams 보관용 */
let globalUrlParams: Readonly<Record<string, string | undefined>> | null = null;

/**
 * 전역 URLSearchParams 저장
 */
export const setGlobalUrlParams = (
    urlParams: Readonly<Record<string, string | undefined>>
) => {
    globalUrlParams = urlParams;
};

/**
 * 저장된 전역 URLSearchParams 반환
 */
export const getGlobalUrlParams = (): Readonly<Record<string, string | undefined>> => {
    if (!globalUrlParams) {
        throw new Error("Navigator is not set. Ensure Router is initialized.");
    }
    return globalUrlParams;
};