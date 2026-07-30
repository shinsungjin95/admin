import { createRoot } from "react-dom/client";
import App from "@/App.tsx";
import {getFetchMenu} from "@/util/menu.ts";


const menuPromise = await getFetchMenu();
const initialState = {
    navigation: menuPromise,
};

createRoot(document.getElementById("root") as HTMLElement).render(<App initialState={initialState} />);
