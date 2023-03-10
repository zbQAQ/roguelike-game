import { drawRect } from '@/utils';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
// import { bulletAtomFamily } from '@/recoil/throwingObject';

const useBulletObjectComponents = (id: string) => {
  // const throwingObjects = useRecoilValue(bulletAtomFamily(id));

  // const throwingObjectRenderer = useCallback(
  //   (ctx: ICtxType) => {
  //     if (!ctx) return;
  //     const { x, y, width, height, color } = throwingObjects;
  //     drawRect(ctx, x, y, width, height, 0, color, 'fill');
  //   },
  //   [throwingObjects]
  // );
  return {
    // throwingObjectRenderer,
  };
};

export default useBulletObjectComponents;
