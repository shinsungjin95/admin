import moment from "moment";

export const QUICK_DATE_LIST = [
    { name: "오늘", value: "today" },
    { name: "7일", value: 7 },
    { name: "15일", value: 15 },
    { name: "30일", value: 30 },
];
// 초기 날짜 세팅
export const getActiveQuick = (dateValue, dateKey) => {
    const {fromKey, toKey} = dateKey;
    if (!dateValue?.[fromKey] || !dateValue?.[toKey]) return null;

    const start = moment(dateValue[fromKey]);
    const end = moment(dateValue[toKey]);
    const today = moment();

    // today
    if (start.isSame(today, "day") && end.isSame(today, "day")) {
        return "today";
    }

    const diff = end.diff(start, "day");

    // 과거 기준
    if (end.isSame(today, "day")) {
        if (diff === 7) return 7;
        if (diff === 15) return 15;
        if (diff === 30) return 30;
    }
    return null;
};

// ===== 빠른 날짜 선택 =====
export const getQuickRange = (days, dir, dateKey) => {
    const {fromKey, toKey} = dateKey;
    if (days === "today") {
        return {
            [fromKey]: moment().format("YYYY-MM-DD"),
            [toKey]: moment().format("YYYY-MM-DD"),
        };
    }
    if (dir === "future") {
        return {
            [fromKey]: moment().format("YYYY-MM-DD"),
            [toKey]: moment().add(days, "day").format("YYYY-MM-DD"),
        };
    }
    return {
        [fromKey]: moment().subtract(days, "day").format("YYYY-MM-DD"),
        [toKey]: moment().format("YYYY-MM-DD"),
    };
};


// ===== 인풋 값 =====
export const formatValue = (type, value, dateKey) => {
    const {fromKey, toKey} = dateKey;
    if (type === "single") {
        return value || "";
    }
    if (value[fromKey] && !value[toKey]) {
        return value[fromKey];
    }
    if (value[fromKey] && value[toKey]) {
        return `${value[fromKey]} ~ ${value[toKey]}`;
    }
    return "";
};

// ===== 초기화 =====
export const handleReset = (type, initValue, setValue, dateKey) => {
    const { fromKey, toKey } = dateKey;
    if (type === "range") {
        if (initValue) {
            setValue(initValue);
        } else {
            setValue({ [fromKey]: undefined, [toKey]: undefined });
        }
    } else {
        setValue(undefined);
    }
};