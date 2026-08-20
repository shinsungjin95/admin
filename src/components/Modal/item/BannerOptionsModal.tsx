


import Input from "@/components/Input";
import {useStore} from "@/store";
import {FormWrap} from "@/styles/CommonStyle";
import {observer} from "mobx-react";
import React, { useEffect } from "react";
import {Dimmer, ModalHeader, ModalItem, ModalWrapper} from "../style.tsx";
import {IoCloseOutline} from "react-icons/io5";
import {theme} from "@styles/theme";
import styled from "styled-components";
import Button from "@components/Button";
import {BANNER_CONFIG_OPTIONS} from "@/pages/protected/homepage/banner/controller/index.tsx";
import {setToast} from "@/util/toast.ts";
import BannerSlide from "@/pages/protected/homepage/banner/controller/BannerSlide";


const BannerOptionsModal = observer(({
                              onConfirm,
                              onCancel,
                              width,
                              maxHeight,
                              title,
                              closeBtn,
                              modalDepth,
                          }) => {
    const {bannerStore} = useStore();

    const bannerConfigFunc = async () => {
        try {
            const response = await bannerStore.setPatchBannerConfig();
            if(response.data.success){
                await bannerStore.getBannerList();
                setToast("success", "배너 옵션이 업데이트 되었습니다.");
                onConfirm();
            }
        } catch (e) {
            console.log(e);
            setToast("warning", e.message);
        }
    }
    const config = bannerStore.bannerConfig;
    const activeBanners = bannerStore.bannerList.filter((item) => item.active);

    useEffect(() => {
        bannerStore.getBannerList().catch((error) => {
                console.log(error);
        });
        return () => {
            bannerStore.setBannerOptionsClear();
        };
    }, []);

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
                <BannerOptionsWrap>
                    <div className={"prev-inner"}>
                        <BannerSlide config={config} slides={activeBanners} />
                        <FormWrap>
                            <div className={"wrap-row"}>
                                <div className={"title"}>효과</div>
                                <div className={"inner"}>
                                    {
                                        BANNER_CONFIG_OPTIONS.effect.map((item, idx) =>
                                            <Input
                                                key={idx}
                                                inputType={"radio"}
                                                label={item.label}
                                                name={"effect_state"}
                                                value={item.value}
                                                checked={bannerStore.bannerConfig.effect === item.value}
                                                onChange={(event) => {
                                                    bannerStore.setBannerConfig("effect", event.target.value);
                                                }}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                            <div className={"wrap-row"}>
                                <div className={"title"}>옵셭 색상</div>
                                <div className={"inner"}>
                                    {
                                        BANNER_CONFIG_OPTIONS.opt_colors.map((item, idx) =>
                                            <Input
                                                key={idx}
                                                inputType={"radio"}
                                                label={item.label}
                                                name={"opt_colors_state"}
                                                value={item.value}
                                                checked={bannerStore.bannerConfig.opt_colors === item.value}
                                                onChange={(event) => {
                                                    bannerStore.setBannerConfig("opt_colors", event.target.value);
                                                }}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                            <div className={"wrap-row"}>
                                <div className={"title"}>조작 버튼</div>
                                <div className={"inner"}>
                                    {
                                        BANNER_CONFIG_OPTIONS.navigation.map((item, idx) =>
                                            <Input
                                                key={idx}
                                                inputType={"radio"}
                                                label={item.label}
                                                name={"navigation_state"}
                                                checked={bannerStore.bannerConfig?.navigation?.active === item.value}
                                                onChange={() => {
                                                    bannerStore.setBannerConfig(
                                                        "navigation",
                                                        item.value,
                                                        "active"
                                                    );
                                                }}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                            <div className={"wrap-row"}>
                                <div className={"title"}>페이징</div>
                                <div className={"inner"}>
                                    {
                                        BANNER_CONFIG_OPTIONS.pagination.map((item, idx) =>
                                            <Input
                                                key={idx}
                                                inputType={"radio"}
                                                label={item.label}
                                                name={"pagination_state"}
                                                checked={bannerStore.bannerConfig?.pagination?.active === item.value}
                                                onChange={() => {
                                                    bannerStore.setBannerConfig(
                                                        "pagination",
                                                        item.value,
                                                        "active"
                                                    );
                                                }}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                            {
                                bannerStore.bannerConfig?.pagination?.active &&
                                <div className={"wrap-row"}>
                                    <div className={"title"}>페이징 타입</div>
                                    <div className={"inner"}>
                                        {
                                            BANNER_CONFIG_OPTIONS.paginationType.map((item, idx) =>
                                                <Input
                                                    key={idx}
                                                    inputType={"radio"}
                                                    label={item.label}
                                                    name={"pagination_type_state"}
                                                    value={item.value}
                                                    checked={bannerStore.bannerConfig?.pagination?.type === item.value}
                                                    onChange={(event) => {
                                                        bannerStore.setBannerConfig(
                                                            "pagination",
                                                            event.target.value,
                                                            "type"
                                                        );
                                                    }}
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                            }
                            {
                                bannerStore.bannerConfig?.pagination?.active &&
                                <div className={"wrap-row"}>
                                    <div className={"title"}>페이징 위치(하단)</div>
                                    <div className={"inner"}>
                                        {
                                            BANNER_CONFIG_OPTIONS.paginationPosition.map((item, idx) =>
                                                <Input
                                                    key={idx}
                                                    inputType={"radio"}
                                                    label={item.label}
                                                    name={"pagination_position_state"}
                                                    value={item.value}
                                                    checked={bannerStore.bannerConfig?.pagination?.position === item.value}
                                                    onChange={(event) => {
                                                        bannerStore.setBannerConfig(
                                                            "pagination",
                                                            event.target.value,
                                                            "position"
                                                        );
                                                    }}
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                            }
                            <div className={"wrap-row"}>
                                <div className={"title"}>자동 슬라이드</div>
                                <div className={"inner"}>
                                    {
                                        BANNER_CONFIG_OPTIONS.autoplay.map((item, idx) =>
                                            <Input
                                                key={idx}
                                                inputType={"radio"}
                                                label={item.label}
                                                name={"autoplay_state"}
                                                checked={bannerStore.bannerConfig?.autoplay?.active === item.value}
                                                onChange={() => {
                                                    bannerStore.setBannerConfig(
                                                        "autoplay",
                                                        item.value,
                                                        "active"
                                                    );
                                                }}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                            {
                                bannerStore.bannerConfig?.autoplay?.active &&
                                <div className={"wrap-row"}>
                                    <div className={"title"}>슬라이드 속도</div>
                                    <div className={"inner"}>
                                        {
                                            BANNER_CONFIG_OPTIONS.autoplayDelay.map((item, idx) =>
                                                <Input
                                                    key={idx}
                                                    inputType={"radio"}
                                                    label={item.label}
                                                    name={"autoplay_delay_state"}
                                                    checked={bannerStore.bannerConfig?.autoplay?.delay === item.value}
                                                    onChange={() => {
                                                        bannerStore.setBannerConfig(
                                                            "autoplay",
                                                            item.value,
                                                            "delay"
                                                        );
                                                    }}
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                            }
                        </FormWrap>
                    </div>
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
                            onClick={bannerConfigFunc}
                        >
                            등록
                        </Button>
                    </div>
                </BannerOptionsWrap>
            </ModalItem>
        </ModalWrapper>
    );
});



const BannerOptionsWrap = styled.div`
    .wrap-row {
        .inner {
            display: flex;
            align-items: center;
            gap: 15px;
        }
    }
    .prev-inner{
        display: flex;
        align-items: start;
        padding: 20px 0 30px;
        justify-content: center;
        gap: 20px;
    }
    .btn-area {
        padding-bottom: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
`



export default BannerOptionsModal;
