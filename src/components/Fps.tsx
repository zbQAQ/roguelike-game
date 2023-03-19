import React, {
  FC,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react';

import '@/style/fps.css';

export const Fsp: FC = () => {
  const [fps, setFps] = useState(0);

  const perTime = useRef(performance.now());
  const frames = useRef(0);

  const calculateFps = useCallback(() => {
    const time = performance.now();
    frames.current += 1;
    if (time > perTime.current + 1000) {
      let fps = Math.round((frames.current * 1000) / (time - perTime.current));
      perTime.current = time;
      frames.current = 0;
      setFps(fps);
    }

    requestAnimationFrame(calculateFps);
  }, []);

  useLayoutEffect(() => {
    requestAnimationFrame(calculateFps);
  }, [calculateFps]);

  return <div className="fps-container">{fps}</div>;
};

export default Fsp;
