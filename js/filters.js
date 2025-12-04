import { drawMiniatures } from './miniatureDrawer.js';
import { getRandomElements } from './util.js';

const btnDefault = document.getElementById('filter-default');
const btnRandom = document.getElementById('filter-random');
const btnDiscussed = document.getElementById('filter-discussed');
const filterImages = (mode, images) => {
  switch (mode) {
    case 'default':
      return images;
    case 'random':
      return getRandomElements(images, 10);
    case 'discussed':
      return images.sort((a, b) => b.comments.length - a.comments.length);
  }
};
btnDefault.addEventListener('click', () => {
  drawMiniatures(filterImages('default', window.IMAGES));
  btnDefault.classList.add('img-filters__button--active');
  btnRandom.classList.remove('img-filters__button--active');
  btnDiscussed.classList.remove('img-filters__button--active');
});
btnRandom.addEventListener('click', () => {
  drawMiniatures(filterImages('random', window.IMAGES));
  btnDefault.classList.remove('img-filters__button--active');
  btnRandom.classList.add('img-filters__button--active');
  btnDiscussed.classList.remove('img-filters__button--active');
});
btnDiscussed.addEventListener('click', () => {
  drawMiniatures(filterImages('discussed', window.IMAGES));
  btnDefault.classList.remove('img-filters__button--active');
  btnRandom.classList.remove('img-filters__button--active');
  btnDiscussed.classList.add('img-filters__button--active');
});
