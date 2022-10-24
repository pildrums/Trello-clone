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
 */
export const hourSelector = selector({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
});
