import "./form.js";
import { drawMiniatures } from "./miniatureDrawer.js";
import { loadImages } from "./requests.js";

const start = async () => {
  const data = await loadImages();
  drawMiniatures(data);
};
start();
