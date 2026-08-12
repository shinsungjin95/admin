

import BasicModal from "@components/Modal/item/BasicModal.tsx";
import MultiModal from "@components/Modal/item/MultiModal.tsx";
import RegisterModal from "@components/Modal/item/RegisterModal.tsx";
import MenuSettingModal from "@components/Modal/item/MenuSettingModal.tsx";
import ImagePreviewModal from "@/components/Modal/item/ImagePreviewModal";


const MODAL_TYPE = {
    MODAL: "MODAL",
    CONFIRM: "CONFIRM",
};
export const MODAL_PAYLOAD = {
    BASIC_MODAL: ({props}) => ({
        component: BasicModal,
        props: {
            type: MODAL_TYPE.MODAL,
            width: 500,
            title: "기본 모달 테스트",
            closeBtn: true,
            ...props,
        },
    }),
    MULTI_MODAL: ({props}) => ({
        component: MultiModal,
        props: {
            type: MODAL_TYPE.MODAL,
            width: 600,
            title: "기본 모달 테스트",
            closeBtn: true,
            ...props,
        },
    }),
    REGISTER_MODAL: ({props}) => ({
        component: RegisterModal,
        props: {
            type: MODAL_TYPE.MODAL,
            width: 801,
            title: "등록 모달",
            closeBtn: true,
            ...props,
        },
    }),
    MENU_SETTING_MODAL: ({props}) => ({
        component: MenuSettingModal,
        props: {
            type: MODAL_TYPE.MODAL,
            width: 450,
            closeBtn: true,
            ...props,
        },
    }),
    IMAGE_PREVIEW_MODAL: ({props}) => ({
        component: ImagePreviewModal,
        props: {
            width: 450,
            closeBtn: true,
            ...props,
        },
    }),
    BASIC_CONFIRM: ({props}) => ({
        props: {
            type: MODAL_TYPE.CONFIRM,
            message: "수정하시겟습니까?",
            confirmText: "확인",
            width: 450,
            closeBtn: true,
            cancelText: "취소",
            ...props,
        },
    }),
}