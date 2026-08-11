import styled from "styled-components";
import React, {useState} from "react";
import Input from "@/components/Input";
import {setToast} from "@/util/toast.ts";
import {theme} from "@/styles/theme";
import {observer} from "mobx-react";
import {useStore} from "@/store/index.js";
import {useCookies} from "react-cookie";
import {COOKIE_NAME} from "@/constants";
import {ButtonWrap, NoticeBox} from "@styles/CommonStyle.tsx";
import Button from "@components/Button";
import { useNavigate } from "react-router-dom";


const MemberLogin = observer(() => {
    const {userStore} = useStore();
    const navigate = useNavigate();
    const [passwordState, setPasswordState] = useState("password");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(COOKIE_NAME);


const loginSubmit = async () => {
    const payLoad = chkIdPw();
    if (!payLoad) return;

    try {
        const response = await userStore.setLogin(payLoad);

        const expires = new Date();
        expires.setHours(expires.getHours() + 5);

        setCookie(COOKIE_NAME, response.data.token, {
            path: "/",
            expires,
        });
        navigate("/", { replace: true });

    } catch (e) {
        setToast("warning", e.message);
    }
};
    const chkIdPw = () => {
        if (id === "") {
            setToast("warning", "아이디를 확인해 주세요.")
            return;
        }
        if (password === "") {
            setToast("warning", "비밀번호를 확인해 주세요.")
            return;
        }
        return {
            userId: id,
            password: password
        };
    }
    const logChkPress = async (e) => {
        if (e.key === "Enter") {
            await loginSubmit();
        }
    }
    return(
        <MemberLoginWrap>
            <LoginArea>
                <LoginInputWrap>
                    <Input
                        inputType={"text"}
                        value={id}
                        autoComplete={"userId"}
                        placeholder={"아이디를 입력해 주세요."}
                        onChange={(e) => setId(e.target.value)}
                        onKeyDown={logChkPress}
                    />
                    <Input
                        inputType={passwordState}
                        value={password}
                        typeChange={passwordState}
                        setTypeChange={setPasswordState}
                        onEyes={"on"}
                        autoComplete={"userPassword"}
                        placeholder={"비밀번호를 입력해 주세요."}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={logChkPress}
                    />
                </LoginInputWrap>
                <NoticeBox>
                    * 로그인시 쿠키에 랜덤값을 토큰 저장합니다.
                </NoticeBox>
                <ButtonWrap>
                    <Button fullWidth={true} onClick={loginSubmit}>
                        로그인
                    </Button>
                </ButtonWrap>
            </LoginArea>

        </MemberLoginWrap>
    )
});

const MemberLoginWrap = styled.section`
    width: 100%;
    height: 100vh;
    position: relative;
`;

const LoginArea = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 560px;
`;

const LoginInputWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export default MemberLogin;