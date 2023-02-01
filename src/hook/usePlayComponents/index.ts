import { playerRecoil } from '@/recoil';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { drawRect } from '@/utils';
import { ICtxType } from '@/constant';

const usePlayComponents = () => {
  // const { winH, winW } = useRecoilValue(basicRecoil);
  const { x, y, height, width, color } = useRecoilValue(playerRecoil);

  const mainCharacter = useCallback(
    (ctx: ICtxType) => {
      if (!ctx) return;

      drawRect(ctx, x, y, width, height, 0, color, 'fill');
    },
    [x, y, height, width, color],
  );

  return {
    mainCharacter,
  };
};

export default usePlayComponents;
