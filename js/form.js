import { sendData } from './requests.js';

const form = document.querySelector('.img-upload__form');

const imgInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const cancelBtn = document.querySelector('.img-upload__cancel');
const submitBtn = document.querySelector('.img-upload__submit');

const formFields = form.querySelectorAll('input,textarea');

const scaleValueInput = document.querySelector('.scale__control--value');
const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const imgPreview = document.querySelector('.img-upload__preview');
const imgPreviewImg = imgPreview.querySelector('img');

const hashtagInput = form.querySelector('.text__hashtags');

const slider = document.querySelector('.effect-level__slider');

const filterFieldset = document.querySelector('.img-upload__effects');
const effectValue = document.querySelector('.effect-level__value');
const effectContainer = document.querySelector('.img-upload__effect-level');
const pristine = new Pristine(form, { showTooltip: false });

function getEffectValue(effect, value) {
  switch (effect) {
    case 'chrome':
      return value / 100;
    case 'sepia':
      return value / 100;
    case 'marvin':
      return value;
    case 'phobos':
      return (value * 3) / 100;
    case 'heat':
      return (value * 3) / 100;
  }
}

const Filters = {
  none: () => 'none',
  chrome: (value) => `grayscale(${getEffectValue('chrome', value)})`,
  sepia: (value) => `sepia(${getEffectValue('sepia', value)})`,
  marvin: (value) => `invert(${getEffectValue('marvin', value)}%)`,
  phobos: (value) => `blur(${getEffectValue('phobos', value)}px)`,
  heat: (value) => `brightness(${getEffectValue('heat', value)})`,
};

function scalePreview (to) {
  imgPreviewImg.style.transform = `scale(${to / 100})`;
}

function clear() {
  slider.noUiSlider.set(100);
  imgPreviewImg.style.filter = Filters['none']();
  scalePreview(100);
  form.reset();
  pristine.reset();
}
function close() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgInput.value = null;
}

function open() {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function isOpen() {
  return !uploadOverlay.classList.contains('hidden');
}

function applyFilter(filter, value) {
  effectValue.value = value;
  imgPreviewImg.style.filter = Filters[filter](value);
}

function splitHashtags(hashtags) {
  return hashtags
    .trim()
    .split(/\s+/)
    .map((s) => s.toLowerCase());
}
export function configureForm() {
  for (const field of Array.from(formFields)) {
    field.addEventListener('keyup', (e) => {
      if (field === document.activeElement) {
        e.stopPropagation();
      }
    });
  }

  pristine.addValidator(
    hashtagInput,
    (value) => {
      const arr = splitHashtags(value);
      return new Set(arr).size === arr.length;
    },
    'Хештеги не могут повторяться',
    10
  );
  pristine.addValidator(
    hashtagInput,
    (value) => {
      const arr = splitHashtags(value);
      return arr.length <= 5;
    },
    'Можно указать максимум 5 хештегов',
    11
  );

  scaleSmallerBtn.addEventListener('click', () => {
    const value = +scaleValueInput.value.replace('%', '');
    if (value <= 25) {
      return;
    }
    const newValue = value - 25;
    scaleValueInput.value = `${newValue}%`;
    scalePreview(newValue);
  });

  document.body.addEventListener('keyup', (e) => {
    if ((e.key === 'Escape') && isOpen()) {
      close();
      clear();
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (pristine.validate()) {
      submitBtn.setAttribute('disabled', 'true');
      const result = await sendData(new FormData(form));
      close();
      if (result) {
        clear();
      }
      submitBtn.removeAttribute('disabled');
    }
  });

  cancelBtn.addEventListener('click', close);

  function isGoodFileType(type) {
    return ['image/jpeg', 'image/jpg', 'image/png'].includes(type);
  }
  imgInput.addEventListener('change', () => {
    if (
      imgInput.files[0] &&
      isGoodFileType(imgInput.files[0].type)
    ) {
      imgPreviewImg.setAttribute('src', URL.createObjectURL(imgInput.files[0]));
      open();
    } else {
      close();
    }
  });

  scaleBiggerBtn.addEventListener('click', () => {
    const value = +scaleValueInput.value.replace('%', '');
    if (value >= 100) {
      return;
    }
    const newValue = value + 25;
    scaleValueInput.value = `${newValue}%`;
    scalePreview(newValue);
  });

  noUiSlider.create(slider, {
    start: 100,
    connect: 'lower',
    range: {
      min: 0,
      max: 100,
    },
  });

  let choosedFilter = 'none';
  filterFieldset.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT') {
      choosedFilter = e.target.value;
      if (choosedFilter === 'none') {
        effectContainer.classList.add('hidden');
      } else {
        effectContainer.classList.remove('hidden');
        slider.noUiSlider.set(100);
      }
      applyFilter(choosedFilter, Math.round(100));
    }
  });

  slider.noUiSlider.on('update', (values, handle) => {
    applyFilter(choosedFilter, Math.round(values[handle]));
  });

}

