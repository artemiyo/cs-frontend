// // Находит последний индекс элемента
// console.log(bisecRight([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7)); // 9

const bisecLeft = (arr: number[], comparator: (el: number) => number) => {
  let start = 0;
  let end = arr.length;
  let middle = Math.floor((start + end) / 2);

  while (start <= end) {
    const value = comparator(arr[middle]);
    if (value === 0) return middle;
    if (value < 1) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }

    middle = Math.floor((start + end) / 2);
  }

  return -1;
};

console.log(bisecLeft([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7)); // 6

const bisecRight = (arr: number[], comparator: (el: number) => number) => {
  let start = 0;
  let end = arr.length;
  let result = -1;

  while (start <= end) {
    let middle = Math.floor((start + end) / 2);
    const value = comparator(arr[middle]);

    if (value === 0) {
      result = middle;
    }

    if (value > 0) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }

  return result;
};

console.log(bisecRight([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7)); // 9
