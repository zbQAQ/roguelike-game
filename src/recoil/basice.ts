import { atom } from 'recoil';

interface IBasicStateType {
  // loaded status
  loaded: boolean;
  // window width
  winW: number;
  // window height
  winH: number;
}

export const basicRecoil = atom<IBasicStateType>({
  key: 'basicRecoil',
  default: {
    loaded: false,
    winW: 0,
    winH: 0,
  },
});
