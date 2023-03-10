import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { THROWING_OBJECT_TYPE } from '@/constant';

export type ThrowingObjectType = typeof THROWING_OBJECT_TYPE;

type ThrowingObjectKeyType = typeof THROWING_OBJECT_TYPE;
type ThrowingObjectValueType = ValueOf<ThrowingObjectKeyType>;

export interface IThrowingObject {
  id: string;
  type: ThrowingObjectValueType;
  // createX: number;
  // createY: number;
  width: number;
  height: number;
  color: string;
  x: number;
  y: number;
  // 速度;
  velocity: {
    x: number;
    y: number;
  };
}

export interface IBulletStateType {
  id: string;
  width: number;
  height: number;
  color: string;
  x: number;
  y: number;
  // 速度;
  velocity: {
    x: number;
    y: number;
  };
}

const createThrowingObjectByType = (
  type: ThrowingObjectValueType,
  id: string,
  createX: number,
  createY: number
) => {
  return {
    id,
    x: createX,
    y: createY,
    type,
    width: 5,
    height: 10,
    color: 'red',
    // 速度;
    velocity: {
      x: 1,
      y: 1,
      // x: Math.cos(angle),
      // y: Math.sin(angle),
    },
  };
};

type throwingObjectFormationAtomType = Record<string, IThrowingObject>;
export const throwingObjectFormationAtom =
  atom<throwingObjectFormationAtomType>({
    key: 'throwingObjectFormationAtom',
    default: {},
  });

export const throwingObjectFormationToArraySelector = selector<
  IThrowingObject[]
>({
  key: 'throwingObjectFormationToArraySelector',
  get: ({ get }) => {
    const throwingObjectFormation = get(throwingObjectFormationAtom);
    return Object.values(throwingObjectFormation);
  },
});

export const throwingObjectSelectorFamily = selectorFamily<
  IThrowingObject,
  string
>({
  key: 'throwingObjectSelectorFamily',
  get:
    (id) =>
    ({ get }) => {
      const throwingObjectFormation = get(throwingObjectFormationAtom);
      return throwingObjectFormation[id];
    },
  set:
    (id) =>
    ({ set, get }, newValue) => {
      const throwingObjectFormation = get(throwingObjectFormationAtom);
      set(throwingObjectFormationAtom, {
        ...throwingObjectFormation,
        [id]: newValue,
      } as throwingObjectFormationAtomType);
    },
});

// export const bulletAtomFamily = atomFamily<IBulletStateType, string>({
//   key: 'bulletAtomFamily',
//   default: (id) => {
//     return {
//       id,
//       width: 40,
//       height: 20,
//       color: 'red',
//       x: 100,
//       y: 100,
//       speed: 1,
//     };
//   },
// });
