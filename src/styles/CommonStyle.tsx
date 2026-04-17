import styled from "styled-components";
import {theme} from "@styles/theme";

export const ButtonWrap =  styled.div<{ $mt?: string; $gap?: string; }>`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: ${({$mt}) => $mt ? $mt : "25px"};
    gap: ${({$gap}) =>  $gap ? $gap : "20px"};
`;

export const NoticeBox=  styled.div<{ $mtb?: string; }>`
    font-size: 12px;
    color: ${theme.colors.palette.warn};
    margin: ${({$mtb}) => $mtb ? $mtb : "10px 0"};
`;