import {
  initCanvas,
  handleMouseMove,
  handleCanvasClick,
  toggleDropper,
} from "./canvas";

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;
const dropperButton: HTMLButtonElement = document.getElementById(
  "dropper"
) as HTMLButtonElement;

const ctx: CanvasRenderingContext2D = initCanvas(canvas);

canvas.addEventListener("mousemove", (e) => handleMouseMove(e, ctx, canvas));
canvas.addEventListener("click", (e) => handleCanvasClick(e, ctx));
dropperButton.addEventListener("click", () => toggleDropper(canvas));
