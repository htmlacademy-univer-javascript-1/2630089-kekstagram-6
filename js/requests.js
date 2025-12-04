import { showMessage } from './util.js';

export const loadImages = async () => {
  try {
    const res = await fetch(
      'https://29.javascript.htmlacademy.pro/kekstagram/data'
    );
    if (!res.ok) {
      throw Error();
    }
    return {
      ok: true,
      data: await res.json(),
    };
  } catch (error) {
    showMessage('Произошла какая-то ошибка при загрузке', true);
    return { ok: false };
  }
};

export const sendData = async (formData) => {
  try {
    const res = await fetch(
      'https://29.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body: formData, // тип контента автоматически будет multipart/form-data
      }
    );
    if (!res.ok) {
      throw Error();
    }
    showMessage('Картинка успешно загружена!');
    return true;
  } catch (error) {
    showMessage('Произошла какая-то ошибка при отправке', true);
    return false;
  }
};
