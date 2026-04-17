import {createGlobalStyle} from "styled-components";
import {theme} from "./theme";
import {reset} from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    *, *::before, *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: ${theme.fonts.family};
        font-size: ${theme.fonts.size};
        color: ${theme.fonts.color};
        background: ${theme.colors.layout.bodyBG};
        scrollbar-gutter: stable;
    }

    li::marker {
        content: "";
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    input,
    button,
    select,
    textarea {
        font-family: inherit;
        font-size: inherit;
    }

    
    /* ================================
        FORM BASE
    ================================= */
    select,
    textarea {
        width: 100%;
        border-radius: 8px;
        border: 1px solid ${theme.colors.palette.gray300};
        outline: none;

        &:focus {
            border-color: ${({theme}) => theme.colors.gray.black};
        }
    }

    select {
        height: 36px;
        padding: 0 14px;
    }

    textarea {
        padding: 10px 14px;
    }
    
    .custom-select {

        .react-select__control {
            height: 34px;
            border-radius: 6px;
            border: 1px solid ${({theme}) => theme.colors.palette.gray300};
            box-shadow: none;
            font-size: 14px;
            min-width: 100px;

            &:hover {
                border-color: inherit;
                background: ${({theme}) => theme.colors.palette.gray100};
            }
        }

        .react-select__value-container {
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
            width: 100%;
            height: 100%;
            padding: 0 14px;
        }

        .react-select__indicator-separator {
            display: none;
        }

        .react-select__indicator {
            padding: 0 14px 0 0;
            color: #000;
        }

        .react-select__single-value,
        .react-select__input-container {
            margin: 0;
        }

        .react-select__indicators {
            height: 100%;
        }

        .react-select__option--is-selected {
            background: ${({theme}) => theme.colors.primary.main};
        }

        .react-select__option--is-focused {
            background: ${({theme}) => theme.colors.primary.light};
        }
    }
`;
