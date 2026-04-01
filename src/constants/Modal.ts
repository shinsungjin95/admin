import TestModal from "@components/Modal/item/TestModal.tsx";

const MODAL_TYPE = {
    MODAL: "MODAL",
    CONFIRM: "CONFIRM",
};
export const MODAL_PAYLOAD = {
    TEST_MODAL: ({props}) => ({
        component: TestModal,
        props: {
            type: MODAL_TYPE.MODAL,
            width: 801,
            title: "수정하기",
            confirmText: "수정",
            cancelText: "취소",
            closeBtn: true,
            ...props,
        },
    }),
    TEST_CONFIRM: ({props}) => ({
        props: {
            type: MODAL_TYPE.CONFIRM,
            width: 801,
            message: "수정하시겟습니까?",
            confirmText: "확인",
            closeBtn: true,
            cancelText: "취소",
            ...props,
        },
    }),
}