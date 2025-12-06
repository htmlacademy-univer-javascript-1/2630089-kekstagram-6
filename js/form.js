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

const getEffectValue = (effect, value) => {
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
};

const filters = {
  none: () => 'none',
  chrome: (value) => `grayscale(${getEffectValue('chrome', value)})`,
  sepia: (value) => `sepia(${getEffectValue('sepia', value)})`,
  marvin: (value) => `invert(${getEffectValue('marvin', value)}%)`,
  phobos: (value) => `blur(${getEffectValue('phobos', value)}px)`,
  heat: (value) => `brightness(${getEffectValue('heat', value)})`,
};

const scalePreview = (to) => {
  imgPreviewImg.style.transform = `scale(${to / 100})`;
};

const clear = () => {
  slider.noUiSlider.set(100);
  imgPreviewImg.style.filter = filters['none']();
  scalePreview(100);
  form.reset();
  pristine.reset();
};
const close = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgInput.value = null;
};

const open = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const isOpen = () => !uploadOverlay.classList.contains('hidden');

const applyFilter = (filter, value) => {
  effectValue.value = value;
  imgPreviewImg.style.filter = filters[filter](value);
};

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
    const arr = value
      .trim()
      .split(/\s+/)
      .map((s) => s.toLowerCase());
    if (arr.length <= 1) {
      return true;
    }
    for (let i = 0; i < arr.length; i++) {
      const elem = arr[i];
      for (let j = arr.length - 1; j > i; j--) {
        const comp = arr[j];
        if (elem === comp) {
          return false;
        }
      }
    }
    return true;
  },
  'Хештеги не могут повторяться',
  10
);
pristine.addValidator(
  hashtagInput,
  (value) => {
    const arr = value
      .trim()
      .split(/\s+/)
      .map((s) => s.toLowerCase());
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
  if ((e.key === 'Escape') & isOpen()) {
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

imgInput.addEventListener('change', () => {
  if (
    imgInput.files[0] &&
    (imgInput.files[0].type === 'image/jpeg' ||
      imgInput.files[0].type === 'image/jpg' ||
      imgInput.files[0].type === 'image/png')
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
  start: 100, // начальное значение
  connect: 'lower', // подключить ползунок слева
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
