import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableProps {
  todo: string;
  index: number;
}

function DraggableCard({ todo, index }: IDraggableProps) {
  return (
    <Draggable key={todo} draggableId={todo} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {todo}
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
