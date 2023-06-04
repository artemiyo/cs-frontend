import { random } from "./random";
import { take } from "./take";
import { filter } from "./filter";
import { enumerate } from "./enumerate";

const randomInt = random(0, 100);

console.log(
  ...take<number>(
    filter(randomInt, (el) => el < 10),
    15
  )
);

console.log([...take(enumerate(randomInt), 3)]);
