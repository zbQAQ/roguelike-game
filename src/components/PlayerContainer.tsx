import { basicRecoil, palyerCenterPointSelector, playerRecoil } from '@/recoil';
import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEventListener, useInterval } from 'usehooks-ts';
import useKeyboardStatus from '@/hook/useKeyboardStatus';
// import useMapComponents from '@/hook/useMapComponents';
import usePainter from '@/hook/usePainter';
import useCtxState from '@/hook/useCtxState';
import { FRAME_RATE, PLAYER_SHOOT, THROWING_OBJECT_TYPE } from '@/constant';
import usePlayComponents from '@/hook/usePlayComponents';
import useMouseClickStatus from '@/hook/useMouseClickStatus';
import { useCustomEventTrigger } from '@/hook/useCustomEvent';
import useMousePosition from '@/hook/useMousePosition';

const PlayContainer = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [ctx] = useCtxState(canvas);
  const { winH, winW } = useRecoilValue(basicRecoil);
  const setState = useSetRecoilState(playerRecoil);
  const { x: playerCenterX, y: playerCenterY } = useRecoilValue(
    palyerCenterPointSelector
  );
  const { mainCharacter, lineOfSight } = usePlayComponents();
  const { up, right, down, left } = useKeyboardStatus();
  const { status: mouseStatus } = useMouseClickStatus();
  const mousePosition = useMousePosition();
  const shootTrigger = useCustomEventTrigger();

  usePainter(ctx, mainCharacter, lineOfSight);

  useEffect(() => {
    setState((pre) => {
      return {
        ...pre,
        x: winW / 2 - pre.width / 2,
        y: winH / 2 - pre.height / 2,
      };
    });
  }, [winH, winW, setState]);

  useInterval(() => {
    if (up) {
      setState((pre) => ({
        ...pre,
        y: pre.y - pre.speed <= 0 ? 0 : pre.y - pre.speed,
      }));
    }
    if (right) {
      setState((pre) => ({
        ...pre,
        x:
          pre.x + pre.speed >= winW - pre.width
            ? winW - pre.width
            : pre.x + pre.speed,
      }));
    }
    if (down) {
      setState((pre) => ({
        ...pre,
        y:
          pre.y + pre.speed >= winH - pre.height
            ? winH - pre.height
            : pre.y + pre.speed,
      }));
    }
    if (left) {
      setState((pre) => ({
        ...pre,
        x: pre.x - pre.speed <= 0 ? 0 : pre.x - pre.speed,
      }));
    }
  }, FRAME_RATE);

  // player shoot
  useInterval(
    () => {
      shootTrigger(PLAYER_SHOOT, {
        x: playerCenterX,
        y: playerCenterY,
        type: THROWING_OBJECT_TYPE.BULLET,
        mousePosition,
      });
    },
    mouseStatus ? 500 : null
  );

  return (
    <canvas
      className="canvas-container"
      id="player-container"
      ref={canvas}
      width={winW}
      height={winH}
    ></canvas>
  );
};

export default PlayContainer;
