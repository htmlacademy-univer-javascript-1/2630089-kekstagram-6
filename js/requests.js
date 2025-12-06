import { addMessage } from './util.js';

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
    addMessage('Ошибка загрузки картинок', 'Блин =(', true);
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
    addMessage('Изображение успешно загружено', 'Круто!');
    return true;
  } catch (error) {
    addMessage('Ошибка загрузки файла', 'Загрузить другой файл', true, () =>
      document.querySelector('.img-upload__label').click()
    );
    return false;
  }
};
