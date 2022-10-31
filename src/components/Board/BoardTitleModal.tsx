import {
  boardTitleModalState,
  boardTitleState,
  ITodoState,
  todoState,
} from "atoms";
import ModalContainer from "components/common/ModalContainer";
import { useForm } from "react-hook-form";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";

interface IFormData {
  title: string;
}

function BoardTitleModal() {
  // state
  const [boardTitleModal, setBoardTitleModal] =
    useRecoilState<boolean>(boardTitleModalState);
  const { register, handleSubmit, getValues, setValue } = useForm<IFormData>({
    mode: "onChange",
  });
  const setTodos: SetterOrUpdater<ITodoState> = useSetRecoilState(todoState);
  const [boardTitle, setBoardTitle] = useRecoilState<string>(boardTitleState);

  // function
  const handleCloseModal = () => {};
  const onValid = () => {};

  return (
    <ModalContainer
      isOpen={boardTitleModal}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
      contentLabel="boardTitleModal"
    >
      <button onClick={handleCloseModal}>X</button>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <h1>보드 수정</h1>
          <input
            {...register("title", { required: "보드를 수정하세요." })}
            type="text"
            placeholder="보드를 수정하세요."
          />
        </div>
      </form>
    </ModalContainer>
  );
}

export default BoardTitleModal;
