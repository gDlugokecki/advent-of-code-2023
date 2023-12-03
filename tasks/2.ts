import { getInput } from "../utils/readFile";

const redCubes = 12;
const blueCubes = 14;
const greenCubes = 13;

const input = getInput(2).split("\n");

type Color = "red" | "green" | "blue";

const getNumberForColor = (input: string, color: Color) => {
  const regex = new RegExp(`\\d+ ${color}`, "g");
  const matches = input.match(regex) ?? [];

  const res = matches.map((match) => {
    const [number, color] = match.split(" ");
    return parseInt(number);
  });

  return res;
};

let sum = 0;
//Part1
input.forEach((line, index) => {
  const bluePoints = Math.max(...getNumberForColor(line, "blue"));
  const greenPoints = Math.max(...getNumberForColor(line, "green"));
  const redPoints = Math.max(...getNumberForColor(line, "red"));

  if (
    bluePoints <= blueCubes &&
    greenPoints <= greenCubes &&
    redPoints <= redCubes
  ) {
    sum += index + 1;
  }
});

console.log(sum, "Part1");

//Part2
sum = 0;
input.forEach((line, index) => {
  const bluePoints = Math.max(...getNumberForColor(line, "blue"));
  const greenPoints = Math.max(...getNumberForColor(line, "green"));
  const redPoints = Math.max(...getNumberForColor(line, "red"));

  console.log(bluePoints * greenPoints * redPoints, "\n\n");
  sum += bluePoints * greenPoints * redPoints;
});
console.log(sum, "Part2");
