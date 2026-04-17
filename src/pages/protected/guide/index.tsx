import CardSection from "@components/Layout/CardSection.tsx";
import Button from "@components/Button";
import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import ROUTES from "@/constants/routes.ts";

const Guide = () => {
    return(
        <CardSection title="상세 내용 바로가기">
            <GuideInner>
                <Button>
                    <Link to={`${ROUTES.PROTECTED.SEARCH_TABLE}`}>
                        검색 테이블
                    </Link>
                </Button>
                <Button>
                    <Link to={`${ROUTES.PROTECTED.MODAL}`}>
                        모달
                    </Link>
                </Button>
                <Button>
                    <Link to={`${ROUTES.PROTECTED.ETC}`}>
                        기타
                    </Link>
                </Button>
            </GuideInner>
        </CardSection>
    )
};

const GuideInner = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
`;

export default Guide;