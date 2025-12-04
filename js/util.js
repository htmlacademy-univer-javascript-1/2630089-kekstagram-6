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

const message = document.querySelector('.message');
export const showMessage = (text, isError = false) => {
  message.innerHTML = text;
  message.classList.remove('hidden');
  if (isError) {
    message.classList.add('message__error');
  } else {
    message.classList.remove('message__error');
  }
  setTimeout(() => {
    message.style.opacity = '0';
    setTimeout(() => {
      message.classList.add('hidden');
    }, 300);
  }, 3000);
};
