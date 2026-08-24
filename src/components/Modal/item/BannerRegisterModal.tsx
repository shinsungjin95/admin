import styled from "styled-components";
import Button from "@components/Button";
import React, {useEffect, useState} from "react";
import {setToast} from "@/util/toast.ts";
import {Dimmer, ModalHeader, ModalItem, ModalWrapper} from "../style.tsx";
import {IoCloseOutline, IoCloudUploadOutline, IoClose } from "react-icons/io5";
import {theme} from "@styles/theme";
import Input from "@components/Input";
import { FormWrap, ImageItem, NewImage, UploadLabel } from "@/styles/CommonStyle.tsx";
import { observer } from "mobx-react";
import { useStore } from "@/store/index.ts";


const BannerRegisterModal = observer(({
                              onConfirm,
                              onCancel,
                              width,
                              maxHeight,
                              title,
                              closeBtn,
                              modalDepth,
                              dataItem = undefined
                          }) => {
    const {bannerStore} = useStore();
    const limitTitleLength = 50;
    const confirmBanner = async () => {
        if (!bannerStore.bannerData.title.trim()) {
            setToast("warning", "제목을 입력해 주세요.");
            return;
        }
        if (bannerStore.bannerData.title.replace(/\r?\n/g, "").length > limitTitleLength) {
            setToast("warning", `${limitTitleLength}자 이하로 입력해주세요.`);
            return;
        }

        if (!bannerStore.bannerData.pcImage && !bannerStore.bannerData.pcFile) {
            setToast("warning", "PC 이미지를 등록해 주세요.");
            return;
        }

        if (!bannerStore.bannerData.moImage && !bannerStore.bannerData.moFile) {
            setToast("warning", "모바일 이미지를 등록해 주세요.");
            return;
        }

        try {
            const response = await bannerStore.setBanner();
            if (response.data.success) {
                await bannerStore.getBannerList();
                setToast("success", `${dataItem ? "수정" : "등록"} 되었습니다.`);
                onConfirm();
            }
        } catch (e) {
            console.log(e);
            setToast("warning", e.message);
        }
    };


    useEffect(() => {
        if (dataItem) {
            bannerStore.setModifyBannerData(dataItem);
        } else {
            bannerStore.setBannerDataClear();
        }

        return () => {
            bannerStore.setBannerDataClear();
        };
    }, [dataItem]);

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
                <BannerSettingWrap>
                    <FormWrap>
                        <div className={"wrap-row"}>
                            <div className={"title"}>제목</div>
                            <div className={"inner"}>
                                <textarea 
                                    className={"text-area-inner"}
                                    value={bannerStore.bannerData.title}
                                    placeholder={`텍스트를 입력해 주세요.(${limitTitleLength}자 이하로 입력 해주세요.)`}
                                    onChange={(e) => {
                                        bannerStore.setBannerData("title", e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className={"wrap-row"}>
                            <div className={"title"}>링크</div>
                            <div className={"inner"}>
                                <Input
                                    inputType={"text"}
                                    value={bannerStore.bannerData.link}
                                    placeholder={"텍스트를 입력해 주세요."}
                                    onChange={(e) => {
                                        bannerStore.setBannerData("link", e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className={"wrap-row image-row"}>
                            <div className="title">PC 이미지</div>
                            <div className={"inner image-inner"}>
                                {!bannerStore.bannerData.pcImage &&
                                    !bannerStore.bannerData.pcFile && (
                                        <UploadLabel>
                                            <IoCloudUploadOutline size={22} />
                                            <span>PC 이미지 업로드</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;
                                                    bannerStore.setBannerData("pcFile", file);
                                                    bannerStore.setBannerData("pcImage", null);
                                                    e.target.value = "";
                                                }}
                                            />
                                        </UploadLabel>
                                    )}

                                {bannerStore.bannerData.pcImage && (
                                    <ImageItem>
                                        <img
                                            src={bannerStore.bannerData.pcImage.url}
                                            alt="PC 배너 이미지"
                                        />

                                        <div
                                            className={"close-btn"}
                                            onClick={() => {
                                                bannerStore.setBannerData("pcImage", null);
                                            }}
                                        >
                                            <IoClose color={"#fff"} size={18}/>
                                        </div>
                                    </ImageItem>
                                )}

                                {bannerStore.bannerData.pcFile && (
                                    <NewImage
                                        file={bannerStore.bannerData.pcFile}
                                        onRemove={() => {
                                            bannerStore.setBannerData("pcFile", null);
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="wrap-row image-row">
                            <div className="title">모바일 이미지</div>

                            <div className="inner image-inner">
                                {!bannerStore.bannerData.moImage &&
                                    !bannerStore.bannerData.moFile && (
                                        <UploadLabel>
                                            <IoCloudUploadOutline size={22} />
                                            <span>모바일 이미지 업로드</span>

                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;
                                                    bannerStore.setBannerData("moFile", file);
                                                    bannerStore.setBannerData("moImage", null);
                                                    e.target.value = "";
                                                }}
                                            />
                                        </UploadLabel>
                                    )}

                                {bannerStore.bannerData.moImage && (
                                    <ImageItem>
                                        <img
                                            src={bannerStore.bannerData.moImage.url}
                                            alt="모바일 배너 이미지"
                                        />
                                        <div 
                                            className={"close-btn"}
                                            onClick={() => {
                                                bannerStore.setBannerData("moImage", null);
                                            }}
                                        >
                                            <IoClose color={"#fff"} size={18}/>
                                        </div>
                                    </ImageItem>
                                )}

                                {bannerStore.bannerData.moFile && (
                                    <NewImage
                                        file={bannerStore.bannerData.moFile}
                                        onRemove={() => {
                                            bannerStore.setBannerData("moFile", null);
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </FormWrap>
                    

                    <div className={"btn-area"}>
                        <Button
                            outlined
                            size={"sm"}
                            radius={"sm"}
                            onClick={onCancel}
                        >
                            취소
                        </Button>
                        <Button
                            size={"sm"}
                            radius={"sm"}
                            onClick={confirmBanner}
                        >
                            {dataItem ? "수정" : "등록"}
                        </Button>
                    </div>
                </BannerSettingWrap>
            </ModalItem>
        </ModalWrapper>
    );
});

const BannerSettingWrap = styled.div`
    padding: 20px;
    .h-200{
        height: 200px;
    }
    .inner {
        display: flex;
        align-items: center;
        .board-type-wrap{
            display: flex;
            gap: 5px;
            align-items: center;
            margin-bottom: 13px;
        }

        p {
            margin-bottom: 10px;
        }
    }

    .text-area-inner{
        height:  130px;
        outline: none;
        resize: none;
    }

    .btn-area {
        margin-top: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    .image-row {
        min-height: 150px;
    }

    .image-inner {
        min-height: 130px;
    }
`


export default BannerRegisterModal;
