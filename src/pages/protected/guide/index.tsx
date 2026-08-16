import CardSection from "@components/Layout/CardSection.tsx";
import Button from "@components/Button";
import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import ROUTES from "@/constants/routes.ts";

const Guide = () => {
    return(
        <>
            <CardSection title="프로젝트 아키텍처 및 가이드">
                <GuideInner>
                    <Button as={Link} outlined to={"https://github.com/shinsungjin95/admin"} target="_blank" rel="noopener noreferrer">
                        project git hub
                    </Button>
                </GuideInner>
            </CardSection>
            <CardSection title="프로젝트 API 구성 아키텍처 및 가이드(Node)">
                <GuideInner>
                    <Button as={Link} outlined to={"https://github.com/shinsungjin95/cms-api"} target="_blank" rel="noopener noreferrer">
                        project cms-api git hub
                    </Button>
                </GuideInner>
            </CardSection>
            <CardSection title="홈페이지 메뉴 구성">
                <GuideInner>
                    <Button as={Link} to={ROUTES.PROTECTED.HOME_PAGE_MENU}>
                       메뉴 세팅
                    </Button>
                    <Button as={Link} to={ROUTES.PROTECTED.HOME_PAGE_BANNER}>
                       배너 세팅
                    </Button>
                </GuideInner>
            </CardSection>
        </>
    )
};

const GuideInner = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
`;

export default Guide;