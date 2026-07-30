import CardSection from "@/components/Layout/CardSection.tsx";
import DragDropList from "@components/DragAndDrop";
import {observer} from "mobx-react";
import {useStore} from "@/store";
import React, {useEffect} from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";

const HomePageMenuSetting = observer(() => {
    const { menuStore } = useStore();


    const saveButton = () => {
        const id = nanoid();
        console.log(id);
    }
    const menuButtonObject = {
        name: "저장하기",
        function: saveButton,
    }
    return (
        <CardSection title="메뉴 설정" useButton={menuButtonObject}>
            <MenuSettingWrap>
                <DragDropList items={menuStore.navigationData}  />
            </MenuSettingWrap>
        </CardSection>
    );
});

const MenuSettingWrap = styled.div`
    
`

export default HomePageMenuSetting;