import { ITodoState, PIL_TRELLO_TODO } from "atoms";

export const handleSaveTodoInLocalStorage = (result: ITodoState): void => {
  return localStorage.setItem(PIL_TRELLO_TODO, JSON.stringify(result));
};
