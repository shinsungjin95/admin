import {Outlet, useNavigate, useParams} from "react-router-dom";
import Header from "@/components/Header";
import Toast from "@/components/Toast";
import Loading from "@components/Loading";
import {Suspense} from "react";
import LoadingContent from "@components/Loading/LoadingInner.tsx";
import {setGlobalNavigate, setGlobalUrlParams} from "@/util";
import styled from "styled-components";
import {theme} from "@styles/theme";
import ModalController from "@/components/Modal/controller.tsx";
import SideNav from "@components/Header/SideNav.tsx";

const Root = () => {
    const navigate = useNavigate();
    const urlParams = useParams();
    setGlobalNavigate(navigate);
    setGlobalUrlParams(urlParams);
    return (
        <Suspense fallback={<LoadingContent />}>
            <Header/>
            <SideNav />
            <RootWrapper>
                <Outlet/>
            </RootWrapper>
            <Loading />
            <ModalController/>
            <Toast/>
        </Suspense>
    );
};

const RootWrapper = styled.div`
    margin-top: ${theme.size.headerHeight};
    transition: all .3s ease-in-out;
    padding: 40px;
    width: calc(100% - ${theme.size.sidebarWidth});
    position: relative;
    min-height: calc(100vh - ${theme.size.headerHeight});
    margin-left: ${theme.size.sidebarWidth};
    background-color: #eee;
`

export default Root;
