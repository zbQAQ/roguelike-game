import { useState } from 'react';
import { useEventListener } from 'usehooks-ts';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEventListener('mousemove', (ev) => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
  });

  return mousePosition;
};

export default useMousePosition;
