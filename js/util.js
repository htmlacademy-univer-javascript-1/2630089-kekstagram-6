export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const message = document.querySelector(".message");
export const showMessage = (text, isError = false) => {
  message.innerHTML = text;
  message.classList.remove("hidden");
  if (isError) {
    message.classList.add("message__error");
  } else {
    message.classList.remove("message__error");
  }
  setTimeout(() => {
    message.style.opacity = "0";
    setTimeout(() => {
      message.classList.add("hidden");
    }, 300);
  }, 3000);
};
