import { Dispatch, SetStateAction, useState } from 'react';

function useMergeState<T = any>(
  initialState: T,
): [T, Dispatch<SetStateAction<Partial<T>>>] {
  const [state, setState] = useState<T>(initialState);
  const setMergedState = (newState: SetStateAction<Partial<T>>) =>
    setState((prevState) => Object.assign({}, prevState, newState));
  return [state, setMergedState];
}

export default useMergeState;
