import { toast } from "react-toastify";
import type { ToastOptions } from "react-toastify";
import { FaFileCircleCheck } from "react-icons/fa6";
import { MdSmsFailed } from "react-icons/md";
import { BiSolidMessageError } from "react-icons/bi";
import React from "react";
import { TOAST_OPTIONS } from "@/constants";

type ToastType = "success" | "warning" | "error";

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