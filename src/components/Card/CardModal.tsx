import { ITodoState, todoState, cardModalState, cardState, ITodo } from "atoms";
import ModalContainer from "components/common/ModalContainer";
import { useForm } from "react-hook-form";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import { handleSaveTodoInLocalStorage } from "todo.utils";

interface IFormData {
  text: string;
}

function CardModal() {
  const { register, handleSubmit, getValues, setValue } = useForm<IFormData>({
    mode: "onChange",
  });
  const setTodos: SetterOrUpdater<ITodoState> = useSetRecoilState(todoState);
  const [cardModal, setCardModal] = useRecoilState<boolean>(cardModalState);
  const [card, setCard] = useRecoilState(cardState);

  const handleCloseModal = (): void => {
    return setCardModal(false);
  };

  const onValild = (): void => {
    setTodos((todos) => {
      const { text } = getValues();
      const copyTodos = [...todos[Object.keys(card)[0]]];
      const editTodoIndex = copyTodos.findIndex(
        (todo) => todo.id === Object.values(card)[0]
      );
      copyTodos.splice(editTodoIndex, 1);
      const editTodo: ITodo = { id: Object.values(card)[0], text };
      copyTodos.splice(editTodoIndex, 0, editTodo);
      const result = { ...todos, [Object.keys(card)[0]]: copyTodos };
      handleSaveTodoInLocalStorage(result);
      console.log("result", result);
      return result;
    });
    setCard({});
    setValue("text", "");
    handleCloseModal();
  };

  return (
    <ModalContainer
      isOpen={cardModal}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
      contentLabel="cardModal"
    >
      <button onClick={handleCloseModal}>X</button>
      <form onSubmit={handleSubmit(onValild)}>
        <div>
          <h1>할 일 수정</h1>
          <input
            {...register("text", { required: "입력란에 입력하세요." })}
            type="text"
            placeholder="수정 사항을 입력하세요."
          />
        </div>
      </form>
    </ModalContainer>
  );
}

export default CardModal;
