import {Outlet} from "react-router-dom";
import Toast from "@/components/Toast";
import {Suspense} from "react";
import LoadingContent from "@components/Loading/LoadingInner.tsx";
import Loading from "@/components/Loading/index.jsx";
import styled from "styled-components";
import ModalController from "@/components/Modal/controller";

const LoginRoot = () => {
    return (
        <Suspense fallback={<LoadingContent />}>
            <LoginRootContainer>
                <Outlet/>
            </LoginRootContainer>
            <Toast/>
            <Loading />
            <ModalController/>
        </Suspense>
    );
};
const LoginRootContainer = styled.div`
    height: 100vh;
`
export default LoginRoot;
