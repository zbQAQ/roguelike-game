import { basicRecoil, palyerCenterPointSelector, playerRecoil } from '@/recoil';
import React, { useEffect, useMemo, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEventListener, useInterval } from 'usehooks-ts';
import useKeyboardStatus from '@/hook/useKeyboardStatus';
// import useMapComponents from '@/hook/useMapComponents';
import usePainter from '@/hook/usePainter';
import useCtxState from '@/hook/useCtxState';
import { FRAME_RATE, PLAYER_SHOOT, THROWING_OBJECT_TYPE } from '@/constant';
import useMouseClickStatus from '@/hook/useMouseClickStatus';
import { useCustomEventTrigger } from '@/hook/useCustomEvent';
import useMousePosition from '@/hook/useMousePosition';
import { Line, Rect } from 'react-konva';

const PlayContainer = () => {
  const { winH, winW } = useRecoilValue(basicRecoil);
  const [playerState, setPlayerState] = useRecoilState(playerRecoil);
  const { x: playerCenterX, y: playerCenterY } = useRecoilValue(
    palyerCenterPointSelector
  );
  const { up, right, down, left } = useKeyboardStatus();
  const { status: mouseStatus } = useMouseClickStatus();
  const mousePosition = useMousePosition();
  const eventTrigger = useCustomEventTrigger();

  const lineOfSightPointers = useMemo(
    () => [playerCenterX, playerCenterY, mousePosition.x, mousePosition.y],
    [playerCenterX, playerCenterY, mousePosition]
  );

  useEffect(() => {
    setPlayerState((pre) => {
      return {
        ...pre,
        x: winW / 2 - pre.width / 2,
        y: winH / 2 - pre.height / 2,
      };
    });
  }, [winH, winW, setPlayerState]);

  useInterval(() => {
    if (up) {
      setPlayerState((pre) => ({
        ...pre,
        y: pre.y - pre.speed <= 0 ? 0 : pre.y - pre.speed,
      }));
    }
    if (right) {
      setPlayerState((pre) => ({
        ...pre,
        x:
          pre.x + pre.speed >= winW - pre.width
            ? winW - pre.width
            : pre.x + pre.speed,
      }));
    }
    if (down) {
      setPlayerState((pre) => ({
        ...pre,
        y:
          pre.y + pre.speed >= winH - pre.height
            ? winH - pre.height
            : pre.y + pre.speed,
      }));
    }
    if (left) {
      setPlayerState((pre) => ({
        ...pre,
        x: pre.x - pre.speed <= 0 ? 0 : pre.x - pre.speed,
      }));
    }
  }, FRAME_RATE);

  // player shoot
  useInterval(
    () => {
      eventTrigger(PLAYER_SHOOT, {
        x: playerCenterX,
        y: playerCenterY,
        type: THROWING_OBJECT_TYPE.BULLET,
        mousePosition,
      });
    },
    mouseStatus ? 200 : null
  );

  return (
    <>
      <Rect
        x={playerState.x}
        y={playerState.y}
        width={playerState.width}
        height={playerState.height}
        fill={playerState.color}
        shadowBlur={5}
      />
      <Line x={0} y={0} stroke="red" points={lineOfSightPointers} />
    </>
  );
};

export default PlayContainer;
