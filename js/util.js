export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomElements(arr, n) {
  const arrayCopy = arr.slice();
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }
  return arrayCopy.slice(0, n);
}

export const addMessage = (
  text,
  btnText,
  isError = false,
  onBtnClick = () => {}
) => {
  const options = {
    template: !isError
      ? document.getElementById('success')
      : document.getElementById('error'),
    titleSelector: !isError ? '.success__title' : '.error__title',
    blockSelector: !isError ? '.success' : '.error',
    btnSelector: !isError ? '.success__button' : '.error__button',
  };

  const temp = options.template.content.cloneNode(true);
  const block = temp.querySelector(options.blockSelector);
  const title = block.querySelector(options.titleSelector);
  const btn = block.querySelector(options.btnSelector);
  title.innerHTML = text;
  btn.innerHTML = btnText;

  document.body.addEventListener(
    'keyup',
    (e) => {
      if (e.key === 'Escape') {
        block.remove();
      }
    },
    { once: true }
  );

  block.addEventListener('click', (e) => {
    if (e.target === block) {
      block.remove();
    }
  });

  btn.addEventListener('click', () => {
    block.remove();
    onBtnClick();
  });

  document.body.appendChild(temp);
};

export function debounce(callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}
