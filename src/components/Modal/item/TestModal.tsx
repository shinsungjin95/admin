import {observer} from "mobx-react";
import styled from "styled-components";
import {MODAL_PAYLOAD} from "@/constants/Modal.ts";
import {useStore} from "@/store";
import Button from "@components/Button";
import React, {useState} from "react";
import {setToast} from "@/util/toast.ts";

const TestModal = observer(({ onConfirm, onCancel, data }) => {
    const {modalStore} = useStore();
    const [input, setInput] = useState<number | string>("")
    console.log(data, "data")
    return (
        <TestModalWrap>
            <div className={"inner"}>
                <p>테스트 모달 안에 내용</p>
                <div className={"input-area"}>
                    <input
                        type={"text"}
                        value={input}
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
                    onClick={() => {
                        // if () {
                        //     setToast("warning", "현재 작성 중에 있습니다.");
                        //     return false;
                        // }
                        return onCancel(input !== "");
                    }}
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
                            MODAL_PAYLOAD.TEST_CONFIRM({
                                props: {
                                    message: `${input} 값으로 수정 하시겟습니까?`,
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
    );
});
const TestModalWrap = styled.div`
    .inner{
        text-align: center;
        padding: 30px;
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
export default TestModal;
