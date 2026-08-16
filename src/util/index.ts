import moment from "moment";




/**
 * 게시글 번호를 역순 정렬 기준으로 계산
 *
 * @param {number} total - 전체 게시물 수
 * @param {number} index - 현재 아이템의 인덱스 (0부터 시작)
 * @param {number} offset - 현재 페이지 번호 (0부터 시작)
 * @param {number} limit - 페이지당 아이템 개수
 * @returns {number | undefined} 계산된 게시글 번호
 */
export const getOrderNumber = (total, index, offset, limit = 10) => {
    if (isNaN(total) || isNaN(index) || isNaN(offset)) return 0;
    const tableListNum = total - (offset * limit) - index;
    if (tableListNum > 0) {
        return tableListNum;
    }
};

/**
 * 게시글 번호를 오름차순 정렬 기준으로 계산
 *
 * @param {number} index - 현재 아이템의 인덱스 (0부터 시작)
 * @param {number} offset - 현재 페이지 번호 (0부터 시작)
 * @param {number} limit - 페이지당 아이템 개수
 * @returns {number} 계산된 게시글 번호
 */
export const getOrderNumberAsc = (index, offset, limit = 10) => {
    if (isNaN(index) || isNaN(offset)) return 0;
    return offset * limit + index + 1;
};


/** 전역에서 사용할 navigate 함수 */
let globalNavigate: ((...args: any[]) => any) | null = null;

/**
 * 전역에서 사용할 navigate 함수를 저장
 *
 * @param {Function} navigate - React Router의 navigate 함수
 * @returns {void}
 */
export const setGlobalNavigate = (navigate: (...args: any[]) => any): void => {
    globalNavigate = navigate;
};

/**
 * 저장된 전역 navigate 함수를 반환
 *
 * @returns {Function} 저장된 navigate 함수
 * @throws navigate 함수가 설정되지 않은 경우 에러를 발생시킵니다.
 */
export const getGlobalNavigate = (): (...args: any[]) => any => {
    if (!globalNavigate) {
        throw new Error("Navigator is not set. Ensure Router is initialized.");
    }
    return globalNavigate;
};

/** 전역에서 사용할 URL 파라미터 */
let globalUrlParams: Readonly<Record<string, string | undefined>> | null = null;

/**
 * 전역에서 사용할 URL 파라미터를 저장
 *
 * @param {Readonly<Record<string, string | undefined>>} urlParams - 저장할 URL 파라미터
 * @returns {void}
 */
export const setGlobalUrlParams = (
    urlParams: Readonly<Record<string, string | undefined>>
) => {
    globalUrlParams = urlParams;
};

/**
 * 저장된 전역 URL 파라미터를 반환
 *
 * @returns {Readonly<Record<string, string | undefined>>} 저장된 URL 파라미터
 * @throws URL 파라미터가 설정되지 않은 경우 에러를 발생시킵니다.
 */
export const getGlobalUrlParams = (): Readonly<Record<string, string | undefined>> => {
    if (!globalUrlParams) {
        throw new Error("Navigator is not set. Ensure Router is initialized.");
    }
    return globalUrlParams;
};

/**
 * 목록의 전체 선택 상태를 토글
 * 모든 항목이 선택된 경우 선택을 해제,
 * 하나라도 선택되지 않은 경우 전체 항목을 선택
 *
 * @param {Array} rows - 전체 목록 데이터
 * @param {Array} checkedIds - 현재 선택된 아이템 ID 목록
 * @returns {Array} 변경된 선택 아이템 ID 목록
 */
export const toggleAllCheck = (rows, checkedIds) => {
    const allChecked = rows.length > 0 && rows.every((row) => checkedIds.includes(row.id));

    return allChecked ? [] : rows.map((row) => row.id);
};

/**
 * 오늘을 기준으로 지정한 일수만큼 이전 날짜부터 오늘까지의 날짜 범위를 반환
 *
 * @param {string | number} days - 오늘로부터 이전으로 계산할 일수
 * @returns {{ start: string, end: string }} 시작일과 종료일 (YYYY-MM-DD)
 */
export const getDateRange = (days: string | number) => {
    return {
        start: moment().subtract(days, "days").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
    };
};

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 *
 * @returns {string} 오늘 날짜
 */
export const getToday = () => moment().format("YYYY-MM-DD");