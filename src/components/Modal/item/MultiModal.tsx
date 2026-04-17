import styled from "styled-components";
import Button from "@components/Button";
import {Dimmer, ModalHeader, ModalItem, ModalWrapper} from "../style.tsx";
import {MODAL_PAYLOAD} from "@/constants/Modal.ts";
import {setToast} from "@/util/toast.ts";
import {observer} from "mobx-react";
import {useStore} from "@/store";


const MultiModal = observer(({
                                 onConfirm,
                                 onCancel,
                                 width,
                                 maxHeight,
                                 title,
                                 modalDepth,
                             }) => {
    const {modalStore} = useStore();
    return (
        <ModalWrapper
            $modalDepth={modalDepth}
        >
            <Dimmer onClick={onCancel}/>
            <ModalItem
                $width={width}
                $maxHeight={maxHeight}
            >
                <ModalHeader>
                    {
                        title &&
                        <h1 className={"modal-title"}>{title}</h1>
                    }
                </ModalHeader>
                <TestModalWrap>
                    <div className={"inner"}>
                        <p>다중 모달 내용</p>
                        <Button
                            onClick={() => {
                                modalStore.open(
                                    MODAL_PAYLOAD.BASIC_MODAL({
                                        props: {
                                            confirmText: "2번째 모달 확인",
                                            onConfirm: () => {
                                                modalStore.open(
                                                    MODAL_PAYLOAD.BASIC_CONFIRM({
                                                        props: {
                                                            message: "2번째 모달을 확인 하시겟습니까?",
                                                            onConfirm: () => {
                                                                setToast("success", "2번째 모달 확인 되었습니다.");
                                                                onConfirm();
                                                            },
                                                        },
                                                    })
                                                );
                                                return false;
                                            },
                                            onCancel: () => {
                                                setToast("success", "2번째 모달 취소 되었습니다.");
                                            },
                                        },
                                    })
                                );
                            }}
                        >
                            기본 모달 열기
                        </Button>
                    </div>

                    <div className="btn-area">
                        <Button
                            outlined
                            size={"sm"}
                            radius={"sm"}
                            onClick={onCancel}
                        >
                            취소
                        </Button>
                        <Button
                            size={"sm"}
                            radius={"sm"}
                            onClick={onConfirm}
                        >
                            확인
                        </Button>
                    </div>
                </TestModalWrap>
            </ModalItem>
        </ModalWrapper>
    );
});

const TestModalWrap = styled.div`
    padding: 20px;

    .inner {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 15px;

        p {
            margin-bottom: 10px;
        }
    }

    .btn-area {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
`
export default MultiModal;
