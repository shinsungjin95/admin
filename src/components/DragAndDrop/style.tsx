import styled from "styled-components";
import {theme} from "@styles/theme";

export const List = styled.div<{ $over?: boolean; $childWrap?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: ${({$childWrap}) => ($childWrap ? "10px" : "30px")};
    margin-top: ${({$childWrap}) => ($childWrap ? "20px" : null)};
    ${({$over}) => $over && `
        background: ${theme.colors.palette.brand300};
        border: 1px dashed ${theme.colors.palette.brand900};
    `}
`;

export const Item = styled.div<{ $dragging?: boolean; $child?: boolean; }>`
    background: ${({$child}) => ($child ? `${theme.colors.palette.gray300}` : `${theme.colors.palette.white}`)};
    border: 1px solid ${({$child}) => ($child ? `${theme.colors.palette.gray300}` : `${theme.colors.palette.brand700}`)};
    padding: ${({$child}) => ($child ? "10px" : "25px")};
    border-radius: ${({$child}) => ($child ? "0" : "10px")};
    ${({$dragging}) => $dragging && `
        background: ${theme.colors.palette.brand500};
        transform: rotate(1deg);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    `}
`;

export const ItemMain = styled.div`
    cursor: grab;
    font-weight: 500;
`;