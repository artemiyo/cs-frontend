const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const grayscaleButton = document.getElementById("grayscale");
const inverseButton = document.getElementById("inverse");

const image = new Image();
image.src = "./assets/home.jpg";

image.addEventListener("load", () => {
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);
});

class ImageFilters {
  constructor() {}

  public grayscale(imageData: ImageData) {
    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }

    return imageData;
  }

  public inverse(imageData: ImageData) {
    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    return imageData;
  }
}

const imageFilters = new ImageFilters();

const grayscale = (path: string) => {
  const image = new Image();
  image.src = path;

  image.addEventListener("load", () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    const data = imageFilters.grayscale(imageData);

    ctx.putImageData(data, 0, 0);
  });
};

const inverse = (path: string) => {
  const image = new Image();
  image.src = path;

  image.addEventListener("load", () => {
    const { width, height } = image;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageFilters.inverse(imageData);
    ctx.putImageData(data, 0, 0);
  });
};

grayscaleButton.addEventListener("click", () => grayscale("./assets/home.jpg"));
inverseButton.addEventListener("click", () => inverse("./assets/home.jpg"));
