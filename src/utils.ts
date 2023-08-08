export function displayColorCircle(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  color: string,
  x: number,
  y: number
) {
  /**
   * FYI "!" is to ensure that ctx is not null
   */
  ctx!.clearRect(0, 0, canvas.width, canvas.height);
  ctx!.drawImage(image, 0, 0);

  ctx!.beginPath();
  ctx!.lineWidth = 5;
  ctx!.arc(x, y, 40, 0, 2 * Math.PI);
  ctx!.strokeStyle = color;
  ctx!.stroke();

  ctx!.beginPath();
  ctx!.lineWidth = 1;
  ctx!.arc(x, y, 35, 0, 2 * Math.PI);
  ctx!.strokeStyle = "black";
  ctx!.stroke();
}

export function rgbToHex(r: number, g: number, b: number): string {
  const componentToHex = (c: number) => {
    const hex: string = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
