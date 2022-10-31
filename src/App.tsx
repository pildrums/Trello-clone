import BoardModal from "components/Board/BoardModal";
import DragDropContainer from "components/Board/DragDropContainer";
import CardModal from "components/Card/CardModal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import GlobalStyle from "styles/GlobalStyle";
import { boardModalState, todoState } from "./atoms";

function App() {
  const setBoardModal: SetterOrUpdater<boolean> =
    useSetRecoilState(boardModalState);
  return (
    <Container>
      <GlobalStyle />
      <AddBoardButton onClick={() => setBoardModal(true)}>+</AddBoardButton>
      <BoardModal />
      <CardModal />
      <DragDropContainer />
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

export default App;
