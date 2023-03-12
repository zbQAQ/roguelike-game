import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { ENEMY_TYPE } from '@/constant';
import { ObjectIdPaser } from '@/utils';

type EnemyKeyType = typeof ENEMY_TYPE;
type EnemyValueType = ValueOf<EnemyKeyType>;

// Enemy id structure
// uuid/t:v1,x:v2,y:v3
export type IEnemyFormation = string;

export interface IEnemy {
  id: string;
  type: EnemyValueType;
  width: number;
  height: number;
  color: string;
  x: number;
  y: number;
  death: boolean;
  speed: number;
}

const createEnemyByType = (id: string) => {
  const { t: type, x, y } = ObjectIdPaser(id);
  return {
    id,
    x: Number(x),
    y: Number(y),
    type: ENEMY_TYPE.TRACKER,
    width: 30,
    height: 30,
    color: 'blue',
    death: false,
    speed: 1,
  };
};

export const enemyFormationAtom = atom<IEnemyFormation[]>({
  key: 'enemyFormationAtom',
  default: [],
});

export const enemyAtomFamily = atomFamily<IEnemy, string>({
  key: 'enemyAtomFamily',
  default: (id) => createEnemyByType(id),
});
