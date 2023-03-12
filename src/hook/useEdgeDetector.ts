import { basicRecoil } from '@/recoil';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';

const useEdgeDetector = () => {
  const { winH, winW } = useRecoilValue(basicRecoil);

  const detector = useCallback(
    (x: number, y: number, w: number, h: number) => {
      if (
        x + w / 2 < 0 ||
        y + h / 2 < 0 ||
        x - w / 2 > winW ||
        y - h / 2 > winH
      ) {
        return true;
      }
      return false;
    },
    [winH, winW]
  );

  return detector;
};

export default useEdgeDetector;
