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
                    <Button as={Link} to={"https://github.com/shinsungjin95/admin"} target="_blank" rel="noopener noreferrer">
                        project git hub
                    </Button>
                </GuideInner>
            </CardSection>
            <CardSection title="홈페이지 메뉴 구성">
                <GuideInner>
                    <Button as={Link} to={ROUTES.PROTECTED.SEARCH_TABLE}>
                       메뉴 세팅
                    </Button>
                </GuideInner>
            </CardSection>
            <CardSection title="컴포넌트 상세">
                <GuideInner>
                    <Button as={Link} to={ROUTES.PROTECTED.SEARCH_TABLE}>
                        검색 테이블
                    </Button>
                    <Button as={Link} to={`${ROUTES.PROTECTED.MODAL}`}>
                        모달
                    </Button>
                    <Button as={Link} to={`${ROUTES.PROTECTED.ETC}`}>
                        기타
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