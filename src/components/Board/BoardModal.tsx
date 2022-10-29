import { boardModalState, ITodoState, todoState } from "atoms";
import ModalContainer from "components/common/ModalContainer";
import { useForm } from "react-hook-form";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import { handleSaveTodoInLocalStorage } from "todo.utils";

interface IFormData {
  title: string;
}

function BoardModal() {
  const [boardModal, setBoardModal] = useRecoilState<boolean>(boardModalState);
  const setTodos: SetterOrUpdater<ITodoState> = useSetRecoilState(todoState);
  const { register, handleSubmit, getValues, setValue } = useForm<IFormData>({
    mode: "onChange",
  });

  const handleCloseModal = (): void => {
    return setBoardModal(false);
  };

  const onValid = (): void => {
    setTodos((todos: ITodoState) => {
      const { title } = getValues();
      const result: ITodoState = { [title]: [], ...todos };
      handleSaveTodoInLocalStorage(result);
      return result;
    });
    setValue("title", "");
    handleCloseModal();
  };

  return (
    <ModalContainer
      isOpen={boardModal}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
      contentLabel="boardModal"
    >
      <button onClick={handleCloseModal}>X</button>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <h1>보드 추가</h1>
          <input
            {...register("title", { required: "보드를 추가하세요!" })}
            type="text"
            placeholder="보드를 추가하세요!"
          />
        </div>
      </form>
    </ModalContainer>
  );
}

export default BoardModal;
