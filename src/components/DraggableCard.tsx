import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableProps {
  todo: string;
  index: number;
}

function DraggableCard({ todo, index }: IDraggableProps) {
  return (
    <Draggable key={todo} draggableId={todo} index={index}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {todo}
        </Card>
      )}
    </Draggable>
  );
}

const Card = styled.div`
  padding: 10px 10px;
  border-radius: 5px;
  background: ${(props) => props.theme.cardColor};
  margin-bottom: 5px;
`;

export default DraggableCard;
