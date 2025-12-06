import { drawMiniatures } from './miniatureDrawer.js';
import { debounce, getRandomElements } from './util.js';

const filtersForm = document.querySelector('.img-filters__form');
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
      return images.toSorted((a, b) => b.comments.length - a.comments.length);
  }
};

filtersForm.addEventListener(
  'click',
  debounce((e) => {
    switch (e.target) {
      case btnDefault:
        drawMiniatures(filterImages('default', window.IMAGES));
        btnDefault.classList.add('img-filters__button--active');
        btnRandom.classList.remove('img-filters__button--active');
        btnDiscussed.classList.remove('img-filters__button--active');
        break;
      case btnRandom:
        drawMiniatures(filterImages('random', window.IMAGES));
        btnDefault.classList.remove('img-filters__button--active');
        btnRandom.classList.add('img-filters__button--active');
        btnDiscussed.classList.remove('img-filters__button--active');
        break;
      case btnDiscussed:
        drawMiniatures(filterImages('discussed', window.IMAGES));
        btnDefault.classList.remove('img-filters__button--active');
        btnRandom.classList.remove('img-filters__button--active');
        btnDiscussed.classList.add('img-filters__button--active');
        break;
    }
  }, 500)
);
