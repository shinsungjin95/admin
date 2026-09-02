import {observer} from "mobx-react";
import {
    DragDropContext,
    Droppable,
    Draggable,
} from "@hello-pangea/dnd";
import {IoMenu} from "react-icons/io5";
import {useStore} from "@/store";
import {setToast} from "@/util/toast";
import Button from "@/components/Button";
import styled from "styled-components";
import {MODAL_PAYLOAD} from "@/constants/Modal";
import {useState} from "react";
import Input from "@/components/Input";


const BANNER_COLUMN_WIDTH = {
    drag: 50,
    check: 50,
    image: 140,
    active: 100,
    manage: 140,
};


const BannerList = observer(({items, checkedList, setCheckedList}) => {
    const {bannerStore, modalStore} = useStore();

const isAllChecked =
    items.length > 0 &&
    checkedList.length === items.length;

const handleAllCheck = () => {
    if (isAllChecked) {
        setCheckedList([]);
        return;
    }
    setCheckedList(
        items.map((_, index) => index)
    );
};

const handleCheck = (index) => {
    setCheckedList((prev) => {
        if (prev.includes(index)) {
            return prev.filter(
                (checkedIndex) =>
                    checkedIndex !== index
            );
        }

        return [
            ...prev,
            index
        ];
    });
};


    const onDragEnd = async (result) => {
        if (!result.destination) return;
        if (result.source.index === result.destination.index) return;
        const list = Array.from(items);
        const [removed] = list.splice(result.source.index, 1);
        list.splice(result.destination.index, 0, removed);
        try {
            const response = await bannerStore.setBannerOrder(list);
            if (response.data.success) {
                setToast("success", "배너 순서 변경 되었습니다.");
            } else {
                setToast("warning", "배너 순서 변경에 실패했습니다.");
            }
            await bannerStore.getBannerList();
        } catch (error) {
            console.log(error);
            setToast("warning", "배너 순서 변경에 실패했습니다.");
            await bannerStore.getBannerList();
        }
    };


    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <BannerTable>
                    <colgroup>
                        <col width={`${BANNER_COLUMN_WIDTH.drag}px`}/>
                        <col width={`${BANNER_COLUMN_WIDTH.check}px`}/>
                        <col width={`${BANNER_COLUMN_WIDTH.image}px`}/>
                        <col/>
                        <col width={`${BANNER_COLUMN_WIDTH.active}px`}/>
                        <col width={`${BANNER_COLUMN_WIDTH.manage}px`}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th></th>
                            <th>
                                <Input
                                    inputType={"checkbox"}
                                    checked={isAllChecked}
                                    onChange={handleAllCheck}
                                />
                            </th>
                            <th>이미지(PC)</th>
                            <th>제목</th>
                            <th>노출</th>
                            <th>관리</th>
                        </tr>
                    </thead>

                    <Droppable droppableId="banner-list">
                        {(provided) => (
                            <tbody
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {
                                    items && items.length > 0 ? 
                                    items.map((item, index) => (
                                        <Draggable
                                            key={String(item.id)}
                                            draggableId={String(item.id)}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <BannerRow
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    $isDragging={snapshot.isDragging}
                                                >
                                                    <td
                                                        className="drag"
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <IoMenu size={22}/>
                                                    </td>
                                                    <td>
                                                        <Input
                                                            inputType={"checkbox"}
                                                            checked={checkedList.includes(index)}
                                                            onChange={() => handleCheck(index)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <img src={item.image?.pc.url} alt={item.title} />
                                                    </td>
                                                    <td className={"banner-title"}>
                                                        {item.title}
                                                    </td>
                                                    <td>
                                                        <ToggleSwitch>
                                                            <input
                                                                type="checkbox"
                                                                checked={item.active}
                                                                onChange={async (e) => {
                                                                    const active = e.target.checked;

                                                                    try {
                                                                        const response = await bannerStore.setBannerActive(
                                                                            item.id,
                                                                            active
                                                                        );

                                                                        if (response.data.success) {
                                                                            setToast(
                                                                                "success",
                                                                                `배너가 ${active ? "노출" : "비노출"} 처리되었습니다.`
                                                                            );

                                                                            await bannerStore.getBannerList();
                                                                        }
                                                                    } catch (error) {
                                                                        console.log(error);

                                                                        setToast(
                                                                            "warning",
                                                                            "배너 노출 상태 변경에 실패했습니다."
                                                                        );

                                                                        await bannerStore.getBannerList();
                                                                    }
                                                                }}
                                                            />

                                                            <span className="slider"/>
                                                        </ToggleSwitch>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            size="sm"
                                                            radius="sm"
                                                            onClick={() => {
                                                                modalStore.open(
                                                                    MODAL_PAYLOAD.BANNER_REGISTER_MODAL({
                                                                        props: {
                                                                            title: "배너 수정",
                                                                            dataItem: item,
                                                                        },
                                                                    })
                                                                );
                                                            }}
                                                        >
                                                            수정
                                                        </Button>
                                                    </td>

                                                </BannerRow>
                                            )}
                                        </Draggable>
                                    ))
                                    : 
                                    <tr>
                                        <td colSpan={6}>
                                            데이터가 없습니다.
                                        </td>
                                    </tr>
                                }
                                {provided.placeholder}

                            </tbody>
                        )}
                    </Droppable>
                </BannerTable>
            </DragDropContext>
            
        </>
    );
});


const ToggleSwitch = styled.label`
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
    cursor: pointer;

    input {
        width: 0;
        height: 0;
        opacity: 0;
    }

    .slider {
        position: absolute;
        inset: 0;
        border-radius: 24px;
        background: #ccc;
        transition: 0.2s;

        &::before {
            content: "";
            position: absolute;
            width: 18px;
            height: 18px;
            left: 3px;
            top: 3px;
            border-radius: 50%;
            background: #fff;
            transition: 0.2s;
        }
    }

    input:checked + .slider {
        background: #333;
    }

    input:checked + .slider::before {
        transform: translateX(20px);
    }
`;


const BannerTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;

    th,
    td {
        height: 80px;
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        vertical-align: middle;
    }

    th {
        height: 45px;
        font-weight: 600;
    }

    td.drag {
        cursor: grab;

        &:active {
            cursor: grabbing;
        }
    }
    td{
        button{
            margin: 0 auto;
        }
        img {
            display: block;

            width: 110px;
            height: 60px;

            margin: 0 auto;

            object-fit: cover;
            border-radius: 4px;
        }
    }

    .banner-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: pre-wrap;
    }
`;
const BannerRow = styled.tr<{
    $isDragging: boolean;
}>`
    background: #fff;

    ${({$isDragging}) =>
        $isDragging &&
        `
            display: table;
            width: 100%;
            table-layout: fixed;

            td:nth-child(1) {
                width: ${BANNER_COLUMN_WIDTH.drag}px;
            }

            td:nth-child(2) {
                width: ${BANNER_COLUMN_WIDTH.check}px;
            }

            td:nth-child(3) {
                width: ${BANNER_COLUMN_WIDTH.image}px;
            }

            td:nth-child(5) {
                width: ${BANNER_COLUMN_WIDTH.active}px;
            }

            td:nth-child(6) {
                width: ${BANNER_COLUMN_WIDTH.manage}px;
            }
        `
    }
`;


const DeleteArea = styled.div`
    display: flex;
    justify-content: flex-end;

    margin-top: 15px;
`;


export default BannerList;