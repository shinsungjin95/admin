import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { RouterProvider } from "react-router-dom";

import { AppProviders } from "@/providers/AppProviders";
import router from "@/routes";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { theme } from "@/styles/theme";

type AppProps = {
    initialState: {
        navigation: any[];
    };
};

function App({ initialState }: AppProps) {
    return (
        <AppProviders initialState={initialState}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <RouterProvider router={router} />
            </ThemeProvider>
        </AppProviders>
    );
}

export default App;