import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { IoCloseOutline } from "react-icons/io5";
import Button from "@components/Button";

export type ModalProps = {
    idx?: number;
    type?: string;
    component: React.ComponentType<any>;
    zIndex?: number;
    onConfirm?: (data?: any) => void;
    onCancel?: (data?: any) => void;
    width?: number | string;
    maxHeight?: number | string;
    title?: string;
    closeBtn?: boolean;
    modalClassName?: string;
    [key: string]: any;
};

const Modal: React.FC<ModalProps> = ({
                                         idx,
                                         component: ContentComponent,
                                         zIndex = 1000,
                                         modalClassName = "",
                                         onConfirm,
                                         onCancel,
                                         ...contentProps
                                     }) => {

    const {type, width, maxHeight, title, closeBtn, ...restContentProps } = contentProps;
    console.log(restContentProps)
    return (
        <ModalBody className={modalClassName}>
            <Dimmer $zIndex={zIndex} $index={idx} onClick={onCancel}  />
            <ModalWrapper
                $type={type}
                $width={width}
                $maxHeight={maxHeight}
                onClick={(e) => e.stopPropagation()}
            >
                {
                    title&&
                    <h1 className={"modal-title"}>{title}</h1>
                }
                {
                    closeBtn &&
                    <div
                        className={"modal-close-wrap"}
                        onClick={onCancel}>
                        <IoCloseOutline
                            color={`${type === "CONFIRM" ? theme.colors.palette.brand900: theme.colors.palette.white}`}
                            size={24}
                        />
                    </div>
                }
                <div className={"modal-inner"}>
                    {
                        type === "CONFIRM" ? (
                            <>
                                <p className={"confirm-message"}>{contentProps.message}</p>
                                <div className={"confirm-btn-wrap"}>
                                    <Button outlined size={"sm"} radius={"sm"} onClick={onCancel}>
                                        {contentProps.cancelText}
                                    </Button>
                                    <Button size={"sm"} radius={"sm"} onClick={onConfirm}>
                                        {contentProps.confirmText}
                                    </Button>
                                </div>
                            </>
                        ) : ContentComponent ? (
                            <ContentComponent
                                {...restContentProps}
                                modalDepth={idx}
                                onConfirm={onConfirm}
                                onCancel={onCancel}
                            />
                        ) : null}
                </div>
            </ModalWrapper>
        </ModalBody>
    );
};

const ModalBody= styled.div<{ $zIndex?: number, $index?: number }>`
    position: fixed;
    inset: 0;
    z-index: ${({ $zIndex = 1000 }) => $zIndex};
    display: flex;
    align-items: center;
    justify-content: center;
`


const Dimmer = styled.div<{ $zIndex?: number, $index?: number }>`
    width: 100%;
    height: 100%;
    background: ${({ theme }) => `${theme.colors.palette.brand900}66`};
    opacity: ${({ $index }) => {
        if ($index === 0) return 1;
        return 0;
    }};
`;

const ModalWrapper = styled.div<{ $width?: number | string, $maxHeight?: number | string, $type?:  string }>`
    background: ${theme.colors.gray.white};
    border-radius: 12px;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.3);
    width: ${({ $width,$type }) => {
        if (!$width) return "100%";
        if ($type === "CONFIRM") return "auto";
        return typeof $width === "number" ? `${$width}px` : $width;
    }};
    max-width: ${({ $width, $type }) => {
        if ($type === "CONFIRM") return "none";
        if (!$width) return "520px";
        return typeof $width === "number" ? `${$width}px` : $width;
    }};
    min-width: ${({ $type }) => {
        if ($type === "CONFIRM") return "320px";
        return "none";
    }};

    .modal-inner{
        padding: ${({ $type }) => {
            if ($type === "CONFIRM") return "32px 20px 32px";
            return "20px";
        }};
        min-height: ${({ $type }) => {
            if ($type === "CONFIRM") return "135px";
        }};

        display: ${({ $type }) => {
            if ($type === "CONFIRM") return "flex";
            return "block";
        }};
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        .confirm-message{
            font-weight: 500;
            font-size: 15px;
            line-height: 22px;
            color: ${theme.colors.palette.layoutDark};
            letter-spacing: -0.01em;
            text-align: center;
            white-space: pre-wrap;
        } 
        .confirm-btn-wrap{
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
    }
    .modal-title{
        width: 100%;
        background-color: ${theme.colors.palette.brand700};
        text-align: center;
        padding: 16px 20px;
        color: ${theme.colors.palette.white};
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.16px;
    }
    .modal-close-wrap{
        position: absolute;
        right: 24px;
        top: 16px;
        cursor: pointer;
    }
`;

export default Modal;