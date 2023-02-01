import { atom } from 'recoil';
import { MAP_MAX_WIDTH, MAP_MAX_HEIGHT } from '@/constant';

interface IMapStateType {
  width: number;
  height: number;
}

export const mapRecoil = atom<IMapStateType>({
  key: 'mapRecoil',
  default: {
    width: MAP_MAX_WIDTH,
    height: MAP_MAX_HEIGHT,
  },
});
