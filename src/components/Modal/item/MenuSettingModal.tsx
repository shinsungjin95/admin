import styled from "styled-components";
import Button from "@components/Button";
import React, {useState} from "react";
import {setToast} from "@/util/toast.ts";
import {Dimmer, ModalHeader, ModalItem, ModalWrapper} from "../style.tsx";
import {IoCloseOutline} from "react-icons/io5";
import {theme} from "@styles/theme";
import Input from "@components/Input";


const MenuSettingModal = ({
                              onConfirm,
                              onCancel,
                              width,
                              maxHeight,
                              title,
                              closeBtn,
                              modalDepth,
                              data,
                              boardType = undefined
                          }) => {
    const [titleData, setTitleData] = useState<string>(data || "");
    const [boardTypeData, setBoardTypeData] = useState<string | undefined>(boardType);

    const boardTypeOptions = [
        { value: "list"},
        { value: "card"},
        { value: "thumb"},
    ]

    console.log(boardTypeData)

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
                <MenuSettingWrap>

                    <div className={"inner"}>
                        {
                            boardType &&
                            <div className={"board-type-wrap"}>
                                <span>보드 타입:</span>
                                {
                                    boardTypeOptions.map((item, idx) =>
                                        <Input
                                            key={idx}
                                            inputType={"radio"}
                                            label={item.value}
                                            name={"radio_state"}
                                            value={item.value}
                                            checked={boardTypeData === item.value}
                                            onChange={(event) => {
                                                setBoardTypeData(event.target.value);
                                            }}
                                        />
                                    )
                                }
                            </div>
                        }
                        <div className={"input-area"}>
                            <Input
                                inputType={"text"}
                                value={titleData}
                                placeholder={"텍스트를 입력해 주세요."}
                                onChange={(e) => {
                                    setTitleData(e.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <div className="btn-area">
                        <Button
                            outlined
                            size={"sm"}
                            radius={"sm"}
                            onClick={() => {
                                onCancel();
                            }}
                        >
                            취소
                        </Button>
                        <Button
                            size={"sm"}
                            radius={"sm"}
                            onClick={() => {
                                if (titleData === "") {
                                    setToast("warning", "입력후 이용해 주세요.");
                                    return;
                                }
                                if(!boardTypeData){
                                    onConfirm(titleData);
                                } else {
                                    onConfirm({
                                        title: titleData,
                                        boardType: boardTypeData
                                    })
                                }

                            }}
                        >
                            변경
                        </Button>
                    </div>
                </MenuSettingWrap>
            </ModalItem>
        </ModalWrapper>
    );
}

const MenuSettingWrap = styled.div`
    padding: 20px;

    .inner {
        text-align: center;
        padding: 15px;
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
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
`
export default MenuSettingModal;
