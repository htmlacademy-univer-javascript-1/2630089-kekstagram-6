// id: number
// url: string
// description: string
// likes: number
// comments: {
//   id: number,
//   avatar: string,
//   message: string,
//   name: string
// }[]
const template = document.getElementById('picture');
export function createMiniature(data) {
  const miniature = template.content.cloneNode(true);

  const img = miniature.querySelector('img');
  img.setAttribute('src', data.url);
  img.setAttribute('alt', data.description);
  miniature.querySelector('.picture__likes').innerHTML = data.likes;
  miniature.querySelector('.picture__comments').innerHTML =
    data.comments.length;
  return miniature;
}

export function drawMiniatures(dataArr) {
  const fragment = document.createDocumentFragment();
  for (const data of dataArr) {
    fragment.appendChild(createMiniature(data));
  }
  document.querySelector('.pictures').appendChild(fragment);
}
