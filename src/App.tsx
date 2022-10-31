import BoardModal from "components/Board/BoardModal";
import BoardTitleModal from "components/Board/BoardTitleModal";
import DragDropContainer from "components/Board/DragDropContainer";
import CardModal from "components/Card/CardModal";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import styled from "styled-components";
import GlobalStyle from "styles/GlobalStyle";
import { boardModalState } from "./atoms";

function App() {
  const setBoardModal: SetterOrUpdater<boolean> =
    useSetRecoilState(boardModalState);
  return (
    <Container>
      <GlobalStyle />
      <AddBoardButton onClick={() => setBoardModal(true)}>+</AddBoardButton>
      <BoardModal />
      <BoardTitleModal />
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

const AddBoardButton = styled.button`
  position: absolute;
  top: 40px;
  right: 50px;
  border: none;
  outline: none;
  background-color: rgba(178, 190, 195, 0.5);
  box-shadow: rgb(0 0 0 / 35%) 0px 5px 35px;
  color: white;
  padding: 10px 17px;
  border-radius: 50%;
  font-size: 25px;
  cursor: pointer;
`;

export default App;
