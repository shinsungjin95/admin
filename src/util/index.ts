import moment from "moment";




/**
 * 게시글 번호 계산 (역순 정렬 기준)
 * @param {number} total - 전체 게시물 수
 * @param {number} index - 현재 아이템의 인덱스(0부터)
 * @param {number} offset - 현재 페이지 번호(0부터)
 * @param {number} limit - 현재 페이지의 리밋
 * @returns {number} 계산된 번호 (0보다 작으면 0)
 */
export const getOrderNumber = (total, index, offset, limit = 10) => {
    if (isNaN(total) || isNaN(index) || isNaN(offset)) return 0;
    const tableListNum = total - (offset * limit) - index;
    if (tableListNum > 0) {
        return tableListNum;
    }
};

/**
 * 게시글 번호 계산 (오름차순 정렬 기준)
 * @param {number} index - 현재 아이템의 인덱스(0부터)
 * @param {number} offset - 현재 페이지 번호(0부터 시작)
 * @param {number} limit - 페이지당 아이템 개수 (limit)
 * @returns {number} 계산된 번호
 */
export const getOrderNumberAsc = (index, offset, limit = 10) => {
    if (isNaN(index) || isNaN(offset)) return 0;
    return offset * limit + index + 1;
};


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


export const toggleAllCheck = (rows, checkedIds) => {
    const allChecked = rows.length > 0 && rows.every((row) => checkedIds.includes(row.id));

    return allChecked ? [] : rows.map((row) => row.id);
};

export const getDateRange = (days: string | number) => {
    return {
        start: moment().subtract(days, "days").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
    };
};

// 오늘 날짜
export const getToday = () => moment().format("YYYY-MM-DD");