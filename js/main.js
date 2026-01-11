import { configureForm } from './form.js';
import { configureFilters } from './filters.js';
import { drawMiniatures } from './miniature-drawer.js';
import { loadImages } from './requests.js';

async function start() {
  configureForm();
  configureFilters();
  const res = await loadImages();
  if (res.ok) {
    document
      .querySelector('.img-filters')
      .classList.remove('img-filters--inactive');
    window.IMAGES = res.data;
    drawMiniatures(res.data);
  }
}
start();
