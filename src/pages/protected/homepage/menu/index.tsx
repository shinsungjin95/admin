import CardSection from "@/components/Layout/CardSection.tsx";
import {observer} from "mobx-react";
import {useStore} from "@/store";
import React from "react";
import styled from "styled-components";
import Button from "@components/Button";
import MenuTreeViewList from "@/pages/protected/homepage/menu/controller/MenuTreeViewList.tsx";

const HomePageMenuSetting = observer(() => {
    const { menuStore } = useStore();

    return (
        <MenuSettingWrap>
            <CardSection title="메뉴 설정">
                <MenuSettingWrap>
                    <MenuTreeViewList items={menuStore.navigationData}  />
                </MenuSettingWrap>
            </CardSection>
            <div className={"title-btn-wrap"}>
                <Button
                    size={"sm"}
                    outlined
                    onClick={() => {
                        menuStore.setAddListData({
                            type: "parent",
                            value: ""
                        })
                    }}
                >
                    메뉴 추가
                </Button>
                <Button
                    size={"sm"}
                    onClick={() => {
                        menuStore.setSaveButton()
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
    .title-btn-wrap{
        position: absolute;
        top: -10px;
        right: 0;
        display: flex;
        align-items: center;
        gap: 10px;
    }
`

export default HomePageMenuSetting;