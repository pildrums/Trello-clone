import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "atoms";
import DroppableGarbage from "./DroppableGarbage";
import DroppableBoard from "./DroppableBoard";

/**
 * @todo onDragStart 기능 구현
 * @todo onDragEnd 기능 구현
 * @returns DragDropContainer Component
 */

function DragDropContainer() {
  const [todos, setTodos] = useRecoilState(todoState);
  const onDragStart = () => {};
  const onDragEnd = () => {};

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Boards>
        {Object.keys(todos).map((boardId: string) => (
          <DroppableBoard
            key={boardId}
            boardId={boardId}
            todos={todos[boardId]}
          />
        ))}
      </Boards>
      <Garbage>
        <DroppableGarbage />
      </Garbage>
    </DragDropContext>
  );
}

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 20px;
`;

const Garbage = styled.div`
  width: 150px;
  height: 150px;
  position: fixed;
  bottom: 0;
  right: 0;
`;

export default DragDropContainer;
