import { atom } from 'recoil';

interface IPlayerStateType {
  width: number;
  height: number;
  color: string;
  x: number;
  y: number;
  speed: number;
}

export const playerRecoil = atom<IPlayerStateType>({
  key: 'playerRecoil',
  default: {
    width: 20,
    height: 20,
    x: 0,
    y: 0,
    speed: 6,
    color: '#CD3017',
  },
});
