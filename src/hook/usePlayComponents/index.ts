import { palyerCenterPointSelector, playerRecoil } from '@/recoil';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { drawLine, drawRect } from '@/utils';
import { ICtxType } from '@/constant';
import useMousePosition from '@/hook/useMousePosition';

const usePlayComponents = () => {
  // const { winH, winW } = useRecoilValue(basicRecoil);
  const { x, y, height, width, color } = useRecoilValue(playerRecoil);
  const { x: centerX, y: centerY } = useRecoilValue(palyerCenterPointSelector);
  const { x: mouseX, y: mouseY } = useMousePosition();

  const mainCharacter = useCallback(
    (ctx: ICtxType) => {
      if (!ctx) return;

      drawRect(ctx, x, y, width, height, 0, color, 'fill');
    },
    [x, y, height, width, color]
  );

  const lineOfSight = useCallback(
    (ctx: ICtxType) => {
      if (!ctx) return;

      drawLine(ctx, centerX, centerY, mouseX, mouseY, 'red', 'stroke');
    },
    [centerX, centerY, mouseX, mouseY]
  );

  return {
    mainCharacter,
    lineOfSight,
  };
};

export default usePlayComponents;
