import { mapRecoil, basicRecoil } from '@/recoil';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { drawRect } from '@/utils';
import { ICtxType } from '@/constant';

const useMapComponents = () => {
  const { winH, winW } = useRecoilValue(basicRecoil);
  const { height, width } = useRecoilValue(mapRecoil);

  const mapBackgrounpComponets = useCallback(
    (ctx: ICtxType) => {
      if (!ctx) return;

      ctx.fillStyle = '#2b2436';
      ctx.fillRect(0, 0, width, height);
    },
    [height, width],
  );

  return {
    mapBackgrounpComponets,
  };
};

export default useMapComponents;
