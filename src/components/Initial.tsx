import { useWindowSize } from 'usehooks-ts';
import { basicRecoil } from '@/recoil';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import React from 'react';
import mergeSetter from '@/utils/recoilMergeSetter';

const Initial = () => {
  const setBasicState = useSetRecoilState(basicRecoil);
  const { width: winW, height: winH } = useWindowSize();

  useEffect(() => {
    mergeSetter(setBasicState, { loaded: true, winW: winW, winH: winH });
  }, [winW, winH, setBasicState]);

  return <></>;
};

export default Initial;
