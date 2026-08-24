import styled from "styled-components";
import {theme} from "@styles/theme";
import { IoClose } from "react-icons/io5";

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


export const FormWrap = styled.div`
    border: 1px solid ${theme.colors.palette.brand700};
    border-bottom: none;
    .wrap-row{
        display: flex;
        align-items: stretch;
        border-bottom: 1px solid ${theme.colors.palette.brand700};
        .title{
            width: 150px;
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: ${theme.colors.palette.brand700};
            color: ${theme.colors.palette.white};
        }
        .inner{
            width: 100%;
            padding: 20px;
        }
    }
`


export const ImageItem = styled.div`
    position: relative;
    width: 120px;
    height: 120px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
    }

    .close-btn {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.7);
        border: 0;
        border-radius: 50%;
        cursor: pointer;
    }
`;

export const UploadLabel = styled.label`
    min-width: 180px;
    height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: #fff;
    font-size: 14px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        background: #f7f7f7;
        border-color: #bbb;
    }
    input {
        display: none;
    }
`;


export const NewImage = ({
    file,
    onRemove,
}: {
    file: File;
    onRemove: () => void;
}) => {
    const imageUrl = URL.createObjectURL(file);

    return (
        <ImageItem>
            <img
                src={imageUrl}
                alt={file.name}
            />

            <div
                className={"close-btn"}
                onClick={onRemove}
            >
                <IoClose color={"#fff"} size={18}/>
            </div>
        </ImageItem>
    );
};