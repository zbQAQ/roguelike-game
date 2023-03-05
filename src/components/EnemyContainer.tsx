import useCtxState from '@/hook/useCtxState';
import useEnemyComponents from '@/hook/useEnemyComponents';
import usePainter from '@/hook/usePainter';
import { basicRecoil } from '@/recoil';
import React, { useRef, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const EnemyContainer = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const { winH, winW } = useRecoilValue(basicRecoil);
  const [ctx] = useCtxState(canvas);

  const { enemyFormation } = useEnemyComponents();

  usePainter(ctx, enemyFormation);

  return (
    <canvas
      className="canvas-container"
      id="enemy-container"
      ref={canvas}
      width={winW}
      height={winH}
    ></canvas>
  );
};

export default EnemyContainer;
