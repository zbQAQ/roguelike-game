type ICtxType = CanvasRenderingContext2D;

const getDrawStyle = (type: 'fill' | 'stroke') => {
  switch (type) {
    case 'fill': {
      return 'fillStyle';
    }
    case 'stroke': {
      return 'strokeStyle';
    }
    default: {
      return 'fillStyle';
    }
  }
};

export const drawRect = (
  ctx: ICtxType,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  color: string,
  type: 'fill' | 'stroke',
) => {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
  ctx.lineTo(x + width - radius, y + height);
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  ctx.lineTo(x + width, y + radius);
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
  ctx.lineTo(x + radius, y);
  ctx.quadraticCurveTo(x, y, x, y + radius);
  ctx[getDrawStyle(type)] = color;
  ctx.closePath();
  ctx[type]();
};
