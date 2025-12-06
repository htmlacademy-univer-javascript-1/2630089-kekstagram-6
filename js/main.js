import './form.js';
import './filters.js';
import { drawMiniatures } from './miniatureDrawer.js';
import { loadImages } from './requests.js';

const start = async () => {
  const res = await loadImages();
  if (res.ok) {
    document
      .querySelector('.img-filters')
      .classList.remove('img-filters--inactive');
    window.IMAGES = res.data;
    drawMiniatures(res.data);
  }
};
start();
