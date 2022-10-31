import {
  DragDropContext,
  DragStart,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, ITodoState, todoState } from "atoms";
import DroppableGarbage from "./DroppableGarbage";
import DroppableBoard from "./DroppableBoard";
import { handleSaveTodoInLocalStorage } from "todo.utils";

/**
 * @returns DragDropContainer Component
 */

function DragDropContainer() {
  // state
  const [todos, setTodos] = useRecoilState(todoState);

  // function
  const onDragStart = (initial: DragStart, provided: ResponderProvided) => {};
  const onDragEnd = (
    { draggableId, destination, source }: DropResult,
    provided: ResponderProvided,
  ) => {
    if (destination?.index === undefined) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      setTodos((todos: ITodoState) => {
        const copySource: ITodo[] = [...todos[source.droppableId]];
        const movedTodoObject: ITodo = copySource[source.index];
        copySource.splice(source.index, 1);
        copySource.splice(destination.index, 0, movedTodoObject);
        const result: ITodoState = {
          ...todos,
          [destination.droppableId]: copySource,
        };
        handleSaveTodoInLocalStorage(result);
        return result;
      });
    } else if (source.droppableId !== destination.droppableId) {
      if (destination.droppableId === "garbage") {
        setTodos((todos: ITodoState) => {
          const copySource: ITodo[] = [...todos[source.droppableId]];
          copySource.splice(source.index, 1);
          const result: ITodoState = {
            ...todos,
            [source.droppableId]: copySource,
          };
          handleSaveTodoInLocalStorage(result);
          return result;
        });
      } else {
        setTodos((todos: ITodoState) => {
          const copySource: ITodo[] = [...todos[source.droppableId]];
          const movedTodoObject: ITodo = copySource[source.index];
          copySource.splice(source.index, 1);
          const copyDestination: ITodo[] = [...todos[destination.droppableId]];
          copyDestination.splice(destination.index, 0, movedTodoObject);
          const result: ITodoState = {
            ...todos,
            [source.droppableId]: copySource,
            [destination.droppableId]: copyDestination,
          };
          handleSaveTodoInLocalStorage(result);
          return result;
        });
      }
    }
  };

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
