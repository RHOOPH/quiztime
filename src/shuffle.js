export default function shuffle(array) {
  let newArray = [];
  // chooses an element at a random index and pushes it to new array, if it does not already exists in the new array.
  while (newArray.length < array.length) {
    let r = Math.floor(Math.random() * array.length);
    if (newArray.indexOf(array[r]) === -1) newArray.push(array[r]);
  }
  return newArray;
}
