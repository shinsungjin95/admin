import React from "react";
import { ToastContainer } from "react-toastify";
import type { ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TOAST_OPTIONS } from "@/constants";
import styled from "styled-components";

const Toast = () => {
    return <StyledToast {...(TOAST_OPTIONS as ToastContainerProps)} />;
};

const StyledToast = styled(ToastContainer)`
    font-size: 15px;
    font-weight: 500;
    .Toastify__toast{
        gap: 10px;
        min-height: 60px;
        padding: 20px;
        cursor: pointer;
        .Toastify__toast-icon {
            width: 22px;
            height: 22px;
            flex-shrink: 0;
            margin-right: 0;
            svg {
                width: 100%;
                height: 100%;
            }
        }
    }



    .toast-success {
        border: 1px solid #A8E6CF;
        background: linear-gradient(0deg, rgba(168, 230, 207, 0.16) 0%, rgba(168, 230, 207, 0.16) 100%), rgba(255, 255, 255, 0.95);
        color: #3A7D6A;
    }

    .toast-error {
        border: 1px solid #F6A6A1;
        background: linear-gradient(0deg, rgba(246, 166, 161, 0.18) 0%, rgba(246, 166, 161, 0.18) 100%), rgba(255, 255, 255, 0.92);
        color: #C0392B;
    }

    .toast-warning {
        border: 1px solid #FBE3B5;
        background: linear-gradient(0deg, rgba(251, 227, 181, 0.16) 0%, rgba(251, 227, 181, 0.16) 100%), rgba(255, 255, 255, 0.95);
        color: #8A5A00;
    }
`;

export default Toast;