import CardSection from "@/components/Layout/CardSection.tsx";
import DragDropList from "@components/DragAndDrop";
import {observer} from "mobx-react";
import {useStore} from "@/store";
import {useEffect} from "react";


const HomePageBannerSetting = observer(() => {
    const { exampleStore } = useStore();

    useEffect(() => {
        return(() => {
            exampleStore.setEtcDataClear();
        });
    }, []);

    return (
        <CardSection title="Dnd 리스트 사용 예시">
            <DragDropList items={exampleStore.dndList} onChange={exampleStore.setReOrderDndList} />
        </CardSection>
    );
});

export default HomePageBannerSetting;