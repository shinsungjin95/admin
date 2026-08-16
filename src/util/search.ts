
/**
 * 검색 조건 객체를 URL 파라미터용 객체로 변환
 * 빈 값 제거 및 배열 값을 쉼표 문자열로 변환
 *
 * @param {Object} params - 검색 조건 객체
 * @returns {Object} 변환된 검색 파라미터 객체
 */
export const buildSearchParams = (params) => {
    const result = {};

    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            if (value.length) result[key] = value.join(",");
            return;
        }

        if (value !== "" && value !== null && value !== undefined) {
            result[key] = value;
        }
    });

    return result;
};

/**
 * URLSearchParams를 검색 조건 객체로 변환
 * 쉼표가 포함된 문자열 값을 배열로 변환
 *
 * @param {URLSearchParams} searchParams - URL 검색 파라미터
 * @returns {Object} 변환된 검색 조건 객체
 */
export const parseSearchParams = (searchParams) => {
    const params = Object.fromEntries(searchParams);

    Object.keys(params).forEach((key) => {
        if (typeof params[key] === "string" && params[key].includes(",")) {
            params[key] = params[key].split(",");
        }
    });

    return params;
};

/**
 * 폼 데이터 변경을 위한 상태 업데이트 함수 생성
 * checkbox 타입인 경우 선택 여부에 따라 배열 값 추가 또는 제거
 *
 * @param {string} key - 변경할 필드 key
 * @param {*} value - 변경할 값
 * @param {string} type - 입력 필드 타입
 * @param {boolean} checked - checkbox 선택 여부
 * @returns {Function} 폼 데이터 상태 업데이트 함수
 */
export const updateFormData = (key, value, type, checked) => {
    if (type === "checkbox") {
        return (prev) => {
            const list = prev[key] || [];

            return {
                ...prev,
                [key]: checked ? [...list, value] : list.filter((v) => v !== value),
            };
        };
    }

    return (prev) => ({
        ...prev,
        [key]: value,
    });
};

/**
 * 기존 URL 파라미터에 변경 값을 병합
 *
 * @param {URLSearchParams} searchParams - 기존 URL 검색 파라미터
 * @param {Object} updates - 변경할 파라미터 객체
 * @returns {URLSearchParams} 변경된 URL 검색 파라미터
 */
export const updateSearchParams = (searchParams, updates) => {
    const merged = Object.fromEntries(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
        merged[key] = String(value);
    });

    return new URLSearchParams(Object.entries(merged));
};

/**
 * 초기값 객체에서 빈 값 제거
 * URL 파라미터 사용을 위해 모든 값을 문자열로 변환
 *
 * @param {Object} init - 초기값 객체
 * @returns {Object} 빈 값이 제거된 파라미터 객체
 */
export const cleanParams = (init) => {
    return Object.fromEntries(
        Object.entries(init).filter((item) => {
            const initValue = item[1];
            return (
                initValue !== null &&
                initValue !== undefined &&
                (typeof initValue === "string" ? initValue.trim() !== "" : true) &&
                (!Array.isArray(initValue) || initValue.length > 0)
            );
        }).map(([key, val]) => [key, String(val)])
    );
};

/**
 * 기본 데이터와 고정 파라미터를 병합하여 URLSearchParams 생성
 * null, undefined, 빈 문자열인 고정 파라미터 제외
 *
 * @param {Object} data - 기본 파라미터 데이터
 * @param {Object} keyMap - 추가할 고정 파라미터 객체
 * @returns {URLSearchParams} 생성된 URL 검색 파라미터
 */
export const createParams = (
    data,
    keyMap
) => {
    const params = new URLSearchParams(data);

    Object.entries(keyMap).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
            params.set(key, String(value));
        }
    });

    return params;
};