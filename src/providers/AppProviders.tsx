// 기능적 전역 provider 묶음
// CookiesProvider
// MobX store
// Auth, Query 등을 한 번에 관리
import {StoreProvider} from "@/store";
import {CookiesProvider} from "react-cookie";
import type {ReactNode} from "react";


type ProviderProps = {
    children: ReactNode;
    initialState?: Record<string, unknown>;
};
export function AppProviders({children, initialState}: ProviderProps) {
    return (
        <CookiesProvider>
            <StoreProvider initialState={initialState}>{children}</StoreProvider>
        </CookiesProvider>
    );
}
