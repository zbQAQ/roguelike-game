interface IRectProperty {
  x: number;
  y: number;
  width: number;
  height: number;
}

type ICheckObject = Pick<IRectProperty, 'x' | 'y' | 'height' | 'width'>;

export function impackDetectOfObjects(
  square1: ICheckObject,
  squareObjects: ICheckObject[]
) {
  for (let i = 0; i < squareObjects.length; i++) {
    const square2 = squareObjects[i];
    if (isOverlap(square1, square2)) {
      return {
        flag: true,
        direction: getOverlapDirection(square1, square2),
        target: square2,
      };
    }
  }

  return { flag: false, direction: null, target: null };
}

export function isOverlap(square1: ICheckObject, square2: ICheckObject) {
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

function getOverlapDirection(square1: ICheckObject, square2: ICheckObject) {
  if (!isOverlap(square1, square2)) return null; // 如果两个正方形不相交，则返回 null

  // 计算两个正方形中心点的横向和纵向距离
  const centerX1 = square1.x + square1.width / 2;
  const centerY1 = square1.y + square1.height / 2;
  const centerX2 = square2.x + square2.width / 2;
  const centerY2 = square2.y + square2.height / 2;
  const distX = Math.abs(centerX1 - centerX2);
  const distY = Math.abs(centerY1 - centerY2);

  // 判断相交的方向
  // 返回 square2 被相交的方向
  if (distX < distY) {
    if (centerY1 < centerY2) {
      return 'top';
    } else {
      return 'bottom';
    }
  } else {
    if (centerX1 < centerX2) {
      return 'left';
    } else {
      return 'right';
    }
  }
}
