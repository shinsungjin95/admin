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

const Root = () => {
    const navigate = useNavigate();
    const urlParams = useParams();
    setGlobalNavigate(navigate);
    setGlobalUrlParams(urlParams);
    return (
        <Suspense fallback={<LoadingContent />}>
            <Header/>
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
`

export default Root;
