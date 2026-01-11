import { addMessage } from './util.js';

export const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';
export async function loadImages() {
  try {
    const res = await fetch(
      `${BASE_URL}/data`
    );
    if (!res.ok) {
      throw Error();
    }
    return {
      ok: true,
      data: await res.json(),
    };
  } catch (error) {
    addMessage('Ошибка загрузки картинок', 'Блин =(', true);
    return { ok: false };
  }
}

export async function sendData(formData) {
  try {
    const res = await fetch(
      `${BASE_URL}`,
      {
        method: 'POST',
        body: formData,
      }
    );
    if (!res.ok) {
      throw Error();
    }
    addMessage('Изображение успешно загружено', 'Круто!');
    return true;
  } catch (error) {
    addMessage('Ошибка загрузки файла', 'Загрузить другой файл', true, () =>
      document.querySelector('.img-upload__label').click()
    );
    return false;
  }
}
