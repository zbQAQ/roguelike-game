import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { THROWING_OBJECT_TYPE } from '@/constant';
import { ObjectIdPaser } from '@/utils';

type ThrowingObjectKeyType = typeof THROWING_OBJECT_TYPE;
type ThrowingObjectValueType = ValueOf<ThrowingObjectKeyType>;

// throwingObject id structure
// uuid/t:v1,x:v2,y:v3,angle:v4
export type IThrowingObjectFormation = string;

export interface IThrowingObject {
  id: string;
  type: ThrowingObjectValueType;
  angle: number;
  // createX: number;
  // createY: number;
  width: number;
  height: number;
  color: string;
  x: number;
  y: number;
  death: boolean;
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

const createThrowingObjectById = (id: string) => {
  const { x: createX, y: createY, angle, t: type } = ObjectIdPaser(id);
  return {
    id,
    angle: Number(angle),
    x: Number(createX),
    y: Number(createY),
    type: THROWING_OBJECT_TYPE.BULLET,
    width: 5,
    height: 5,
    color: 'red',
    death: false,
    // 速度;
    velocity: {
      x: -Math.cos(Number(angle)) * 3.5,
      y: -Math.sin(Number(angle)) * 3.5,
    },
  };
};

export const throwingObjectFormationAtom = atom<IThrowingObjectFormation[]>({
  key: 'throwingObjectFormationAtom',
  default: [],
});

export const throwingObjectAtomFamily = atomFamily<IThrowingObject, string>({
  key: 'throwingObjectFormationAtom',
  default: (id) => createThrowingObjectById(id),
});
