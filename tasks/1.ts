import { getInput } from "../utils/readFile";

const input = getInput(1).split("\n");

const sum = input
  .map((line) => {
    const numbers = line.replace(/[^0-9]/g, "");
    return parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`);
  })
  .reduce((a, b) => a + b);

console.log(sum, "part1");

const testInput = [
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
];

type Numbers = {
  [key: string]: number;
};

const numbers: Numbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

let sumPart2 = 0;

for (let i = 0; i < input.length; i++) {
  let line = input[i];
  Object.keys(numbers).forEach((key) => {
    line = line.replaceAll(
      key,
      key + numbers[key] + key.substring(key.length - 1)
    );
  });
  const numbersFromLine = line.replace(/[^0-9]/g, "");
  sumPart2 += parseInt(
    numbersFromLine[0] + numbersFromLine[numbersFromLine.length - 1]
  );
  console.log(sumPart2);
}
