const bigPicture = document.querySelector('.big-picture');
const imageBlock = bigPicture.querySelector('.big-picture__img img');
const likesBlock = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const description = bigPicture.querySelector('.social__caption');

const commentCounter = bigPicture.querySelector(
  '.social__comment-count .comments-showed'
);
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

let loadedCommentsCount = 0;
function loadComments(image) {
  const count = 5;
  const newComments = image.comments.slice(
    loadedCommentsCount,
    loadedCommentsCount + count
  );
  commentsList.innerHTML += generateCommentsHtml(newComments);
  loadedCommentsCount += count;
  if (loadedCommentsCount >= image.comments.length) {
    loadedCommentsCount = image.comments.length;
    commentLoader.classList.add('hidden');
  }
  commentCounter.innerHTML = loadedCommentsCount;
}
let loaderFunction;
export function drawFullImage(image) {
  imageBlock.setAttribute('src', image.url);
  likesBlock.innerHTML = image.likes;
  commentsCount.innerHTML = image.comments.length;
  description.innerHTML = image.description;
  bigPicture.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  document.body.classList.add('modal-open');
  loaderFunction = () => loadComments(image);
  commentLoader.addEventListener('click', loaderFunction);
  loadComments(image);
}

export function hideFullImage() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsList.innerHTML = '';
  commentLoader.removeEventListener('click', loaderFunction);
}

cancelBtn.addEventListener('click', hideFullImage);
document.body.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    hideFullImage();
  }
});
