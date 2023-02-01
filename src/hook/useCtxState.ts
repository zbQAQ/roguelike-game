import { ICtxType } from '@/constant';
import { useState } from 'react';

const useCtxState = () => {
  return useState<ICtxType>(null);
};

export default useCtxState;
