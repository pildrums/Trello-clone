import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import GlobalStyle from "styles/GlobalStyle";
import { boardModalState, todoState } from "./atoms";
import Board from "./components/Board/Board";

// function App() {
//   const [todos, setTodos] = useRecoilState(todoState);
//   const onDragEnd = (info: DropResult) => {
//     const { destination, source } = info;
//     if (!destination) return;
//     if (destination?.droppableId === source.droppableId) {
//       // 같은 보드에서 움직임
//       setTodos((allBoards) => {
//         const boardCopy = [...allBoards[source.droppableId]];
//         const taskObj = boardCopy[source.index];
//         boardCopy.splice(source.index, 1);
//         boardCopy.splice(destination?.index, 0, taskObj);
//         return {
//           ...allBoards,
//           [source.droppableId]: boardCopy,
//         };
//       });
//     }
//     if (destination.droppableId !== source.droppableId) {
//       // 다른 보드에서 움직임
//       setTodos((allBoards) => {
//         const sourceBoard = [...allBoards[source.droppableId]];
//         const taskObj = sourceBoard[source.index];
//         const destinationBoard = [...allBoards[destination.droppableId]];
//         sourceBoard.splice(source.index, 1);
//         destinationBoard.splice(destination?.index, 0, taskObj);
//         return {
//           ...allBoards,
//           [source.droppableId]: sourceBoard,
//           [destination.droppableId]: destinationBoard,
//         };
//       });
//     }
//   };
//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Wrapper>
//         <Boards>
//           {Object.keys(todos).map((boardId) => (
//             <Board boardId={boardId} key={boardId} todos={todos[boardId]} />
//           ))}
//         </Boards>
//       </Wrapper>
//     </DragDropContext>
//   );
// }

function App() {
  const setBoardModal: SetterOrUpdater<boolean> =
    useSetRecoilState(boardModalState);
  return (
    <Container>
      <GlobalStyle />
      <AddBoardButton onClick={() => setBoardModal(true)}>+</AddBoardButton>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddBoardButton = styled.button``;

// const Boards = styled.div`
//   width: 100%;
//   display: grid;
//   justify-content: center;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 10px;
// `;

export default App;
