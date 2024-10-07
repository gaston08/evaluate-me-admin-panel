export const getRandomInt = (name: string): number => {
  let min: number = 0;
  let max: number = 0;

  if (name === 'likes') {
    min = Number(localStorage.getItem('min_likes'));
    max = Number(localStorage.getItem('max_likes'));
    console.log('LIKES ', min, max);
  } else if (name === 'dislikes') {
    min = Number(localStorage.getItem('min_dislikes'));
    max = Number(localStorage.getItem('max_dislikes'));
    console.log('DISLIKES ', min, max);
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};
