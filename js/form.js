const form = document.querySelector('.img-upload__form');
const pristine = new Pristine(form);

const imgInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const cancelBtn = document.querySelector('.img-upload__cancel');

const formFields = form.querySelectorAll('input,textarea');

const scaleValueInput = document.querySelector('.scale__control--value');
const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const imgPreview = document.querySelector('.img-upload__preview');

const slider = document.querySelector('.effect-level__slider');

const filterFieldset = document.querySelector('.img-upload__effects');
const effectValue = document.querySelector('.effect-level__value');
const effectContainer = document.querySelector('.img-upload__effect-level');

const close = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgInput.value = null;
};

const open = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const scalePreview = (to) => {
  imgPreview.style.transform = `scale(${to / 100})`;
};

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

const applyFilter = (filter, value) => {
  effectValue.value = value;
  imgPreview.style.filter = filters[filter](value);
};

for (const field of Array.from(formFields)) {
  field.addEventListener('keyup', (e) => {
    if (field === document.activeElement) {
      e.stopPropagation();
    }
  });
}

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
  if (e.key === 'Escape') {
    close();
  }
});

form.addEventListener('submit', (e) => {
  if (!pristine.validate()) {
    e.preventDefault();
  }
});

cancelBtn.addEventListener('click', close);

imgInput.addEventListener('change', () => {
  if (imgInput.files[0]) {
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
