import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

/**
 * @interface atom types -> [key: string]: string[]
 */
interface ITodoState {
  [key: string]: ITodo[];
}

/**
 * @todo string으로 되어있는 데이터 수정 예정
 * @constant todoState todo 상태
 */

export const todoState = atom<ITodoState>({
  key: "todo",
  default: {
    todo: [],
    doing: [],
    done: [],
  },
});
