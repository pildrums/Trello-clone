import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

/**
 * @interface todo / index type
 */
interface IDraggableProps {
  todoId: number;
  todoText: string;
  index: number;
}

/**
 * @param todo
 * @param index
 * @returns DraggableCard Components Rendering
 */
function DraggableCard({ todoId, todoText, index }: IDraggableProps) {
  return (
    <Draggable draggableId={todoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {todoText}
        </Card>
      )}
    </Draggable>
  );
}

const Card = styled.div<{ isDragging: boolean }>`
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  background: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "2px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

export default React.memo(DraggableCard);
