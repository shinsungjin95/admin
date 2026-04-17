import React from "react";
import {DragDropContext, Droppable, Draggable} from "@hello-pangea/dnd";
import {Item, ItemMain, List} from "@components/DragAndDrop/style.tsx";



const reorder = (list, start, end) => {
    const copy = [...list];
    const [removed] = copy.splice(start, 1);
    copy.splice(end, 0, removed);
    return copy;
};


const normalize = (list) => {
    return list.map((parent, parentIdx) => ({
        ...parent,
        order: parentIdx + 1,
        children: (parent.children || []).map((child, childIdx) => ({
            ...child,
            order: childIdx + 1,
        })),
    }));
};

const DragDropList = ({items = [], onChange}) => {

    const handleDragEnd = ({source, destination}) => {
        if (!destination) return;
        const same = source.droppableId === destination.droppableId && source.index === destination.index;
        if (same) return;
        if (source.droppableId === "root" && destination.droppableId !== "root") return;

        const sourceParentIdx = parseInt(source.droppableId);
        const destParentIdx = parseInt(destination.droppableId);

        if (source.droppableId === "root" && destination.droppableId === "root") {
            const next = reorder(items, source.index, destination.index);
            onChange(normalize(next));
            return;
        }


        if (!isNaN(sourceParentIdx) && !isNaN(destParentIdx)) {
            const next = items.map((parent) => ({
                ...parent,
                children: [...(parent.children || [])],
            }));
            const [moved] = next[sourceParentIdx].children.splice(source.index, 1);
            next[destParentIdx].children.splice(destination.index, 0, moved);
            onChange(normalize(next));
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId={"root"} type={"root"}>
                {(provided) => (
                    <List ref={provided.innerRef} {...provided.droppableProps}>
                        {items.map((parent, pIdx) => (
                            <Draggable
                                key={`p-${pIdx}`}
                                draggableId={`p-${pIdx}`}
                                index={pIdx}
                            >
                                {(dragProvided, snapshot) => (
                                    <Item
                                        ref={dragProvided.innerRef}
                                        {...dragProvided.draggableProps}
                                        $dragging={snapshot.isDragging}
                                    >
                                        <ItemMain {...dragProvided.dragHandleProps}>
                                            {parent.name}
                                        </ItemMain>

                                        <Droppable droppableId={`${pIdx}`} type={"child"}>
                                            {(childProvided, childSnap) => (
                                                <List
                                                    ref={childProvided.innerRef}
                                                    {...childProvided.droppableProps}
                                                    $over={childSnap.isDraggingOver}
                                                    $childWrap={true}
                                                >
                                                    {parent.children?.map((child, cIdx) => (
                                                        <Draggable
                                                            key={`c-${pIdx}-${cIdx}`}
                                                            draggableId={`c-${pIdx}-${cIdx}`}
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
                                                                        {child.name}
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
                )}
            </Droppable>
        </DragDropContext>
    );
};
export default DragDropList;