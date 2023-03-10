import { useCallback } from 'react';

import { useEventListener } from 'usehooks-ts';
import useMergeState from './useMergeState';

const useKeyboardStatus = () => {
  // false: 未按下;  true: 按下;
  const [controlKeySataus, setControlKeyStatus] = useMergeState({
    ArrowRight: false,
    ArrowLeft: false,
    ArrowUp: false,
    ArrowDown: false,
    Space: false,
  });

  const handleKeyEvent = useCallback((e: KeyboardEvent, status: boolean) => {
    const { code } = e;
    // console.log('code', code, status)
    switch (code) {
      case 'ArrowRight':
      case 'KeyD':
        setControlKeyStatus({ ArrowRight: status });
        break;
      case 'ArrowLeft':
      case 'KeyA':
        setControlKeyStatus({ ArrowLeft: status });
        break;
      case 'ArrowUp':
      case 'KeyW':
        setControlKeyStatus({ ArrowUp: status });
        break;
      case 'ArrowDown':
      case 'KeyS':
        setControlKeyStatus({ ArrowDown: status });
        break;
      case 'Space':
        setControlKeyStatus({ Space: status });
        break;
    }
  }, []);

  const KeyUpEventListener = useCallback(
    (e: KeyboardEvent) => {
      handleKeyEvent(e, false);
    },
    [handleKeyEvent]
  );

  const KeyDownEventListener = useCallback(
    (e: KeyboardEvent) => {
      handleKeyEvent(e, true);
    },
    [handleKeyEvent]
  );

  useEventListener('keydown', KeyDownEventListener);
  useEventListener('keyup', KeyUpEventListener);

  return {
    right: controlKeySataus['ArrowRight'],
    left: controlKeySataus['ArrowLeft'],
    up: controlKeySataus['ArrowUp'],
    down: controlKeySataus['ArrowDown'],
    space: controlKeySataus['Space'],
  };
};

export default useKeyboardStatus;
