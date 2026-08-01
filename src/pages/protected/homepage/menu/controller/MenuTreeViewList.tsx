import React, {useState} from "react";
import {nanoid} from "nanoid";
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
import Input from "@components/Input";
import {setToast} from "@/util/toast.ts";

export interface MenuItem {
    id: string;
    type: string;
    title: string;
    subtype?: string;
    children?: MenuItem[];
}

type Props = {
    items: MenuItem[];
    onChange: (items: MenuItem[]) => void;
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
                                       items,
                                       onChange,
                                   }: Props) => {
    const {menuStore} = useStore();
    const [addingParent, setAddingParent] = useState(false);
    const [addingChildParentId, setAddingChildParentId] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState("");
    // const addParent = () => {
    //     if (!inputValue.trim()) {
    //         setAddingParent(false);
    //         setInputValue("");
    //         return;
    //     }
    //     onChange([
    //         ...items,
    //         {
    //             id: nanoid(),
    //             type: "parent",
    //             title: inputValue,
    //             children: [],
    //         },
    //     ]);
    //
    //     setInputValue("");
    //     setAddingParent(false);
    // };

    const addChild = () => {

        if (!addingChildParentId) return;

        if (!inputValue.trim()) {
            setAddingChildParentId(null);
            setInputValue("");
            return;
        }

        const next = items.map((parent) => {

            if (parent.id !== addingChildParentId)
                return parent;

            return {
                ...parent,
                children: [
                    ...(parent.children || []),
                    {
                        id: nanoid(),
                        type: "board",
                        title: inputValue,
                        subtype: "",
                    },
                ],
            };
        });

        onChange(next);

        setAddingChildParentId(null);
        setInputValue("");
    };

    // const handleKeyDown = (
    //     e: React.KeyboardEvent<HTMLInputElement>
    // ) => {
    //
    //     if (e.key === "Escape") {
    //
    //         setAddingParent(false);
    //         setAddingChildParentId(null);
    //         setInputValue("");
    //
    //         return;
    //     }
    //
    //     if (e.key !== "Enter") return;
    //
    //     if (addingParent) {
    //         addParent();
    //         return;
    //     }
    //
    //     if (addingChildParentId) {
    //         addChild();
    //     }
    // };

    // const cancelInput = () => {
    //
    //     setAddingParent(false);
    //     setAddingChildParentId(null);
    //     setInputValue("");
    // };

    const handleDragEnd = ({
                               source,
                               destination,
                           }: any) => {

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        /**
         * Parent 이동
         */
        if (
            source.droppableId === "root" &&
            destination.droppableId === "root"
        ) {

            const next = reorder(
                items,
                source.index,
                destination.index
            );

            onChange(next);

            return;
        }

        /**
         * Parent -> Child 금지
         */
        if (
            source.droppableId === "root" &&
            destination.droppableId !== "root"
        ) {
            return;
        }

        /**
         * Child 이동
         */

        const sourceParentIndex =
            items.findIndex(
                item => item.id === source.droppableId
            );

        const destParentIndex =
            items.findIndex(
                item => item.id === destination.droppableId
            );

        if (
            sourceParentIndex === -1 ||
            destParentIndex === -1
        ) {
            return;
        }

        const next = items.map(parent => ({
            ...parent,
            children: [...(parent.children || [])],
        }));

        const [moved] =
            next[sourceParentIndex].children!.splice(
                source.index,
                1
            );

        next[destParentIndex]
            .children!
            .splice(
                destination.index,
                0,
                moved
            );

        onChange(next);
    };
    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId={"root"} type={"root"} key={menuStore.newMenuData}>
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
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                    }}
                                                >

                                                    <ItemMain {...dragProvided.dragHandleProps}>
                                                        {parent.title}
                                                    </ItemMain>

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setAddingChildParentId(parent.id);
                                                            setInputValue("");
                                                        }}
                                                    >
                                                        +
                                                    </button>

                                                </div>

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
                                                                                {child.title}

                                                                            </ItemMain>
                                                                        </Item>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            {/*{*/}
                                                            {/*    addingChildParentId === parent.id && (*/}
                                                            {/*        <input*/}
                                                            {/*            autoFocus*/}
                                                            {/*            value={inputValue}*/}
                                                            {/*            onChange={(e) => setInputValue(e.target.value)}*/}
                                                            {/*            onKeyDown={handleKeyDown}*/}
                                                            {/*            onBlur={cancelInput}*/}
                                                            {/*            placeholder="하위 메뉴"*/}
                                                            {/*        />*/}
                                                            {/*    )*/}
                                                            {/*}*/}
                                                            {childProvided.placeholder}
                                                        </List>
                                                    )}
                                                </Droppable>
                                            </Item>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                {
                                    menuStore.newMenuData &&
                                    menuStore.newMenuData.type === "parent" &&
                                    // (
                                    //     <input
                                    //         autoFocus
                                    //         value={inputValue}
                                    //         onChange={(e) => setInputValue(}
                                    //         onKeyDown={handleKeyDown}
                                    //         onBlur={cancelInput}
                                    //         placeholder="메뉴 이름"
                                    //     />
                                    // )
                                    <Input
                                        autoFocus
                                        inputType={"text"}
                                        value={menuStore.newMenuData.value}
                                        placeholder={"메뉴 이름을 입력해 주세요."}
                                        onChange={(e) => {
                                            menuStore.setAddMenuValue(e.target.value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Escape") {
                                                menuStore.setClearAddMenuData();
                                                return;
                                            }
                                            if (e.key !== "Enter") return;
                                            if(!menuStore.newMenuData.value){
                                                setToast("warning", "한글자 이상 입력해 주세요.");
                                                return;
                                            }
                                            menuStore.setAddMenu("parent");
                                        }}
                                        onBlur={menuStore.setClearAddMenuData}
                                    />
                                }
                            </List>
                        );
                    }}
                </Droppable>
            </DragDropContext>
        </>

    );
});

export default MenuTreeViewList;