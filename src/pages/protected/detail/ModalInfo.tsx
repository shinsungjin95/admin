import CardSection from "@/components/Layout/CardSection.tsx";
import React, {useEffect} from "react";
import { observer } from "mobx-react";
import { useStore } from "@/store";
import { MODAL_PAYLOAD } from "@/constants/Modal.ts";
import { setToast } from "@/util/toast.ts";
import styled from "styled-components";
import Button from "@components/Button";

const ModalInfo = observer(() => {
    const { modalStore } = useStore();

    const basicTest = () => {
        modalStore.open(
            MODAL_PAYLOAD.BASIC_MODAL({
                props: {
                    confirmText: "확인",
                }
            })
        );
    }

    const multiTest = () => {
        modalStore.open(
            MODAL_PAYLOAD.MULTI_MODAL({
                props: {
                    onConfirm: () => {
                        setToast("success", "완료 되었습니다.");
                    },
                    onCancel: () => {
                        setToast("success", "취소 되었습니다.");
                    },
                },
            })
        );
    }

    const registerTest = () => {
        modalStore.open(
            MODAL_PAYLOAD.REGISTER_MODAL({
                props: {
                    data: "실행 시킨 컴포넌트에서 데이터 전달 {}, [] 모두 가능",
                    onConfirm: (data?: unknown) => {
                        setToast("success", "수정이 완료 되었습니다.");
                        console.log("확인", data);
                    },
                    onCancel: () => {
                        console.log("취소 하고 다음 로직 실행");
                    },
                },
            })
        );
    };

    const confirmTest = () => {
        modalStore.open(
            MODAL_PAYLOAD.BASIC_CONFIRM({
                props: {
                    message: "확인 하시겟습니까?",
                    onConfirm: () => {
                        setToast("success", "확인 되었습니다.");
                    },
                },
            })
        );
    }

    return (
        <CardSection title="모달 사용 예시">
            <ModalInner>
                <Button outlined onClick={basicTest}>
                    기본 모달
                </Button>
                <Button outlined onClick={multiTest}>
                    다중 모달
                </Button>
                <Button outlined onClick={registerTest}>
                    등록 모달
                </Button>
                <Button outlined onClick={confirmTest}>
                    확인 창
                </Button>
            </ModalInner>
        </CardSection>
    );
});

const ModalInner = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
`;

export default ModalInfo;