import moment from "moment/moment";


export const EX_LIST_COLUMN = [
    { key: "no", header: "No", width: 70 },
    { key: "exposureStatus", header: "이름", width: 120 },
    { key: "imageCount", header: "아이디", width: 50 },
    { key: "effect", header: "휴대전화", width: 120 },
];


export const datePickerInitVal = {
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
}


export const EXAMPLE_DND_LIST_INIT = [
    {
        value: 1,
        name: "first-item-wrap",
        children: [
            {value: 1, name: "f-item1"},
            {value: 2, name: "f-item2"},
        ],
    },
    {
        value: 2,
        name: "second-item-wrap",
        children: [
            {value: 1, name: "s-item1"},
            {value: 2, name: "s-item2"},
        ],
    },
]


export const SEARCH_FIELDS = [
    {
        type: "input",
        key: "name",
        name: "only-input",
        placeholder: "입력해 주세요",
    },
    {
        type: "textarea",
        key: "info",
        name: "only-textarea",
        placeholder: "입력해 주세요",
    },
    {
        type: "select",
        key: "select",
        name: "only-select",
        placeholder: "선택",
        options: [
            { value: "f1", label: "필터1" },
            { value: "f2", label: "필터2" },
            { value: "f3", label: "필터3" },
        ],
    },
    {
        selectKey: "searchType",
        stringKey: "searchString",
        type: "select-input",
        name: "select-input-mix",
        options: [
            { value: "f1", label: "필터1" },
            { value: "f2", label: "필터2" },
            { value: "f3", label: "필터3" },
        ],
        selectPlaceholder: "선택",
        inputPlaceholder: "입력하세요",
    },
    {
        type: "checkbox",
        key: "check",
        name: "input-checkbox",
        options: [
            { value: "c1", label: "checkbox1" },
            { value: "c2", label: "checkbox2" },
            { value: "c3", label: "checkbox3" },
        ],
    },

    {
        type: "radio",
        key: "radio",
        name: "input-radio",
        options: [
            { value: "r1", label: "radio1" },
            { value: "r2", label: "radio2" },
            { value: "r3", label: "radio3" },
        ],
    },

    {
        type: "date-picker",
        dateType: "range",
        keyMap: {from: "startDate", to: "endDate"},
        name: "range",
        initialValue: datePickerInitVal,
    },

];
export const EX_INIT_FORM = {
    name: "",
    info: "",
    select: null,
    selectKey: null,
    stringKey: "",
    check: [],
    startKey: "",
    endKey: "",
    offset: 1,
    limit: 10,
    ...datePickerInitVal,
};

