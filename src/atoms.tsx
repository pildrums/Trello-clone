import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

export interface ITodoState {
  [key: string]: ITodo[];
}

// localStorage
export const PIL_TRELLO_TODO = "PIL_TRELLO_TODO";
const localStorageTodo = localStorage.getItem(PIL_TRELLO_TODO) || "{}";
const parsedLocalStorageTodo = JSON.parse(localStorageTodo);

// board
export const boardState = atom({ key: "boardState", default: [] });
export const boardTitleState = atom<string>({
  key: "boardTitleState",
  default: "",
});
export const boardModalState = atom<boolean>({
  key: "boardModalState",
  default: false,
});
export const boardTitleModalState = atom<boolean>({
  key: "boardTitleModalState",
  default: false,
});

// todo
export const todoState = atom<ITodoState>({
  key: "todoState",
  default: parsedLocalStorageTodo,
});

// card
export const cardState = atom<object>({ key: "cardState", default: {} });
export const cardModalState = atom<boolean>({
  key: "cardModalState",
  default: false,
});

// garbage
export const garbageState = atom({ key: "garbageState", default: [] });
