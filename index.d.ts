interface IAnyAction<T> extends IActionType<T> {
  // payload?: any
  // dispatch 不再显示 key， 需 reducer 根据不同类型约定使用不同key
  [extraProps: string]: any;
}

type ICtxType = CanvasRenderingContext2D | null;

interface IWindowSize {
  winH: number;
  winW: number;
}

type ValueOf<T> = T[keyof T];
