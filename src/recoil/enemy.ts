import { atom, atomFamily, selector, selectorFamily } from 'recoil';

export interface IEnemyStateType {
  id: string;
  width: number;
  height: number;
  color: string;
  x: number;
  y: number;
  speed: number;
}

export const enemyFormationAtom = atom<Record<string, IEnemyStateType>>({
  key: 'enemyFormationAtom',
  default: {},
});

export const enemyFormationToArraySelector = selector<IEnemyStateType[]>({
  key: 'enemyFormationToArraySelector',
  get: ({ get }) => {
    const enemyFormation = get(enemyFormationAtom);
    return Object.values(enemyFormation);
  },
});

export const enemySelector = selectorFamily<IEnemyStateType, string>({
  key: 'enemySelector',
  get:
    (id) =>
    ({ get }) => {
      // get values from individual atoms:
      const enemyFormation = get(enemyFormationAtom);
      // then combine into desired shape (object) and return:
      return enemyFormation[id];
    },
  set:
    (id) =>
    ({ set, get }, value) => {
      const enemyFormation = get(enemyFormationAtom);
      set(enemyFormationAtom, {
        ...enemyFormation,
        [id]: value as IEnemyStateType,
      });
    },
});

export const enemyCountSelector = selector({
  key: 'enemyCountSelector',
  get: ({ get }) => {
    const enemyFormation = get(enemyFormationAtom);
    return Object.keys(enemyFormation).length;
  },
});
