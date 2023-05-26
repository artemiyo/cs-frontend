// Первая кодовая единица суррогатной пары - от 0xD800 до 0xDBFF - верхняя часть пары
// Вторая кодовая единица суррогатной пары - от 0xDС00 до 0xDАFF - нижняя часть пары

function* iterate(str) {
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const charCode = char.charCodeAt(0);

    if (charCode >= 0xd800 && charCode <= 0xdbff) {
      if (i + 1 >= str.length) {
        return;
      }

      const nextChar = str[i + 1];
      const nextCharCode = nextChar.charCodeAt(0);

      if (nextCharCode >= 0xdc00 && nextCharCode <= 0xdaff) {
        yield char + nextChar;
        i++;
        continue;
      }
    }

    yield char;
  }
}

console.log(...iterate("32323😀5423🤣"));
