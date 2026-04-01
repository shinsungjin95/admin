import React from "react";
import {observer} from "mobx-react";
import LoadingInner from "@/components/Loading/LoadingInner.tsx";
import {useStore} from "@/store";


const Loading = observer(() => {
    const {loadingStore} = useStore();
    return (
        <>
            {
                loadingStore.visible &&
                <LoadingInner />
            }
        </>
    );
});


export default Loading;
