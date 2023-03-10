import { FRAME_RATE } from '@/constant';
import usePainter from '@/hook/usePainter';
import useBulletObjectComponents from '@/hook/useThrowingObjectComponents/useBulletObjectComponents';
import {
  IThrowingObject,
  throwingObjectSelectorFamily,
} from '@/recoil/throwingObject';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { useInterval } from 'usehooks-ts';

interface IProps extends IThrowingObject {}

const ThrowingObjectItem: FC<IProps> = (props) => {
  const { id } = props;
  const [currentThrowingObject, setCurrentThrowingObject] = useRecoilState(
    throwingObjectSelectorFamily(id)
  );

  // console.log('ThrowingObjectItem', props);
  // const { throwingObjectRenderer } = useBulletObjectComponents(id);

  // usePainter(ctx, throwingObjectRenderer);

  useInterval(() => {
    setCurrentThrowingObject((preValue) => {
      const { x, y, velocity } = preValue;
      return {
        ...preValue,
        x: x + velocity.x,
        y: y + velocity.y,
      };
    });
  }, FRAME_RATE);

  return null;
};

export default ThrowingObjectItem;
