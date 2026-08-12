import moment from "moment/moment";

const datePickerInitVal = {
    startDate: moment().subtract(7, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
}


export const CONTENT_INIT_FORM = {
    title: "",
    ...datePickerInitVal,
    offset: 1,
    limit: 10,
};


export const CONTENT_SEARCH_FIELDS = [
    {
        type: "date-picker",
        dateType: "range",
        keyMap: {from: "startDate", to: "endDate"},
        name: "업로드 날짜",
        initialValue: datePickerInitVal,
    },
    {
        type: "input",
        key: "title",
        name: "제목",
        placeholder: "입력해 주세요",
    },
];


export const CONTENT_LIST_COLUMN = [
    { key: "no", header: "No", width: 20 },
    { key: "title", header: "제목", width: 120 },
    { key: "image", header: "이미지", width: 50 },
    { key: "updated_at", header: "등록 날짜", width: 50 },
];