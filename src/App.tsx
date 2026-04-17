import {AppProviders} from "@/providers/AppProviders";
import {ThemeProvider} from "styled-components";
import {RouterProvider} from "react-router-dom";

import router from "@/routes";
import {GlobalStyle} from "@/styles/GlobalStyle";
import {theme} from "@/styles/theme";
import {MENU_LIST} from "@/constants";

function App() {
    const initialState = {
        navigation: MENU_LIST,
    };
    return (
        <AppProviders initialState={initialState}>
            <ThemeProvider theme={theme}>
                <GlobalStyle/>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </AppProviders>
    );
}

export default App;
