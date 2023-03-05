import { atom, selector } from 'recoil';

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

export const palyerCenterPointSelector = selector({
  key: 'palyerCenterPointSelector',
  get: ({ get }) => {
    const { x, y, width, height } = get(playerRecoil);
    return {
      x: x + width / 2,
      y: y + height / 2,
    };
  },
});

export const palyerRectPropertySelector = selector({
  key: 'palyerRectPropertySelector',
  get: ({ get }) => {
    const { x, y, width, height } = get(playerRecoil);
    return { x, y, width, height };
  },
});
