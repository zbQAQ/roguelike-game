import { mapRecoil, basicRecoil } from '@/recoil';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useMapComponents from '@/hook/useMapComponents';
import useCtxState from '@/hook/useCtxState';
import usePainter from '@/hook/usePainter';
import recoilMergeSetter from '@/utils/recoilMergeSetter';
import useKeyboardStatus from '@/hook/useKeyboardStatus';
import { useClickAnyWhere } from 'usehooks-ts';
import { useCustomEventListener } from '@/hook/useCustomEvent';
import { PLAYER_SHOOT } from '@/constant';
import {
  throwingObjectFormationAtom,
  throwingObjectFormationToArraySelector,
} from '@/recoil/throwingObject';
import ThrowingObjectItem from './ThrowingObjectItem';
import { v4 as uuidv4 } from 'uuid';
import useThrowingObjectComponents from '@/hook/useThrowingObjectComponents';

const ThrowingObjectContainer = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const setThrowingObjectFormationState = useSetRecoilState(
    throwingObjectFormationAtom
  );

  const throwingObjectFormationArray = useRecoilValue(
    throwingObjectFormationToArraySelector
  );

  const [shootStatus, setShootStatus] = useState(false);
  const [ctx, setCtx] = useCtxState(canvas);
  const { winH, winW } = useRecoilValue(basicRecoil);

  const { throwingObjectsFormation } = useThrowingObjectComponents();

  usePainter(ctx, throwingObjectsFormation);

  useCustomEventListener(PLAYER_SHOOT, (e) => {
    const { x, y, type } = e.detail;
    // create player throwing object
    // console.log('PLAYER_SHOOT', { x, y, type }, mousePosition);
    const angle = Math.atan2(x - winW / 2, y - winH / 2);

    setThrowingObjectFormationState((pre) => {
      const id = uuidv4();
      return {
        ...pre,
        [id]: {
          id,
          x,
          y,
          type,
          width: 5,
          height: 10,
          color: 'red',
          // 速度;
          velocity: {
            x: Math.cos(angle),
            y: Math.sin(angle),
          },
        },
      };
    });
  });

  return (
    <>
      {throwingObjectFormationArray.map((item) => (
        <ThrowingObjectItem key={item.id} {...item} />
      ))}
      <canvas
        className="canvas-container"
        id="throwing-object-container"
        ref={canvas}
        width={winW}
        height={winH}
      ></canvas>
    </>
  );
};

export default ThrowingObjectContainer;
