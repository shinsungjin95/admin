import CardSection from "@/components/Layout/CardSection.tsx";
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "@/store";
import { MODAL_PAYLOAD } from "@/constants/Modal.ts";
import { setToast } from "@/util/toast.ts";

const Home = observer(() => {
    const { modalStore } = useStore();

    const ModalTest = () => {
        modalStore.open(
            MODAL_PAYLOAD.TEST_MODAL({
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

    return (
        <CardSection title="메인 페이지">
            <div onClick={ModalTest}>모달테스트</div>
        </CardSection>
    );
});

export default Home;