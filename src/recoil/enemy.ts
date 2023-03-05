import { atom } from 'recoil';

export interface IEnemyStateType {
  id: string;
  width: number;
  height: number;
  color: string;
  x: number;
  y: number;
  speed: number;
}

export const enemyFormationAtom = atom<IEnemyStateType[]>({
  key: 'enemyRecoil',
  default: [],
});
