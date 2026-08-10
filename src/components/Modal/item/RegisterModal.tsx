import {observer} from "mobx-react";
import styled from "styled-components";
import {MODAL_PAYLOAD} from "@/constants/Modal.ts";
import {useStore} from "@/store";
import Button from "@components/Button";
import React, {useState} from "react";
import {setToast} from "@/util/toast.ts";
import {Dimmer, ModalHeader, ModalItem, ModalWrapper} from "../style.tsx";
import {IoCloseOutline} from "react-icons/io5";
import {theme} from "@styles/theme";
import Input from "@components/Input";

const RegisterModal = observer(({ onConfirm, onCancel, width, maxHeight, title, closeBtn, modalDepth, data }) => {
    const {modalStore} = useStore();
    const [input, setInput] = useState<number | string>("");

    const closeFunc = () => {
        if (input !== "") {
            setToast("warning", "현재 작성 중에 있습니다.");
            return false;
        }
        onCancel();
    }

    return (
        <ModalWrapper
            $modalDepth={modalDepth}
        >
            <Dimmer onClick={closeFunc} />
            <ModalItem
                $width={width}
                $maxHeight={maxHeight}
            >
                <ModalHeader>
                    {
                        title &&
                        <h1 className={"modal-title"}>{title}</h1>
                    }
                    {
                        closeBtn &&
                        <div
                            className={"modal-close-wrap"}
                            onClick={closeFunc}>
                            <IoCloseOutline
                                color={`${theme.colors.palette.white}`}
                                size={24}
                            />
                        </div>
                    }
                </ModalHeader>
                <TestModalWrap>
                    <div className={"inner"}>
                        <p>테스트 모달 안에 내용</p>
                        <div className={"input-area"}>
                            <Input
                                inputType={"text"}
                                value={input}
                                placeholder={"텍스트를 입력해 주세요."}
                                onChange={(e) => {
                                    setInput(e.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <div className="btn-area">
                        <Button
                            outlined
                            size={"sm"}
                            radius={"sm"}
                            onClick={closeFunc}
                        >
                            취소
                        </Button>
                        <Button
                            size={"sm"}
                            radius={"sm"}
                            onClick={() => {
                                if(input === ""){
                                    setToast("warning", "입력후 이용해 주세요.");
                                    return;
                                }
                                modalStore.open(
                                    MODAL_PAYLOAD.BASIC_CONFIRM({
                                        props: {
                                            message: `${input} 값으로 입력 하시겟습니까?`,
                                            onConfirm: () => {
                                                onConfirm({ value: "컨펌창 확인후 실행 시킨 컴포넌트에 데이터 전달" });
                                            },
                                        },
                                    })
                                );
                            }}
                        >
                            수정
                        </Button>
                    </div>
                </TestModalWrap>
            </ModalItem>
        </ModalWrapper>
    );
});
const TestModalWrap = styled.div`
    padding: 20px;
    .inner{
        text-align: center;
        padding: 15px;
        p{
            margin-bottom: 10px;
        }
    }
    .btn-area{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
`
export default RegisterModal;
