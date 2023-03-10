import { FRAME_RATE } from '@/constant';
import {
  basicRecoil,
  palyerCenterPointSelector,
  palyerRectPropertySelector,
} from '@/recoil';
import { enemyCountSelector, enemyFormationAtom } from '@/recoil/enemy';
import { drawRect, impackDetectOfObjects } from '@/utils';
import { useCallback, useEffect } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { useInterval } from 'usehooks-ts';
import { random } from 'lodash';
import { v4 as uuid } from 'uuid';
import { isOverlap } from '@/utils';
import {
  throwingObjectFormationAtom,
  throwingObjectFormationToArraySelector,
} from '@/recoil/throwingObject';

const useThrowingObjectComponents = () => {
  const throwingObjectFormationToArray = useRecoilValue(
    throwingObjectFormationToArraySelector
  );

  const throwingObjectsFormation = useCallback(
    (ctx: ICtxType) => {
      const length = throwingObjectFormationToArray.length;
      if (!ctx || length <= 0) return;

      for (let i = 0; i < throwingObjectFormationToArray.length; i++) {
        const { x, y, width, height, color } =
          throwingObjectFormationToArray[i];
        drawRect(ctx, x, y, width, height, 0, color, 'fill');
      }
    },
    [throwingObjectFormationToArray]
  );

  return {
    throwingObjectsFormation,
  };
};

export default useThrowingObjectComponents;
