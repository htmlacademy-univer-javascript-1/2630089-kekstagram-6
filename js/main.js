// id ,url, description, likes, comments
// id, avatar, message, name

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const commentMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const commentsNames = ['Артем', 'Валера', 'Саша', 'Маша', 'Вова'];

function generateMessage() {
  const count = randomNum(1, 2);
  if (count === 1) {
    return commentMessages[randomNum(1, commentMessages.length - 1)];
  }
  const firstIndex = randomNum(1, commentMessages.length - 1);
  let lastIndex = randomNum(1, commentMessages.length - 1);
  while (lastIndex === firstIndex) {
    lastIndex = randomNum(1, commentMessages.length - 1);
  }
  return `${commentMessages[firstIndex]} ${commentMessages[lastIndex]}`;
}
function generateComments(startId, count) {
  const comments = [];
  for (let i = 0; i <= count; i++) {
    comments.push({
      id: startId,
      avatar: `img/avatar-${randomNum(1, 6)}.svg`,
      message: generateMessage(),
      name: commentsNames[randomNum(1, commentsNames.length - 1)],
    });
    startId++;
  }
  return comments;
}

function generatePost(id, photoId, commentsStartId, commentsCount) {
  return {
    id,
    url: `photos/${photoId}.jpg`,
    description: 'Картинка классная, прям ваще',
    likes: randomNum(15, 200),
    comments: generateComments(commentsStartId, commentsCount),
  };
}

function generate25Posts() {
  const posts = [];
  let commentsLastId = 1;
  for (let i = 1; i <= 25; i++) {
    const commentsCount = randomNum(0, 30);
    posts.push(generatePost(i, i, commentsLastId, commentsCount));
    commentsLastId += commentsCount + 1;
  }
  return posts;
}

generate25Posts();
