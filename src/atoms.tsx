import { atom, selector } from "recoil";

/**
 * @constant minuteState - minutes 초기 상태값
 */
export const minuteState = atom({
  key: "minutes",
  default: 0,
});

/**
 * @constant hourSelector - minute에서 60을 나눠서 hours input에 표현하는 selector
 * @description get은 atom에 접근할 때 사용
 * @description set은 atom의 초기값을 수정할 때 사용
 */
export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  },
});
