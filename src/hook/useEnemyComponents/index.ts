import { FRAME_RATE, ICtxType } from '@/constant';
import {
  basicRecoil,
  palyerCenterPointSelector,
  palyerRectPropertySelector,
} from '@/recoil';
import { enemyFormationAtom } from '@/recoil/enemy';
import { drawRect, impackDetectOfObjects } from '@/utils';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useInterval } from 'usehooks-ts';
import { random } from 'lodash';
import { v4 as uuid } from 'uuid';
import { isOverlap } from '@/utils';

const useEnemyComponents = () => {
  const enemyCount = 4;
  const [enemys, setEenemys] = useRecoilState(enemyFormationAtom);
  const { winH, winW } = useRecoilValue(basicRecoil);
  const { x: playerCenterX, y: playerCenterY } = useRecoilValue(
    palyerCenterPointSelector
  );

  const playerProperty = useRecoilValue(palyerRectPropertySelector);

  const enemyFormation = useCallback(
    (ctx: ICtxType) => {
      if (!ctx) return;

      for (let i = 0; i < enemys.length; i++) {
        const enemy = enemys[i];
        const { x, y, width, height, color } = enemy;

        drawRect(ctx, x, y, width, height, 0, color, 'fill');
      }
    },
    [
      enemys,
      // playerCenterX,
      // playerCenterY,
    ]
  );

  useInterval(() => {
    setEenemys((enemys) => {
      const newEnemys = [...enemys];
      for (let i = 0; i < newEnemys.length; i++) {
        const enemy = newEnemys[i];
        if (isOverlap(enemy, playerProperty)) {
          continue;
        }
        const { x, y, speed } = enemy;
        const dx = playerCenterX - x;
        const dy = playerCenterY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let unitX = dx / distance;
        let unitY = dy / distance;
        const newX = x + unitX * speed;
        const newY = y + unitY * speed;

        const newEnemy = {
          ...enemy,
          x: newX,
          y: newY,
        };

        const { flag: overlap, direction: overlapDir } = impackDetectOfObjects(
          newEnemy,
          enemys.filter((i) => i.id !== enemy.id && i.speed === 0)
        );

        if (overlap) {
          if (overlapDir === 'bottom' || overlapDir === 'top') {
            newEnemy.y = y;
            newEnemy.x += unitY;
          }

          if (overlapDir === 'left' || overlapDir === 'right') {
            newEnemy.x = x;
            newEnemy.y += unitX;
          }
        }

        newEnemys[i] = newEnemy;
      }
      return newEnemys;
    });
  }, FRAME_RATE);

  useInterval(
    () => {
      setEenemys((pre) => {
        return [
          ...pre,
          {
            id: uuid(),
            x: random(0, winW - 30),
            y: random(0, winH - 30),
            width: 30,
            height: 30,
            color: 'blue',
            speed: random(0, 3),
          },
        ];
      });
    },
    enemys.length >= enemyCount ? null : 10
  );

  return {
    enemyFormation,
  };
};

export default useEnemyComponents;
