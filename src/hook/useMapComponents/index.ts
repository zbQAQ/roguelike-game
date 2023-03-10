import { mapRecoil } from '@/recoil';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
// import { drawRect } from '@/utils';

const useMapComponents = () => {
  // const { winH, winW } = useRecoilValue(basicRecoil);s
  const { height, width } = useRecoilValue(mapRecoil);

  const mapBackgrounpComponets = useCallback(
    (ctx: ICtxType) => {
      if (!ctx) return;

      ctx.fillStyle = '#2b2436';
      ctx.fillRect(0, 0, width, height);
    },
    [height, width]
  );

  return {
    mapBackgrounpComponets,
  };
};

export default useMapComponents;
