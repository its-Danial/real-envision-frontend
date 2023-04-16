export const fastAPIbackendRoute = "http://127.0.0.1:8000";
export const nextAPIRoute = "http://localhost:3000";

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

export function dateDiffInDays(a: Date, b: Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
