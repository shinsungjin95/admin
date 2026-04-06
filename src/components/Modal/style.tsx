import styled from "styled-components";
import {theme} from "@styles/theme";

export const Dimmer = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
`;
export const ModalHeader = styled.div`
    position: relative;
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
`

export const ModalWrapper = styled.div<{ $modalDepth?: number | string, }>`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: ${({ $modalDepth }) => {
        if (typeof $modalDepth === "number") {
            return `${$modalDepth + 1}`;
        }
        return `${parseInt($modalDepth ?? "0") + 1}`;
    }};
`;

export const ConfirmComponent = styled.div<{ $modalDepth?: number | string, }>`
    background-color: #fff;
    width: 320px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.3);
    padding: 32px 20px 32px;
    min-height: 135px;
    display: flex;
    align-content: center;
    flex-direction: column;
    justify-content: space-between;
    z-index: ${({ $modalDepth }) => {
        if (typeof $modalDepth === "number") {
            return `${$modalDepth + 1}`;
        }
        return `${parseInt($modalDepth ?? "0") + 1}`;
    }};
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
`



export const ModalItem = styled.div<{ $width?: number | string, $maxHeight?: number | string, $type?:  string }>`
    position: relative;
    z-index: 1;
    border-radius: 12px;
    overflow: hidden;
    background: ${theme.colors.gray.white};
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.3);
    width: ${({ $width }) => {
        if (!$width) return "100%";
        return typeof $width === "number" ? `${$width}px` : $width;
    }};
    max-width: ${({ $width }) => {
        if (!$width) return "520px";
        return typeof $width === "number" ? `${$width}px` : $width;
    }};
    
`