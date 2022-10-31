import { memo } from "react";
import { cardModalState, cardState, ITodo, ITodoState, todoState } from "atoms";
import React from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { handleSaveTodoInLocalStorage } from "todo.utils";

/**
 * @interface todo / index type
 */
interface IDraggableProps {
  todoId: number;
  boardId: string;
  todoText: string;
  index: number;
}

/**
 * @param todo
 * @param index
 * @returns DraggableCard Components Rendering
 */
function DraggableCard({ todoId, boardId, todoText, index }: IDraggableProps) {
  // state
  const setTodos: SetterOrUpdater<ITodoState> = useSetRecoilState(todoState);
  const setCardModal: SetterOrUpdater<boolean> =
    useSetRecoilState(cardModalState);
  const setCard: SetterOrUpdater<object> = useSetRecoilState(cardState);

  // function
  const handleEditTodo = (boardId: string, todoId: number) => {
    setCard({ [boardId]: todoId });
    setCardModal(true);
  };

  const handleDeleteTodo = (todoId: number) => {
    setTodos((todos: ITodoState) => {
      const copyTodos: ITodo[] = [...todos[boardId]];
      const filterTodos: ITodo[] = copyTodos.filter(
        (todo: ITodo) => todo.id !== todoId
      );
      const result = { ...todos, [boardId]: filterTodos };
      handleSaveTodoInLocalStorage(result);
      return result;
    });
  };

  // render
  return (
    <Draggable draggableId={todoId + ""} index={index}>
      {(
        provided: DraggableProvided,
        { isDragging }: DraggableStateSnapshot
      ) => (
        <Card
          isDragging={isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <CardText isDragging={isDragging}>{todoText}</CardText>
          <CardEditButton
            isDragging={isDragging}
            onClick={() => handleEditTodo(boardId, todoId)}
          >
            ✎
          </CardEditButton>
          <CardDeleteButton
            isDragging={isDragging}
            onClick={() => handleDeleteTodo(todoId)}
          >
            X
          </CardDeleteButton>
        </Card>
      )}
    </Draggable>
  );
}

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging === true
      ? "rgba(85, 239, 196, 0.6)"
      : props.theme.cardColor};
  color: ${(props) => (props.isDragging === true ? "white" : "black")};
  border: 3px solid
    ${(props) =>
      props.isDragging === true
        ? "rgba(85, 239, 196, 1)"
        : props.theme.cardColor};
  border-radius: 5px;
  padding: 13px 12px;
  margin-bottom: 10px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardText = styled.span<{ isDragging: boolean }>`
  font-size: 18px;
  color: ${(props) => (props.isDragging === true ? "white" : "darkgray")};
  margin-right: auto;
`;

const CardEditButton = styled.button<{ isDragging: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.isDragging === true ? "white" : "rgba(178, 190, 195,1.0)"};
  color: ${(props) =>
    props.isDragging === true ? "rgba(178, 190, 195,1.0)" : "white"};
  padding: 4.5px 7px;
  border-radius: 3px;
  font-size: 12px;
  margin-right: 5px;
`;

const CardDeleteButton = styled.button<{ isDragging: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.isDragging === true ? "white" : "rgba(178, 190, 195,1.0)"};
  color: ${(props) =>
    props.isDragging === true ? "rgba(178, 190, 195,1.0)" : "white"};
  padding: 5px 7px;
  border-radius: 3px;
  font-size: 12px;
`;

export default memo(DraggableCard);
