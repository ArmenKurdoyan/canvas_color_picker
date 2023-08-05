const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const header = <HTMLInputElement>document.getElementById("picked_color_value");
const dropperButton = <HTMLDivElement>document.getElementById("dropper");
const canvasImage = <HTMLImageElement>document.getElementById("image");

let isDropperActive = false;

/**
 * CORS is blocking actions on local images.
 *
 * The way to handle it is to provide image with simple Node server.
 * that will send the image as a response to 3000 port
 * but if ports are different will get the CORS.
 *
 */

const image = new Image();
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

canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("click", handleCanvasClick);
dropperButton.addEventListener("click", toggleDropper);

function handleMouseMove(event: MouseEvent) {
  if (isDropperActive) {
    const { offsetX, offsetY } = event;
    const pixel = ctx!.getImageData(offsetX, offsetY, 1, 1).data;
    const colorHex = rgbToHex(pixel[0], pixel[1], pixel[2]);
    displayColorCircle(colorHex, offsetX, offsetY);
  }
}

function handleCanvasClick(event: MouseEvent) {
  if (isDropperActive) {
    const { offsetX, offsetY } = event;
    const pixel = ctx!.getImageData(offsetX, offsetY, 1, 1).data;
    const colorHex = rgbToHex(pixel[0], pixel[1], pixel[2]);
    displayPickedColor(colorHex);
  }
}

function toggleDropper() {
  isDropperActive = !isDropperActive;
  canvas.style.cursor = isDropperActive
    ? "url(path/to/dropper-icon.png), auto"
    : "auto";
}

/**
 * Had issues with using provided SVG so replacd it with code.
 * Provided SVG should be set to canvas.style.cursor
 */

function displayColorCircle(color: string, x: number, y: number) {
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

function displayPickedColor(color: string) {
  header.value = color;
}

function rgbToHex(r: number, g: number, b: number): string {
  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
