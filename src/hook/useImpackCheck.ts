import { useCallback } from 'react';

interface IRectProperty {
  x: number;
  y: number;
  width: number;
  height: number;
}

type ICheckObject = Pick<IRectProperty, 'x' | 'y' | 'height' | 'width'>;

const useImpackCheck = (items: ICheckObject[]) => {
  const checker = useCallback(
    (main: ICheckObject) => {
      for (let i = 0; i < items.length; i++) {
        const square1 = items[i];
        const square2 = main;

        // 检查两个正方形的外接矩形是否相交
        if (
          square1.x + square1.width < square2.x ||
          square2.x + square2.width < square1.x ||
          square1.y + square1.height < square2.y ||
          square2.y + square2.height < square1.y
        ) {
          return false;
        }

        // 检查两个正方形的中心点距离是否小于它们的半径之和
        const square1Center = {
          x: square1.x + square1.width / 2,
          y: square1.y + square1.height / 2,
        };
        const square2Center = {
          x: square2.x + square2.width / 2,
          y: square2.y + square2.height / 2,
        };
        const distance = Math.sqrt(
          Math.pow(square1Center.x - square2Center.x, 2) +
            Math.pow(square1Center.y - square2Center.y, 2)
        );
        const radiusSum =
          (square1.width + square1.height + square2.width + square2.height) / 4;

        return distance < radiusSum;
      }
    },
    [items]
  );

  return checker;
};

export default useImpackCheck;
