import React from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
} from "@hello-pangea/dnd";

import {
    Item,
    ItemMain,
    List,
} from "@components/DragAndDrop/style";
import {observer} from "mobx-react";
import {useStore} from "@/store";
import {FaPlus} from "react-icons/fa6";
import {MODAL_PAYLOAD} from "@/constants/Modal.ts";
import Button from "@components/Button";
import styled from "styled-components";
import {IoListOutline} from "react-icons/io5";
import {BsCardText} from "react-icons/bs";
import {TfiLayoutListThumb} from "react-icons/tfi";
import {setToast} from "@/util/toast.ts";
import {theme} from "@styles/theme";

export interface MenuItem {
    id: string;
    type: string;
    title: string;
    subtype?: string;
    children?: MenuItem[];
}

type MenuTreeViewListProps = {
    items: MenuItem[];
};


const reorder = <T, >(
    list: T[],
    startIndex: number,
    endIndex: number
): T[] => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};


const MenuTreeViewList = observer(({
                                       items
                                   }: MenuTreeViewListProps) => {
    const {menuStore, modalStore} = useStore();

    const handleDragEnd = ({
                               source,
                               destination,
                           }) => {

        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;
        if (source.droppableId === "root" && destination.droppableId === "root") {
            const next = reorder(
                items,
                source.index,
                destination.index
            );
            menuStore.setNavigationData(next);
            return;
        }
        if (source.droppableId === "root" && destination.droppableId !== "root") return;
        const sourceParentIndex = items.findIndex((item) => item.id === source.droppableId);
        const destParentIndex = items.findIndex((item) => item.id === destination.droppableId);
        if (sourceParentIndex === -1 || destParentIndex === -1) return;
        const next = items.map((parent) => ({
            ...parent,
            children: [...(parent.children ?? [])],
        }));
        const [moved] = next[sourceParentIndex].children!.splice(source.index, 1);
        next[destParentIndex].children!.splice(destination.index, 0, moved);
        menuStore.setNavigationData(next);
    };

    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId={"root"} type={"root"}>
                    {(provided) => {
                        return (
                            <List ref={provided.innerRef} {...provided.droppableProps}>
                                {items.map((parent, pIdx) => (
                                    <Draggable
                                        key={parent.id}
                                        draggableId={parent.id}
                                        index={pIdx}
                                    >
                                        {(dragProvided, snapshot) => (
                                            <Item
                                                ref={dragProvided.innerRef}
                                                {...dragProvided.draggableProps}
                                                $dragging={snapshot.isDragging}
                                            >
                                                <MainItemWrap>
                                                    <ItemMain {...dragProvided.dragHandleProps}>
                                                        {parent.title}
                                                    </ItemMain>
                                                    <div className={"btn-wrap"}>
                                                        <Button
                                                            size={"xsm"}
                                                            outlined
                                                            onClick={() => {
                                                                modalStore.open(
                                                                    MODAL_PAYLOAD.MENU_SETTING_MODAL({
                                                                        props: {
                                                                            title: `${parent.title} 하위 메뉴 설정`,
                                                                            onConfirm: (data?: string) => {
                                                                                menuStore.setAddMenu({
                                                                                    title: data,
                                                                                    parentId: parent.id,
                                                                                });
                                                                                setToast("success", "추가 되었습니다.");
                                                                            },
                                                                        },
                                                                    })
                                                                );
                                                            }}
                                                        >
                                                            <FaPlus/>
                                                        </Button>
                                                        <Button
                                                            size={"xsm"}
                                                            onClick={() => {
                                                                console.log(parent)
                                                                modalStore.open(
                                                                    MODAL_PAYLOAD.MENU_SETTING_MODAL({
                                                                        props: {
                                                                            title: `메뉴 이름 변경`,
                                                                            data: parent.title,
                                                                            onConfirm: (data?: string) => {
                                                                                menuStore.setModifyMenu({
                                                                                    targetId: parent.id,
                                                                                    title: data
                                                                                });
                                                                                setToast("success", "변경 되었습니다.");
                                                                            },
                                                                        },
                                                                    })
                                                                );
                                                            }}
                                                        >
                                                            설정
                                                        </Button>
                                                        <Button
                                                            size={"xsm"}
                                                            color={theme.colors.palette.warn}
                                                            outlined
                                                            onClick={() => {
                                                                modalStore.open(
                                                                    MODAL_PAYLOAD.BASIC_CONFIRM({
                                                                        props: {
                                                                            message: `${parent.title} 삭제시 하위 데이터 및\n연결된 데이터는 모두 삭제 됩니다.\n진행 하시겟습니까?`,
                                                                            onConfirm: () => {
                                                                                menuStore.setModifyMenu({
                                                                                    targetId: parent.id,
                                                                                    deleType: true,
                                                                                });
                                                                                setToast("success", "삭제 되었습니다.");
                                                                            },
                                                                        },
                                                                    })
                                                                );
                                                            }}
                                                        >
                                                            삭제
                                                        </Button>
                                                    </div>
                                                </MainItemWrap>
                                                <Droppable droppableId={parent.id} type={"child"}>
                                                    {(childProvided, childSnap) => (
                                                        <List
                                                            ref={childProvided.innerRef}
                                                            {...childProvided.droppableProps}
                                                            $over={childSnap.isDraggingOver}
                                                            $childWrap={true}
                                                        >
                                                            {parent.children?.map((child, cIdx) => (
                                                                <Draggable
                                                                    key={child.id}
                                                                    draggableId={child.id}
                                                                    index={cIdx}
                                                                >
                                                                    {(cProvided, cSnap) => (
                                                                        <Item
                                                                            ref={cProvided.innerRef}
                                                                            {...cProvided.draggableProps}
                                                                            $dragging={cSnap.isDragging}
                                                                            $child={true}
                                                                        >
                                                                            <ItemMain {...cProvided.dragHandleProps}>
                                                                                <div className={"inner"}>
                                                                                    <p>
                                                                                        {
                                                                                            {
                                                                                                list: <IoListOutline/>,
                                                                                                card: <BsCardText/>,
                                                                                                thumb:
                                                                                                    <TfiLayoutListThumb/>,
                                                                                            }[child.subtype]
                                                                                        }
                                                                                    </p>
                                                                                    {child.title}
                                                                                </div>
                                                                                <div className={"btn-wrap"}>
                                                                                    <Button
                                                                                        size={"xsm"}
                                                                                        onClick={() => {
                                                                                            modalStore.open(
                                                                                                MODAL_PAYLOAD.MENU_SETTING_MODAL({
                                                                                                    props: {
                                                                                                        title: `${child.title} 메뉴 설정`,
                                                                                                        boardType: child.subtype,
                                                                                                        data: child.title,
                                                                                                        onConfirm: (data?: {
                                                                                                            title: string;
                                                                                                            boardType: string;
                                                                                                        }) => {
                                                                                                            menuStore.setModifyMenu({
                                                                                                                targetId: child.id,
                                                                                                                title: data.title,
                                                                                                                subtype: data.boardType,
                                                                                                            });
                                                                                                            setToast("success", "변경 되었습니다.");
                                                                                                        },
                                                                                                    },
                                                                                                })
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        설정
                                                                                    </Button>
                                                                                    <Button
                                                                                        size={"xsm"}
                                                                                        color={theme.colors.palette.warn}
                                                                                        outlined
                                                                                        onClick={() => {
                                                                                            modalStore.open(
                                                                                                MODAL_PAYLOAD.BASIC_CONFIRM({
                                                                                                    props: {
                                                                                                        message: `${child.title} 삭제시 연결된 데이터는 모두 삭제 됩니다.\n진행 하시겟습니까?`,
                                                                                                        onConfirm: () => {
                                                                                                            menuStore.setModifyMenu({
                                                                                                                targetId: child.id,
                                                                                                                deleType: true,
                                                                                                            });
                                                                                                            setToast("success", "삭제 되었습니다.");
                                                                                                        },
                                                                                                    },
                                                                                                })
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        삭제
                                                                                    </Button>
                                                                                </div>
                                                                            </ItemMain>
                                                                        </Item>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            {childProvided.placeholder}
                                                        </List>
                                                    )}
                                                </Droppable>
                                            </Item>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </List>
                        );
                    }}
                </Droppable>
            </DragDropContext>
        </>

    );
});


const MainItemWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn-wrap {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`

export default MenuTreeViewList;