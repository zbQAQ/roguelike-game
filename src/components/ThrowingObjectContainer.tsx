import { mapRecoil, basicRecoil } from '@/recoil';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useCtxState from '@/hook/useCtxState';
import usePainter from '@/hook/usePainter';
import recoilMergeSetter from '@/utils/recoilMergeSetter';
import useKeyboardStatus from '@/hook/useKeyboardStatus';
import { useClickAnyWhere } from 'usehooks-ts';
import { useCustomEventListener } from '@/hook/useCustomEvent';
import { PLAYER_SHOOT, THROWING_OBJECT_REMOVE } from '@/constant';
import { throwingObjectFormationAtom } from '@/recoil/throwingObject';
import ThrowingObjectItem from './ThrowingObjectItem';
import { v4 as uuidv4 } from 'uuid';

const ThrowingObjectContainer = () => {
  const [throwingObjectFormation, setThrowingObjectFormation] = useRecoilState(
    throwingObjectFormationAtom
  );
  useCustomEventListener(PLAYER_SHOOT, (e) => {
    const { x, y, type, mousePosition } = e.detail;

    const angle = Math.atan2(y - mousePosition.y, x - mousePosition.x);

    setThrowingObjectFormation((pre) => {
      const id = uuidv4();
      return [...pre, `${id}/t:${type},x:${x},y:${y},angle:${angle}`];
    });
  });

  useCustomEventListener(THROWING_OBJECT_REMOVE, (e) => {
    const { id } = e.detail;

    setThrowingObjectFormation((pre) => pre.filter((item) => item !== id));
  });

  return (
    <>
      {throwingObjectFormation.map((id) => (
        <ThrowingObjectItem key={id} id={id} />
      ))}
    </>
  );
};

export default ThrowingObjectContainer;
