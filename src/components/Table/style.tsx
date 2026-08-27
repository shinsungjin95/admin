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

                tbody{
                    tr{
                        &.hover{
                            cursor: pointer;
                            &:hover{
                                background: ${theme.colors.palette.brand700};
                                color: ${theme.colors.palette.white};
                            }
                        }
                        label{
                            justify-content: center;
                        }
                    }
                }

                th {
                    font-weight: 500;
                    background: ${theme.colors.palette.gray400};
                    font-size: 13px;
                    height: 44px;
                    label{
                        justify-content: center;
                    }
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

export const CustomListWrap = styled.div`
    text-align: center;
    &.card {
        .list-inner{
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 20px;   
        }
    }
    &.blog{
        .list-inner{
            display: flex;
            flex-direction: column;
            gap: 20px;
            .items{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 15px;
                .checked {
                    flex: 0 0 30px;
                    margin-bottom: 0;
                }
                > div:nth-child(2) {
                    flex: 0 0 15%;

                    img {
                        width: 100%;
                        height: 100px;
                        object-fit: cover;
                    }
                }
                .title{
                    flex: 1 1 0;
                    padding: 0 30px;
                }
                .date {
                    flex: 0 0 180px;
                }
            }
        }
    }
    .list-inner{
        .items {
            width: 100%;
            min-width: 0;
            overflow: hidden;
            box-sizing: border-box;
            padding: 20px;
            border: 1px solid ${theme.colors.palette.brand700};
            border-radius: 10px;
            &.hover{
                cursor: pointer;
                &:hover{
                    background: ${theme.colors.palette.brand700};
                    color: ${theme.colors.palette.white};
                }
            }
            > div {
                min-width: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .title{
                padding: 15px 0;
            }
            .img-wrap{
                height: 180px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .checked{
                margin-bottom: 10px;
            }
        }
    }
`


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
    margin-top: 30px;
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
        cursor: pointer;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: ${theme.colors.palette.brand700};
        &.active{
            pointer-events: none;
            background: ${theme.colors.palette.brand700};
            color: ${theme.colors.palette.white};
        }
    }
`

