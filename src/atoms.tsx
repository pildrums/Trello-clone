import { atom } from "recoil";

/**
 * @interface atom types -> [key: string]: string[]
 */
interface ITodoState {
  [key: string]: string[];
}

/**
 * @todo string으로 되어있는 데이터 수정 예정
 * @constant todoState todo 상태
 */

export const todoState = atom<ITodoState>({
  key: "todo",
  default: {
    todo: ["a", "b"],
    doing: ["c", "d"],
    done: ["e"],
  },
});
