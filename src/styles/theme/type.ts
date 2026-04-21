import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            palette: {
                brand900: string;
                brand700: string;
                brand500: string;
                brand300: string;
                gray400: string;
                gray300: string;
                gray100: string;
                white: string;
                warn: string;
                layoutDark: string;
                layoutBody: string;
            };

            primary: {
                main: string;
                light: string;
            };

            gray: {
                white: string;
                main: string;
                black: string;
            };

            error: {
                main: string;
            };

            layout: {
                headerBG: string;
                sidebarBG: string;
                bodyBG: string;
            };
        };

        fonts: {
            family: string;
            size: string;
            color: string;
        };

        size: {
            headerHeight: string;
            sidebarWidth: string;
        };
    }
}