export const BANNER_CONFIG_OPTIONS = {
    effect: [
        {value: "slide", label: "Slide"},
        {value: "fade", label: "Fade"},
    ],

    navigation: [
        {value: true, label: "노출"},
        {value: false, label: "비노출"},
    ],

    pagination: [
        {value: true, label: "노출"},
        {value: false, label: "비노출"},
    ],

    paginationType: [
        {value: "bullet", label: "Bullet"},
        {value: "progress", label: "Progress"},
        {value: "fraction", label: "Fraction"},
    ],

    paginationPosition: [
        {value: "bottom-left", label: "왼쪽"},
        {value: "bottom-center", label: "가운데"},
        {value: "bottom-right", label: "오른쪽"},
    ],

    autoplay: [
        {value: true, label: "활성"},
        {value: false, label: "비활성"},
    ],

    autoplayDelay: [
        {value: 1500, label: "1.5초"},
        {value: 2000, label: "2초"},
        {value: 2500, label: "2.5초"},
    ],
};


export const PAGINATION_TYPE_MAP = {
    bullet: "bullets",
    progress: "progressbar",
    fraction: "fraction",
};