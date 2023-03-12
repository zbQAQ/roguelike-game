import useCtxState from '@/hook/useCtxState';
import { basicRecoil } from '@/recoil';
import { enemyFormationAtom } from '@/recoil/enemy';
import React, { useRef, useEffect } from 'react';
import { Rect } from 'react-konva';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useInterval } from 'usehooks-ts';
import EnemyItem from './EnemyItem';
import { v4 as uuidv4 } from 'uuid';
import { ObjectIdCreator } from '@/utils';
import { random } from 'lodash';
import { ENEMY_TYPE } from '@/constant';

const EnemyContainer = () => {
  const enemyCount = 100;
  const { winH, winW } = useRecoilValue(basicRecoil);

  const [enemyFormation, setEnemyFormation] =
    useRecoilState(enemyFormationAtom);

  useInterval(
    () => {
      const x = random(0, winW - 30);
      const y = random(0, winH - 30);
      const newId = ObjectIdCreator({ type: ENEMY_TYPE.TRACKER, x, y });
      console.log('newId', newId);
      setEnemyFormation((pre) => [...pre, newId]);
    },
    enemyFormation.length >= enemyCount ? null : 500
  );

  return (
    <>
      {enemyFormation.map((id) => (
        <EnemyItem key={id} id={id} />
      ))}
    </>
  );
};

export default EnemyContainer;
