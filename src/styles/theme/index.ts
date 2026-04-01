// theme.js
const TEXT_BASE = "#13293D";

const palette = {
    brand900: "#13293D",
    brand700: "#265D7A",
    brand500: "#67C7C6",
    brand300: "#A7E4DB",
    gray400: "#9B9FAF",
    gray300: "#D1D5E0",
    gray100: "#EFF1FA",
    white: "#FFFFFF",
    warn: "#FF0038",

    // layout
    layoutDark: "#13293D",
    layoutBody: "#f9f9fa",
};

export const theme = {
    colors: {
        palette,

        primary: {
            main: palette.brand900,
            light: palette.gray300,
        },

        gray: {
            white: palette.white,
            main: palette.gray400,
            black: palette.brand900,
        },

        error: {
            main: palette.warn,
        },

        layout: {
            headerBG: palette.layoutDark,
            sidebarBG: palette.layoutDark,
            bodyBG: palette.layoutBody,
        },

        // 의미 기반 컬러(여기저기 재사용하기 )
        text: {
            primary: palette.brand900,
            secondary: palette.brand900,
            muted: palette.gray400,
            inverse: palette.white,
            white: palette.gray100,
        },

        bg: {
            default: palette.layoutBody,
            subtle: palette.gray100,
            dark: palette.brand700,
        },

        action: {
            primary: palette.brand900,
            danger: palette.warn,
            disabled: palette.gray100,
        },

        border: {
            default: palette.gray100,
            strong: palette.brand500,
        },
    },

    fonts: {
        family: `"Pretendard", "Noto Sans KR", sans-serif`,
        size: "14px",
        color: TEXT_BASE,
    },

    size: {
        headerHeight: "80px",
        sidebarWidth: "250px",
    },
};
