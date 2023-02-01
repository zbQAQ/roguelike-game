import { useState, useCallback } from 'react';

import { useEventListener } from 'usehooks-ts';

const useKeyboardStatus = () => {
  // false: 未按下;  true: 按下;
  const [controlKeySataus, setControlKeyStatus] = useState({
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
        setControlKeyStatus((oldVal) => ({ ...oldVal, ArrowRight: status }));
        break;
      case 'ArrowLeft':
      case 'KeyA':
        setControlKeyStatus((oldVal) => ({ ...oldVal, ArrowLeft: status }));
        break;
      case 'ArrowUp':
      case 'KeyW':
        setControlKeyStatus((oldVal) => ({ ...oldVal, ArrowUp: status }));
        break;
      case 'ArrowDown':
      case 'KeyS':
        setControlKeyStatus((oldVal) => ({ ...oldVal, ArrowDown: status }));
        break;
      case 'Space':
        setControlKeyStatus((oldVal) => ({ ...oldVal, Space: status }));
        break;
    }
  }, []);

  const KeyUpEventListener = useCallback(
    (e: KeyboardEvent) => {
      handleKeyEvent(e, false);
    },
    [handleKeyEvent],
  );

  const KeyDownEventListener = useCallback(
    (e: KeyboardEvent) => {
      handleKeyEvent(e, true);
    },
    [handleKeyEvent],
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
