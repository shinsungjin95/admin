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
    },

    fonts: {
        family: `"Pretendard", "Noto Sans KR", sans-serif`,
        size: "14px",
        color: TEXT_BASE,
    },

    size: {
        headerHeight: "96px",
        sidebarWidth: "250px",
    },
};
