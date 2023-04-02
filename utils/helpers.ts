export const backendApiRoute = "http://127.0.0.1:8000";

export const generateRandomSeed = () => {
  return Math.floor(Math.random() * 10000);
};

export function convertImageToBase64(imgUrl: string) {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = image.naturalHeight;
    canvas.width = image.naturalWidth;
    ctx!.drawImage(image, 0, 0);
    const dataUrl = canvas.toDataURL();
  };
  return (image.src = imgUrl);
}
