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
const bigPicture = document.querySelector('.big-picture');
const imageBlock = bigPicture.querySelector('.big-picture__img img');
const likesBlock = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const description = bigPicture.querySelector('.social__caption');

const commentCounter = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
const cancelBtn = bigPicture.querySelector('.big-picture__cancel');

function generateCommentsHtml(comments) {
  const result = [];
  for (const comment of comments) {
    result.push(`
            <li class='social__comment'>
                <img
                    class='social__picture'
                    src='${comment.avatar}'
                    alt='${comment.name}'
                    width='35' height='35'>
                <p class='social__text'>${comment.message}</p>
            </li>
        `);
  }
  return result.join('\n');
}

export function drawFullImage(image) {
  imageBlock.setAttribute('src', image.url);
  likesBlock.innerHTML = image.likes;
  commentsCount.innerHTML = image.comments.length;
  commentsList.innerHTML = generateCommentsHtml(image.comments);
  description.innerHTML = image.description;
  bigPicture.classList.remove('hidden');
  commentCounter.classList.add('hidden');
  commentLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
}

export function hideFullImage() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

cancelBtn.addEventListener('click', hideFullImage);
document.body.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    hideFullImage();
  }
});
