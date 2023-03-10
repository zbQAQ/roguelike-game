import { FRAME_RATE } from '@/constant';
import {
  basicRecoil,
  palyerCenterPointSelector,
  palyerRectPropertySelector,
} from '@/recoil';
import {
  enemyCountSelector,
  enemyFormationAtom,
  enemyFormationToArraySelector,
} from '@/recoil/enemy';
import { drawRect, impackDetectOfObjects } from '@/utils';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useInterval } from 'usehooks-ts';
import { random } from 'lodash';
import { v4 as uuid } from 'uuid';
import { isOverlap } from '@/utils';

const useEnemyComponents = () => {
  const COUNT = 10;
  const [enemys, setEnemys] = useRecoilState(enemyFormationAtom);
  const enemyCount = useRecoilValue(enemyCountSelector);
  const { winH, winW } = useRecoilValue(basicRecoil);
  const { x: playerCenterX, y: playerCenterY } = useRecoilValue(
    palyerCenterPointSelector
  );

  const playerProperty = useRecoilValue(palyerRectPropertySelector);

  const enemyFormation = useCallback(
    (ctx: ICtxType) => {
      if (!ctx) return;

      const enemyIds = Object.keys(enemys);

      for (let i = 0; i < enemyIds.length; i++) {
        const enemyId = enemyIds[i];
        const { x, y, width, height, color } = enemys[enemyId];

        drawRect(ctx, x, y, width, height, 0, color, 'fill');
      }
    },
    [
      enemys,
      // playerCenterX,
      // playerCenterY,
    ]
  );

  // useInterval(() => {
  //   setEnemys((enemys) => {
  //     const newEnemysArray = Object.values(enemyFormation);
  //     for (let i = 0; i < newEnemysArray.length; i++) {
  //       const enemy = newEnemysArray[i];
  //       if (isOverlap(enemy, playerProperty)) {
  //         continue;
  //       }
  //       const { x, y, speed } = enemy;
  //       const dx = playerCenterX - x;
  //       const dy = playerCenterY - y;
  //       const distance = Math.sqrt(dx * dx + dy * dy);
  //       let unitX = dx / distance;
  //       let unitY = dy / distance;
  //       const newX = x + unitX * speed;
  //       const newY = y + unitY * speed;

  //       const newEnemy = {
  //         ...enemy,
  //         x: newX,
  //         y: newY,
  //       };

  //       const { flag: overlap, direction: overlapDir } = impackDetectOfObjects(
  //         newEnemy,
  //         newEnemysArray.filter((i) => i.id !== enemy.id && i.speed === 0)
  //       );

  //       if (overlap) {
  //         if (overlapDir === 'bottom' || overlapDir === 'top') {
  //           newEnemy.y = y;
  //           newEnemy.x += unitY;
  //         }

  //         if (overlapDir === 'left' || overlapDir === 'right') {
  //           newEnemy.x = x;
  //           newEnemy.y += unitX;
  //         }
  //       }

  //       newEnemysArray[i] = newEnemy;
  //     }
  //     const result: any = {};
  //     for (let i = 0; i < newEnemysArray.length; i++) {
  //       result[newEnemysArray[i].id] = newEnemysArray[i];
  //     }
  //     return result;
  //   });
  // }, FRAME_RATE);

  useInterval(
    () => {
      setEnemys((pre) => {
        const id = uuid();
        return {
          ...pre,
          [id]: {
            id,
            x: random(0, winW - 30),
            y: random(0, winH - 30),
            width: 30,
            height: 30,
            color: 'blue',
            speed: random(0, 3),
          },
        };
      });
    },
    enemyCount >= COUNT ? null : 10
  );

  return {
    enemyFormation,
  };
};

export default useEnemyComponents;
