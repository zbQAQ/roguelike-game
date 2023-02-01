import { mapRecoil, basicRecoil, playerRecoil } from '@/recoil';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEventListener, useInterval } from 'usehooks-ts';
import useKeyboardStatus from '@/hook/useKeyboardStatus';
import useMapComponents from '@/hook/useMapComponents';
import usePainter from '@/hook/usePainter';
import useCtxState from '@/hook/useCtxState';
import { FRAME_RATE } from '@/constant';
import usePlayComponents from '@/hook/usePlayComponents';

const PlayContainer = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useCtxState();
  const { winH, winW } = useRecoilValue(basicRecoil);
  const [state, setState] = useRecoilState(playerRecoil);
  const { mainCharacter } = usePlayComponents();
  const { up, right, down, left } = useKeyboardStatus();
  const { x, y, width, height } = state;

  usePainter(ctx, mainCharacter);

  useEffect(() => {
    setCtx(canvas.current ? canvas.current.getContext('2d') : null);
  }, [canvas, setCtx]);

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

  return (
    <canvas
      className='canvas-container'
      id='player-container'
      ref={canvas}
      width={winW}
      height={winH}
    ></canvas>
  );
};

export default PlayContainer;
