function checkLength(s, l) {
  return s.length <= l;
}

function isPalindrome(s) {
  const newS = s.replaceAll(' ', '');
  const center = Math.floor(newS.length / 2);
  for (let i = 0; i <= center; i++) {
    if (newS[i] !== newS[newS.length - i - 1]) {
      return false;
    }
  }
  return true;
}

function getNumbers(s) {
  const newS = String(s);
  let result = '';
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  for (const letter of newS) {
    if (letter in numbers) {
      result += letter;
    }
  }
  return result;
}

checkLength('123', 5);
isPalindrome('1 2 3 2 1');
getNumbers(-123.4);
