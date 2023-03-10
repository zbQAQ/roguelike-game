import { useState, useCallback } from 'react';

import { useEventListener } from 'usehooks-ts';
import useMergeState from './useMergeState';

const useMouseClickStatus = () => {
  // false: 未按下;  true: 按下;
  const [status, setStatus] = useState(false);
  const [mousePosition, setMousePosition] = useMergeState<[number, number]>([
    0, 0,
  ]); // [x, y]

  const mouseUpEventListener = useCallback(() => {
    setStatus(false);
  }, []);

  const mouseDownEventListener = useCallback(
    (e: MouseEvent) => {
      setStatus(true);
      setMousePosition([e.clientX, e.clientY]);
    },
    [setMousePosition]
  );

  useEventListener('mousedown', mouseDownEventListener);
  useEventListener('mouseup', mouseUpEventListener);

  return {
    status,
    mousePosition,
  };
};

export default useMouseClickStatus;
