import { useEffect, useState, MutableRefObject } from 'react';

const useCtxState = (canvas: MutableRefObject<HTMLCanvasElement | null>) => {
  const ctxState = useState<ICtxType>(null);

  useEffect(() => {
    ctxState[1](
      canvas && canvas.current ? canvas.current.getContext('2d') : null
    );
  }, [canvas, ctxState]);

  return ctxState;
};

export default useCtxState;
