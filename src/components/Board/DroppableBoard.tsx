import {
  boardTitleModalState,
  boardTitleState,
  ITodo,
  ITodoState,
  todoState,
} from "atoms";
import DraggableCard from "components/Card/DraggableCard";
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { handleSaveTodoInLocalStorage } from "todo.utils";

interface IDroppableBoardProps {
  boardId: string;
  todos: ITodo[];
}

interface IFormData {
  text: string;
}

function DroppableBoard({ boardId, todos }: IDroppableBoardProps) {
  // state
  const { register, handleSubmit, setValue, getValues } = useForm<IFormData>({
    mode: "onChange",
    defaultValues: { text: "" },
  });
  const setTodos: SetterOrUpdater<ITodoState> = useSetRecoilState(todoState);
  const setBoardTitleModal: SetterOrUpdater<boolean> =
    useSetRecoilState(boardTitleModalState);
  const setBoardTitle: SetterOrUpdater<string> =
    useSetRecoilState(boardTitleState);

  // function
  const handleEditBoard = (boardId: string) => {
    setBoardTitle(boardId);
    setBoardTitleModal(true);
  };
  const handleDeleteBoard = (boardId: string) => {
    setTodos((todos: ITodoState) => {
      const copyTodos: ITodoState = { ...todos };
      delete copyTodos[boardId];
      const result: ITodoState = copyTodos;
      handleSaveTodoInLocalStorage(result);
      return result;
    });
  };
  const onValid = () => {
    setTodos((todos: ITodoState) => {
      const { text } = getValues();
      const createdtodo: ITodo = { id: Date.now(), text };
      const result: ITodoState = {
        ...todos,
        [boardId]: [createdtodo, ...todos[boardId]],
      };
      handleSaveTodoInLocalStorage(result);
      return result;
    });
    setValue("text", "");
  };

  // render
  return (
    <Container>
      <DeleteBoardButton onClick={() => handleDeleteBoard(boardId)}>
        X
      </DeleteBoardButton>
      <Droppable droppableId={boardId}>
        {(
          provided: DroppableProvided,
          {
            isDraggingOver,
            draggingOverWith,
            draggingFromThisWith,
            isUsingPlaceholder,
          }: DroppableStateSnapshot,
        ) => (
          <Board ref={provided.innerRef} {...provided.droppableProps}>
            <BoardId onClick={() => handleEditBoard(boardId)}>
              {boardId}
            </BoardId>
            <BoardForm onSubmit={handleSubmit(onValid)}>
              <BoardInput
                {...register("text", { required: "할 일을 입력하세요." })}
                type="text"
                placeholder={`할 일을 추가하세요.`}
              />
            </BoardForm>
            <BoardContent
              isDraggingOver={isDraggingOver}
              draggingFromThisWith={Boolean(draggingFromThisWith)}
            >
              {todos.map((todo: ITodo, index: number) => (
                <DraggableCard
                  key={todo.id}
                  index={index}
                  boardId={boardId}
                  todoId={todo.id}
                  todoText={todo.text}
                />
              ))}
              {provided.placeholder}
            </BoardContent>
          </Board>
        )}
      </Droppable>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const DeleteBoardButton = styled.button`
  position: absolute;
  top: 12px;
  right: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: lightgray;
  color: white;
  padding: 3px 5px;
  border-radius: 50px;
  font-size: 12px;
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 25px 10px;
  border-radius: 5px;
  min-height: 200px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  text-align: center;
`;

const BoardId = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 13px;
  color: rgba(45, 52, 54, 1);
  cursor: pointer;
`;

const BoardForm = styled.form``;

const BoardInput = styled.input`
  border: none;
  outline: none;
  padding: 16px 30px;
  padding-left: 10px;
  border-radius: 5px;
  width: calc(100% - 60px);
  font-size: 15px;
`;

const BoardContent = styled.div<{
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}>`
  height: calc(100% - 30px);
  border-radius: 5px;
  transition: all 0.5s;
  padding: 10px;
  margin-top: 8px;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.isDraggingOver === true
      ? props.theme.boardBgColor
      : props.draggingFromThisWith === true
      ? "rgba(225, 112, 85,0.5)"
      : "transparent"};
`;

export default DroppableBoard;
