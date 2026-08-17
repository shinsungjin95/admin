import Input from "@/components/Input";
import { useStore } from "@/store";
import { FormWrap } from "@/styles/CommonStyle";
import { observer } from "mobx-react";

const  BannerPreview = observer(() => {
    const {bannerStore} =  useStore();
    return(
        <>
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
            </FormWrap>
        </>
    )
});

export default BannerPreview