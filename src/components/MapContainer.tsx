import { mapRecoil, basicRecoil } from '@/recoil';
import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useMapComponents from '@/hook/useMapComponents';
import useCtxState from '@/hook/useCtxState';
import usePainter from '@/hook/usePainter';
import recoilMergeSetter from '@/utils/recoilMergeSetter';

const MapContainer = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useCtxState();
  const { winH, winW } = useRecoilValue(basicRecoil);
  const [, setMapState] = useRecoilState(mapRecoil);
  const { mapBackgrounpComponets } = useMapComponents();

  usePainter(ctx, mapBackgrounpComponets);

  useEffect(() => {
    setCtx(canvas.current ? canvas.current.getContext('2d') : null);
  }, [canvas, setCtx]);

  useEffect(() => {
    recoilMergeSetter(setMapState, { width: winW, height: winH });
  }, [winH, winW, setMapState]);

  return (
    <canvas
      className='canvas-container'
      id='map-container'
      ref={canvas}
      width={winW}
      height={winH}
    ></canvas>
  );
};

export default MapContainer;
