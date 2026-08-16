import { toast } from "react-toastify";
import type { ToastOptions } from "react-toastify";
import { FaFileCircleCheck } from "react-icons/fa6";
import { MdSmsFailed } from "react-icons/md";
import { BiSolidMessageError } from "react-icons/bi";
import React from "react";
import { TOAST_OPTIONS } from "@/constants";

type ToastType = "success" | "warning" | "error";

/**
 * 타입에 따른 아이콘과 옵션을 적용한 Toast 메시지 출력
 *
 * @param {ToastType} type - Toast 메시지 타입
 * @param {string} text - 출력할 메시지
 * @param {ToastOptions} options - 추가 Toast 옵션
 * @returns {void}
 */
export const setToast = (
    type: ToastType,
    text: string,
    options: ToastOptions = {}
) => {
    if (!text) return;

    let icon: ToastOptions["icon"] = false;

    switch (type) {
        case "success":
            icon = React.createElement(FaFileCircleCheck) as ToastOptions["icon"];
            break;
        case "warning":
            icon = React.createElement(MdSmsFailed) as ToastOptions["icon"];
            break;
        case "error":
            icon = React.createElement(BiSolidMessageError) as ToastOptions["icon"];
            break;
    }

    const toastMap = {
        success: toast.success,
        warning: toast.warning,
        error: toast.error,
    };

    const toastItems = toastMap[type] || toast;

    const finalOptions: ToastOptions = {
        ...(TOAST_OPTIONS as ToastOptions),
        className: `toast-${type}`,
        icon,
        ...options,
    };

    toastItems(text, finalOptions);
};