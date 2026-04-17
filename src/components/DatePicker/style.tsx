import styled from "styled-components";
import {theme} from "@/styles/theme";

export const DatePickerArea = styled.div`
    position: relative;
`;
export const DateInputWrap = styled.div`
    background-color: ${theme.colors.palette.white};
    width: 300px;
    position: relative;

    .reset-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        cursor: pointer;

        svg {
            width: 100%;
            height: 100%;
        }
    }
`;

export const DatePickerWrap = styled.div`
    display: flex;
    position: absolute;
    top: 110%;
    left: 0;
    background: ${theme.colors.palette.white};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    opacity: 0;
    transform: translateY(10px);
    pointer-events: none;
    transition: all 0.2s ease;
    z-index: 100;
    border: 1px solid ${theme.colors.palette.gray400};

    &.open {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
    }

    .quick-area {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 10px;
        gap: 8px;

        .quick-list {
            padding: 8px 5px;
            border-radius: 5px;
            cursor: pointer;
            white-space: nowrap;
            text-align: center;

            &.active {
                background-color: ${theme.colors.palette.brand700};
                color: ${theme.colors.palette.white};
            }
        }
    }

    .rdp-root {
        padding: 10px;
        border-left: 1px solid ${theme.colors.palette.gray400};

        .rdp-months {
            display: flex;
            gap: 16px;
            flex-wrap: nowrap;
        }
    }


    .hover-range {
        background-color: #f0f0ff;
    }

    .rdp-range_end,
    .rdp-range_start {
        & .rdp-day_button {
            background-color: ${theme.colors.palette.brand500};
        }
    }
    .rdp-selected{
        .rdp-day_button{
            border-color: ${theme.colors.palette.brand500};
        }
    }
    .rdp-today:not(.rdp-outside) {
        color: ${theme.colors.palette.brand500};
    }
    .rdp-chevron{
        fill: ${theme.colors.palette.brand500};
    }
    .hover-end {
        background-color: ${theme.colors.palette.brand500};
        color: white;
        border-radius: 50%;
    }

    th {
        width: auto;
        padding: 10px 0;
    }

    td {
        padding: 0;
        border: none;

        &.rdp-range_middle {
            background-color: #f0f0ff;
        }
    }

`;
