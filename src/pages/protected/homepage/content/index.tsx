import CardSection from "@/components/Layout/CardSection.tsx";
import {observer} from "mobx-react";
import {useStore} from "@/store";
import {useEffect} from "react";
import { useSearchParams } from "react-router-dom";


const HomePageContentSetting = observer(() => {
    const [searchParams] = useSearchParams();

    const menuId = searchParams.get("menuId");
    console.log(menuId, "123")



    return (
        <CardSection title="Dnd 리스트 사용 예시">
            asdsadsadsadsadasdsadasdasd
        </CardSection>
    );
});

export default HomePageContentSetting;