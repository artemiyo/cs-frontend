import { Stack } from "../common";

const isValid = (text) => {
  const stack = new Stack<string>();
  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
      continue;
    }

    if (stack.isEmpty()) {
      return false;
    }

    let check;

    switch (char) {
      case ")":
        check = stack.pop();
        if (check === "{" || check === "[") return false;
        break;
      case "}":
        check = stack.pop();
        if (check === "(" || check === "[") return false;
        break;
      case "]":
        check = stack.pop();
        if (check === "(" || check === "{") return false;
        break;
    }
  }

  return stack.isEmpty();
};

console.log(isValid("(hello{world} and [me])")); // true
console.log(isValid("(hello{world)} and [me])")); // false
console.log(isValid(")")); // false
