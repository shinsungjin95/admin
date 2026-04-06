import React, {type ComponentType} from "react";
import styled from "styled-components";
import Button from "@components/Button";
import {observer} from "mobx-react";
import {useStore} from "@/store";
import {ConfirmComponent} from "@components/Modal/style.tsx";

export type ModalContentProps = {
    modalDepth?: number;
    width?: number | string;
    maxHeight?: number | string;
    title?: string;
    closeBtn?: boolean;
    onConfirm?: (data?: unknown) => void;
    onCancel?: (data?: unknown) => void;
};

export type ModalProps = {
    idx?: number;
    type?: string;
    component: React.ComponentType<ModalContentProps>;
    zIndex?: number;
    onConfirm?: (data?: unknown) => void;
    onCancel?: (data?: unknown) => void;
    modalDepth?: number | string;
    width?: number | string;
    maxHeight?: number | string;
    title?: string;
    closeBtn?: boolean;
    modalClassName?: string;
    message?: string;
    cancelText?: string;
    confirmText?: string;
    [key: string]: unknown;
};

export type ModalItem = {
    component?: ComponentType<ModalContentProps>;
    props?: Partial<ModalProps> & {
        onConfirm?: ModalAction;
        onCancel?: ModalAction;
    };
};

export type ModalAction<T = unknown> = (data?: T) => boolean | void;



const Modal: React.FC<ModalProps> = observer(({
                                                  idx,
                                                  component: ContentComponent,
                                                  modalClassName = "",
                                                  ...contentProps
                                              }) => {
    const {
        type,
        width,
        maxHeight,
        title,
        onCancel,
        onConfirm,
        closeBtn,
        ...restContentProps
    } = contentProps;

    const {modalStore} = useStore();

    const runAndClose = (action?: ModalAction, data?: unknown) => {
        if (action) {
            const shouldClose = action(data);
            if (shouldClose === false) return;
        }
        modalStore.close();
    };

    const handleCancel = (data?: unknown) => {
        runAndClose(onCancel, data);
    };

    const handleConfirm = (data?: unknown) => {
        runAndClose(onConfirm, data);
    };


    return (
        <ModalBody className={modalClassName}>
            <div className={"modal-inner"}>
                {
                    type === "CONFIRM" ? (
                        <ConfirmComponent
                            $modalDepth={idx}
                        >
                            <p className={"confirm-message"}>{contentProps.message}</p>
                            <div className={"confirm-btn-wrap"}>
                                <Button outlined size={"sm"} radius={"sm"} onClick={handleCancel}>
                                    {contentProps.cancelText}
                                </Button>
                                <Button size={"sm"} radius={"sm"} onClick={handleConfirm}>
                                    {contentProps.confirmText}
                                </Button>
                            </div>
                        </ConfirmComponent>
                    ) : ContentComponent ? (
                        <ContentComponent
                            {...restContentProps}
                            modalDepth={idx}
                            width={width}
                            maxHeight={maxHeight}
                            title={title}
                            closeBtn={closeBtn}
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                        />
                    ) : null}
            </div>
        </ModalBody>
    );
});

const ModalBody = styled.div<{ $zIndex?: number, $index?: number }>`
    position: fixed;
    inset: 0;
    z-index: ${({$zIndex = 1000}) => $zIndex};
    display: flex;
    align-items: center;
    justify-content: center;
    .modal-inner{
        width: 100%;
        height: 100%;
        position: relative;
    }
`


export default Modal;