import styled from "styled-components";
import Button from "@components/Button";
import React, {useState} from "react";
import {setToast} from "@/util/toast.ts";
import {Dimmer, ModalHeader, ModalItem, ModalWrapper} from "../style.tsx";
import {IoCloseOutline} from "react-icons/io5";
import {theme} from "@styles/theme";
import Input from "@components/Input";


const ImagePreviewModal = ({
                              onCancel,
                              width,
                              maxHeight,
                              title,
                              closeBtn,
                              modalDepth,
                              url,
                          }) => {
    return (
        <ModalWrapper
            $modalDepth={modalDepth}
        >
            <Dimmer onClick={onCancel}/>
            <ModalItem
                $width={width}
                $maxHeight={maxHeight}
            >
                <ModalHeader>
                    {
                        title &&
                        <h1 className={"modal-title"}>{title}</h1>
                    }
                    {
                        closeBtn &&
                        <div
                            className={"modal-close-wrap"}
                            onClick={onCancel}>
                            <IoCloseOutline
                                color={`${theme.colors.palette.white}`}
                                size={24}
                            />
                        </div>
                    }
                </ModalHeader>
                <ImageWrap>
                    <img src={url} alt={"미리보기"}/>
                </ImageWrap>
            </ModalItem>
        </ModalWrapper>
    );
}

const ImageWrap = styled.div`
    padding: 20px;
    img{
        object-fit: cover;
        width: 100%;
    }
`
export default ImagePreviewModal;
