import styled from "styled-components";
import Button from "@components/Button";
import React, {useEffect, useState} from "react";
import {setToast} from "@/util/toast.ts";
import {Dimmer, ModalHeader, ModalItem, ModalWrapper} from "../style.tsx";
import {IoCloseOutline} from "react-icons/io5";
import {theme} from "@styles/theme";
import Input from "@components/Input";
import { FormWrap, ImageItem, NewImage } from "@/styles/CommonStyle.tsx";
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

    const confirmBanner = async () => {
        if (!bannerStore.bannerData.title.trim()) {
            setToast("warning", "제목을 입력해 주세요.");
            return;
        }

        if (!bannerStore.bannerData.image && !bannerStore.bannerData.file) {
            setToast("warning", "이미지를 등록해 주세요.");
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
                                <Input
                                    inputType={"text"}
                                    value={bannerStore.bannerData.title}
                                    placeholder={"텍스트를 입력해 주세요."}
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
                        <div className={"wrap-row h-200"}>
                            <div className={"title"}>이미지 업로드</div>

                            <div className={"inner"}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];

                                        if (!file) return;

                                        bannerStore.setBannerData("file", file);

                                        // 새 파일을 선택했으므로 기존 이미지 제거
                                        bannerStore.setBannerData("image", null);

                                        e.target.value = "";
                                    }}
                                />

                                {bannerStore.bannerData.image && (
                                    <ImageItem>
                                        <img
                                            src={bannerStore.bannerData.image.url}
                                            alt="배너 이미지"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => {
                                                bannerStore.setBannerData("image", null);
                                            }}
                                        >
                                            ×
                                        </button>
                                    </ImageItem>
                                )}

                                {bannerStore.bannerData.file && (
                                    <NewImage
                                        file={bannerStore.bannerData.file}
                                        onRemove={() => {
                                            bannerStore.setBannerData("file", null);
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

    .btn-area {
        margin-top: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
`
export default BannerRegisterModal;
