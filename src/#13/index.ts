// ## Необходимо написать регулярное выражение
const myRegExp = /^[\w$]*$/;

//console.log(myRegExp.test("привет")); // false
//console.log(myRegExp.test("aba")); // true
//console.log(myRegExp.test("12345")); // true
//console.log(myRegExp.test("___")); // true
//console.log(myRegExp.test("$")); // true
//console.log(myRegExp.test("Hello$_54678")); // true
//console.log(myRegExp.test("Hello$_54678 Привет")); // false
//console.log(myRegExp.test("+")); // false
//console.log(myRegExp.test("^")); // false
//console.log(myRegExp.test("")); // false

// ## Необходимо создать массив на основе строки

const myRegExp2 = /(?=,).+?(?<=;)/;

"762120,0,22;763827,0,50;750842,0,36;749909,0,95;755884,0;"
  .split(myRegExp2)
  .filter(Boolean);

// ## Итератор на основе строки

const myRegExp3 = /"([^"]+)": ([^,}]+)/g;

[...'{"a": 1, "b": "2"}'.matchAll(myRegExp3)];

//## Необходимо написать функцию, которая принимает строковый шаблон и объект параметров,
// и возвращает результат применения данных к этому шаблону

function format(str, data) {
  return str.replace(/\$\{(.*?)}/g, (_, key) => data[key]);
}

const res = format("Hello, ${user}! Your age is ${age}.", {
  user: "Bob",
  age: 10,
});

console.log(res);

//## Нахождение арифметических операций в строке и замена на результат
function calc(str) {
  return str.replace(/[([\d].*[)\d]/gm, (expression) =>
    new Function("return " + expression)()
  );
}

console.log(
  calc(`
Какой-то текст (10 + 15 - 24) ** 2
Еще какой то текст 2 * 10
`)
);
