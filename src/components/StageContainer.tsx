import { basicRecoil } from '@/recoil';
import React from 'react';
import { Stage, Layer } from 'react-konva';
import { useRecoilValue } from 'recoil';
import PlayerContainer from '@/components/PlayerContainer';
import EnemyContainer from '@/components/EnemyContainer';
import ThrowingObjectContainer from '@/components/ThrowingObjectContainer';

const StageContainer = () => {
  const { winH, winW } = useRecoilValue(basicRecoil);
  return (
    <Stage width={winW} height={winH}>
      <Layer>
        <PlayerContainer />
        <EnemyContainer />
        <ThrowingObjectContainer />
      </Layer>
    </Stage>
  );
};

export default StageContainer;
