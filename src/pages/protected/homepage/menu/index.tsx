import CardSection from "@/components/Layout/CardSection.tsx";
import {observer} from "mobx-react";
import {useStore} from "@/store";
import React from "react";
import styled from "styled-components";
import Button from "@components/Button";
import MenuTreeViewList from "@/pages/protected/homepage/menu/controller/MenuTreeViewList.tsx";
import {MODAL_PAYLOAD} from "@/constants/Modal.ts";
import {setToast} from "@/util/toast.ts";

const HomePageMenuSetting = observer(() => {
    const {menuStore, modalStore} = useStore();

    return (
        <MenuSettingWrap>
            <CardSection title="메뉴 설정">
                <MenuSettingWrap>
                    <MenuTreeViewList items={menuStore.navigationData}/>
                </MenuSettingWrap>
            </CardSection>
            <div className={"title-btn-wrap"}>
                <Button
                    size={"sm"}
                    outlined
                    onClick={() => {
                        modalStore.open(
                            MODAL_PAYLOAD.MENU_SETTING_MODAL({
                                props: {
                                    title: "대메뉴 이름 설정",
                                    onConfirm: (data?: string) => {
                                        menuStore.setAddMenu({
                                            title: data,
                                        });
                                        setToast("success", "추가 되었습니다.");
                                    },
                                },
                            })
                        );
                    }}
                >
                    메뉴 추가
                </Button>
                <Button
                    size={"sm"}
                    onClick={async () => {
                        try {
                            modalStore.open(
                                MODAL_PAYLOAD.BASIC_CONFIRM({
                                    props: {
                                        message: `홈페이지에 즉시 반영됩니다.\n진행 하시겟습니까?`,
                                        onConfirm: async () => {
                                            const response = await menuStore.setSaveButton();
                                            if(response.data.success){
                                                menuStore.setCurrentMenu(response.data.data);
                                                setToast("success", "반영 되었습니다.");
                                            }

                                        },
                                    },
                                })
                            );
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                >
                    메뉴 저장
                </Button>
            </div>
        </MenuSettingWrap>
    );
});

const MenuSettingWrap = styled.div`
    position: relative;

    .title-btn-wrap {
        position: absolute;
        top: -10px;
        right: 0;
        display: flex;
        align-items: center;
        gap: 10px;
    }
`

export default HomePageMenuSetting;