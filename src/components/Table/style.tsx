import styled from "styled-components";
import {theme} from "@styles/theme";

export const Table = styled.table<{ $type: string }>`
    width: 100%;
    table-layout: fixed;

    th, td {
        vertical-align: middle;
    }

    ${({$type}) => {
        if ($type === "list") {
            return `
                th {
                    font-weight: 500;
                    background: ${theme.colors.palette.gray400};
                    font-size: 13px;
                    height: 44px;
                }

                td {
                    padding: 20px 0;
                    border-bottom: 1px solid ${theme.colors.palette.gray100};
                }

                button {
                    margin: 0 auto;
                }
            `;
        }

        if ($type === "form") {
            return `
                border-top: 1px solid #dedcec;

                th,
                td {
                    padding: 12px 24px;
                    border-bottom: 1px solid #dedcec;
                }

                th {
                    width: 220px;
                    background: ${theme.colors.palette.gray400};
                    font-weight: 600;
                }

                td {
                    text-align: left;
                    background: ${theme.colors.gray.white};
                }
            `;
        }
    }}
`;

export const SelectInputField = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    .custom-select{
        width: 200px;
        flex-shrink: 0;
    }
`

export const InputChecked = styled.div`
    display: flex;
    gap: 20px;

    label {
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        color: ${({theme}) => theme.colors.palette.brand900};

        input {
            margin: 0;
        }
    }
`;


export const TableAdditional = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
`
export const TotalCount = styled.div`
    
`

export const TablePageNationWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 15px;
    .control-btn{
        cursor: pointer;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        &.disabled{
            cursor: not-allowed;
            pointer-events: none;
        }
    }
`
export const PagingWrap = styled.div`
    display: flex;
    align-items: center;
    .page{
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: ${theme.colors.palette.white};
        color: ${theme.colors.palette.brand700};
        &.active{
            pointer-events: none;
            background: ${theme.colors.palette.brand700};
            color: ${theme.colors.palette.white};
        }
    }
`

