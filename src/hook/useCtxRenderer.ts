import { DependencyList, useCallback } from 'react';

const useCtxRenderer = (callback: any, deps: DependencyList) => {
  const ctxRendererCallback = useCallback(
    (ctx: ICtxType) => {
      if (!ctx) return;

      callback(ctx);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callback, ...deps]
  );

  return ctxRendererCallback;
};

export default useCtxRenderer;
