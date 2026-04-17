import styled from "styled-components";
import { FaDoorOpen } from "react-icons/fa6";
import {Link} from "react-router-dom";

import Button from "@/components/Button/index.jsx";
import {INDEX_PATH} from "@/constants";


const NotFoundPage = () => {
    return(
        <ErrorPageWrapper>
            <ErrorContainer>
                <div className={"error-message"}>
                    <div className={"main-text"}>403</div>
                    <p>오류가 발생했습니다!</p>
                    <span>
                        이용에 불편을 드려 죄송합니다.<br/>
                        접근할 수 없는 페이지입니다.
                    </span>
                    <Link className={"to-home"} to={INDEX_PATH}>
                        <FaDoorOpen size={40} color={"#C63611"}/>
                        <Button>
                            메인 페이지로 돌아가기
                        </Button>
                    </Link>

                </div>
            </ErrorContainer>

        </ErrorPageWrapper>
    )
}
const Reload = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 40px;
    position: absolute;
    bottom: -70px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    border-radius: 18px;
    cursor: pointer;
    p{
        color: #fff;
        font-size: 20px;
        font-weight: 500;
        margin-right: 5px;
    }
`;
const ErrorPageWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background: #fff;
    position: relative;
`;
const ErrorContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .error-message {
        text-align: center;
        display: flex;
        flex-direction: column;
        width: 100%;
        .main-text{
            color: #C63611;
            font-weight: 800;
            font-size: 30px;
        }
        p {
            color: #333;
            font-weight: 500;
            font-size: 22px;
            margin: 20px 0;
        }

        span {
            font-size: 25px;
            line-height: 1.25;
            color: #C63611;
        }
        .to-home{
            margin: 20px 0 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }
    }
`;

export default NotFoundPage;