const canvas = document.querySelector("canvas");

const grayscale = (param: string) => {
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.src = param;

  image.addEventListener("load", () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const avg =
        (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      imageData.data[i] = avg;
      imageData.data[i + 1] = avg;
      imageData.data[i + 2] = avg;
      imageData.data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
  });
};

const inverse = (param: string) => {
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.src = param;

  image.addEventListener("load", () => {
    const { width, height } = image;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
      data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
  });
};
