import { displayColorCircle, rgbToHex } from "./utils";
import { displayPickedColor } from "./colorInfo";

let isDropperActive: boolean = false;
let imageRoot: HTMLImageElement;

export function initCanvas(canvas: HTMLCanvasElement) {
  const canvasImage = <HTMLImageElement>document.getElementById("image");

  const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
  const image: HTMLImageElement = new Image();
  image.src =
    "https://img1.wallspic.com/previews/7/8/4/2/22487/22487-visual_arts-acrylic_paint-contemporary_art-graphic_design-film-x750.jpg";
  image.crossOrigin = "Anonymous";
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
  };

  canvasImage.style.height = "100%";
  canvasImage.style.width = "100%";

  canvas.width = canvasImage.width;
  canvas.height = canvasImage.height;
  ctx!.drawImage(image, 0, 0);
  imageRoot = image;
  return ctx;
}

export function handleMouseMove(
  event: MouseEvent,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  if (isDropperActive) {
    const { offsetX, offsetY } = event;
    const pixel: Uint8ClampedArray = ctx!.getImageData(offsetX, offsetY, 1, 1).data;
    const colorHex: string = rgbToHex(pixel[0], pixel[1], pixel[2]);
    displayColorCircle(canvas, ctx, imageRoot, colorHex, offsetX, offsetY);
  }
}

export function handleCanvasClick(
  event: MouseEvent,
  ctx: CanvasRenderingContext2D
) {
  if (isDropperActive) {
    const offsetX: number = event.offsetX;
    const offsetY: number = event.offsetY;
    const pixel: Uint8ClampedArray = ctx.getImageData(offsetX, offsetY, 1, 1).data;
    const colorHex: string = rgbToHex(pixel[0], pixel[1], pixel[2]);
    displayPickedColor({ color: colorHex });
  }
}

export function toggleDropper(canvas: HTMLCanvasElement) {
  isDropperActive = !isDropperActive;
  canvas.style.cursor = isDropperActive
    ? "url(path/to/dropper-icon.png), auto"
    : "auto";
}
