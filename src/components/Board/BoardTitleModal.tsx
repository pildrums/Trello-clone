import { boardTitleModalState, ITodoState, todoState } from "atoms";
import ModalContainer from "components/common/ModalContainer";
import { useForm } from "react-hook-form";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";

interface IFormData {
  title: string;
}

function BoardTitleModal() {
  const [boardTitleModal, setBoardTitleModal] =
    useRecoilState<boolean>(boardTitleModalState);
  const { register, handleSubmit, getValues, setValue } = useForm<IFormData>({
    mode: "onChange",
  });
  const setTodos: SetterOrUpdater<ITodoState> = useSetRecoilState(todoState);
  
  const handleCloseModal = () => {};
  return (
    <ModalContainer
      isOpen={boardTitleModalState}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
      contentLabel="boardTitleModal"
    >
      <button onClick={handleCloseModal}>X</button>
      <form></form>
    </ModalContainer>
  );
}

export default BoardTitleModal;
