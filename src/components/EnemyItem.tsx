import { FRAME_RATE, THROWING_OBJECT_REMOVE } from '@/constant';
import usePainter from '@/hook/usePainter';
import {
  IThrowingObject,
  throwingObjectAtomFamily,
} from '@/recoil/throwingObject';
import { FC, useEffect } from 'react';
import { Circle, Rect } from 'react-konva';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useInterval } from 'usehooks-ts';
import React from 'react';
import useEdgeDetector from '@/hook/useEdgeDetector';
import { useCustomEventTrigger } from '@/hook/useCustomEvent';
import { enemyAtomFamily } from '@/recoil/enemy';
import { palyerCenterPointSelector } from '@/recoil';

interface IProps {
  id: string;
}

const EnemyItem: FC<IProps> = (props) => {
  const { id } = props;
  const [currentEnemy, setCurrentEnemy] = useRecoilState(enemyAtomFamily(id));
  const { x: playerCenterX, y: playerCenterY } = useRecoilValue(
    palyerCenterPointSelector
  );

  const edgeDetector = useEdgeDetector();
  // const eventTrigger = useCustomEventTrigger();

  const { x, y, width, height, color, death } = currentEnemy;

  // useEffect(() => {
  //   if (death) {
  //     eventTrigger(THROWING_OBJECT_REMOVE, { id });
  //   }
  // }, [death, eventTrigger, id]);

  useInterval(
    () => {
      setCurrentEnemy((preValue) => {
        const { x, y, width, height, speed } = preValue;
        const dx = playerCenterX - x;
        const dy = playerCenterY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let unitX = dx / distance;
        let unitY = dy / distance;
        const newX = x + unitX * speed;
        const newY = y + unitY * speed;

        return {
          ...preValue,
          x: newX,
          y: newY,
          death: edgeDetector(newX, newY, width, height),
        };
      });
    },
    death ? null : FRAME_RATE
  );

  // if (death) {
  //   return null;
  // }

  return <Rect x={x} y={y} width={width} height={height} fill={color} />;
};

export default EnemyItem;
