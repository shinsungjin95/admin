import styled from "styled-components";
import {theme} from "@/styles/theme";
const inputCheckTheme = {
    checkStyle: {
        size: "18px",
        font: "14px",
        weight: "400",
        default: `${theme.colors.palette.gray400}`,
        active: `${theme.colors.primary.main}`,
        activeChecked: {
            width: "5px",
            height: "10px",
        },
        activeRadio: {
            size: "8px",
        }
    },
}
export const InputWrapper = styled.div<{ $typeName: string; $height?: string | null; }>`
    ${({$typeName, $height}) => ($typeName === "text" || $typeName === "password") &&
        `
            display: flex;
            align-items: center;
            width: 100%;
            height: ${$height ? `${$height}` : `36px`};
            border: 1px solid ${theme.colors.palette.gray300};
            border-radius: 4px;
            padding: 0 12px;
            background: ${theme.colors.palette.white};
            &:focus-within {
                border-color: ${theme.colors.palette.brand900} !important;
            }
        `
    }

    input {
        position: relative;
        flex: 1;
        border: none;
        outline: none;
        height: 100%;
        color: ${theme.colors.palette.brand900};
        font-size: 14px;
        font-weight: 400;
        background: #fff;
        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 1000px #fff inset !important;
            -webkit-text-fill-color: #000 !important;
            transition: background-color 9999s ease-in-out 0s;
        }
        &::placeholder {
            color: ${theme.colors.palette.gray400};
        }
    }


    /* 인풋 체크 영역 */
    label {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #000;
        gap: 5px;
        cursor: pointer;
    }
    input[type="checkbox"], input[type="radio"]{
        flex: 0 0 ${inputCheckTheme.checkStyle.size};
        flex-shrink: 0;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: ${inputCheckTheme.checkStyle.size};
        height: ${inputCheckTheme.checkStyle.size};
        border: 1px solid ${inputCheckTheme.checkStyle.default};
        position: relative;
        padding: 0;
        margin: 0;
        cursor: pointer;
        background-color: ${theme.colors.palette.white};
        &:checked {
            border-color: ${inputCheckTheme.checkStyle.active};
            background-color:${theme.colors.palette.white};
            &::after{
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(45deg);
            }
        }
    }
    input[type="radio"] {
        border-radius: 50%;
    }
    input[type="checkbox"] {
        border-radius: 3px;
    }
    input[type="checkbox"]:checked::after {
        width: ${inputCheckTheme.checkStyle.activeChecked.width};
        height: ${inputCheckTheme.checkStyle.activeChecked.height};
        border: solid ${inputCheckTheme.checkStyle.active};
        border-width: 0 2px 2px 0;
    }
    input[type="radio"]:checked::after {
        width: ${inputCheckTheme.checkStyle.activeRadio.size};
        height: ${inputCheckTheme.checkStyle.activeRadio.size};
        background-color: ${inputCheckTheme.checkStyle.active};
        border-radius: 50%;
    }
`;