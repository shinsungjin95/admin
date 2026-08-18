import CardSection from "@/components/Layout/CardSection.tsx";
import {observer} from "mobx-react";
import {useStore} from "@/store";
import {useEffect, useState} from "react";
import styled from "styled-components";
import Button from "@/components/Button";
import {MODAL_PAYLOAD} from "@/constants/Modal";
import {setToast} from "@/util/toast";
import BannerList from "./controller/BannerList";
import BannerOptionsModal from "./controller/Preview";



const HomePageBannerSetting = observer(() => {
    const {bannerStore, modalStore} = useStore();
    const [checkedList, setCheckedList] = useState([]);
    useEffect(() => {
        bannerStore.getBannerList().catch((error) => {
            console.log(error);
        });
        return () => {
            bannerStore.setBannerListClear();
        };
    }, []);

    return (
        <BannerWrap>
            <BannerOptionsModal />



            <CardSection title="홈페이지 배너">
                <BannerList items={bannerStore.bannerList} checkedList={checkedList} setCheckedList={setCheckedList}/>
            </CardSection>
            <div className="title-btn-wrap">
                <Button
                    size="sm"
                    radius="sm"
                    onClick={() => {
                        modalStore.open(
                            MODAL_PAYLOAD.BANNER_REGISTER_MODAL({
                                props: {
                                    title: "배너 등록",
                                    onCancel: () => {
                                        bannerStore.setBannerDataClear();
                                    },
                                },
                            })
                        );
                    }}
                >
                    등록
                </Button>
                
                <Button
                    size="sm"
                    radius="sm"
                    outlined
                    onClick={() => {
                        if(checkedList.length === 0){
                            setToast("warning", "선택후 사용해 주세요.")
                            return;
                        }
                        modalStore.open(
                            MODAL_PAYLOAD.BASIC_CONFIRM({
                                props: {
                                    message: `삭제시 데이터는 모두 삭제 됩니다.\n진행 하시겟습니까?`,
                                    onConfirm: async () => {
                                        try{
                                            const response = await bannerStore.setDeleteBanner(checkedList);
                                            console.log(response)
                                            if(response.data.success){
                                                await bannerStore.getBannerList();
                                            }
                                            setToast("success", "삭제 되었습니다.");
                                            setCheckedList([]);
                                        }catch(e){
                                            console.log(e)
                                        }
                                    },
                                },
                            })
                        );
                    }}
                >
                    삭제
                </Button>
            </div>

        </BannerWrap>
    );
});

const BannerWrap = styled.div`
    position: relative;

    .title-btn-wrap {
        position: absolute;
        top: -10px;
        right: 0;
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;


export default HomePageBannerSetting;