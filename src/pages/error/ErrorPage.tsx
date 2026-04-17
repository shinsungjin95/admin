import styled from "styled-components";
import { FaRegSadTear } from "react-icons/fa";
import {useSearchParams} from "react-router-dom";
const ErrorPage = () => {

    const [searchParams] = useSearchParams();

    const status = searchParams.get("status");

    return(
        <ErrorPageWrapper>
            <ErrorContainer>
                <div className={"error-message"}>
                    <FaRegSadTear size={80} color={"#C63611"}/>
                    <p>오류가 발생했습니다!</p>
                    {
                        status && status === "401" ?
                            <span>
                            로그인 정보가 만료되었습니다.<br/>다시 로그인해주세요.
                        </span>
                            :
                            <span>
                            이용에 불편을 드려 죄송합니다.<br/>
                            동일한 문제가 지속될 경우 관리자에게 문의 부탁드립니다.
                        </span>
                    }
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
    }
`;

export default ErrorPage;