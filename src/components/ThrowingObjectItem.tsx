import { FRAME_RATE, THROWING_OBJECT_REMOVE } from '@/constant';
import usePainter from '@/hook/usePainter';
import {
  IThrowingObject,
  throwingObjectAtomFamily,
} from '@/recoil/throwingObject';
import { FC, useEffect } from 'react';
import { Circle, Rect } from 'react-konva';
import { useRecoilState } from 'recoil';
import { useInterval } from 'usehooks-ts';
import React from 'react';
import useEdgeDetector from '@/hook/useEdgeDetector';
import { useCustomEventTrigger } from '@/hook/useCustomEvent';

interface IProps {
  id: string;
}

const ThrowingObjectItem: FC<IProps> = (props) => {
  const { id } = props;
  const [currentThrowingObject, setCurrentThrowingObject] = useRecoilState(
    throwingObjectAtomFamily(id)
  );

  const edgeDetector = useEdgeDetector();
  const eventTrigger = useCustomEventTrigger();

  const { x, y, width, height, color, death } = currentThrowingObject;

  useEffect(() => {
    if (death) {
      eventTrigger(THROWING_OBJECT_REMOVE, { id });
    }
  }, [death, eventTrigger, id]);

  useInterval(
    () => {
      setCurrentThrowingObject((preValue) => {
        const { x, y, width, height, velocity } = preValue;
        const newX = x + velocity.x;
        const newY = y + velocity.y;
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

  if (death) {
    return null;
  }

  return <Circle x={x} y={y} fill={color} radius={width} />;
};

export default ThrowingObjectItem;
