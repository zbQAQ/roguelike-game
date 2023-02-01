import { ICtxType } from '@/constant';
import { basicRecoil } from '@/recoil';
import { useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const usePainter = (
  ctx: ICtxType,
  ...componentsRender: Array<(ctx: ICtxType) => void>
) => {
  const { winH, winW } = useRecoilValue(basicRecoil);

  const painter = useCallback(() => {
    if (ctx) {
      ctx.clearRect(0, 0, winW, winH);
      [...componentsRender].forEach((render) => {
        render(ctx);
      });
    }
  }, [ctx, winH, winW, componentsRender]);

  useEffect(() => {
    requestAnimationFrame(painter);
  }, [painter]);

  return painter;
};

export default usePainter;
