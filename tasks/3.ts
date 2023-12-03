import { getInput } from "../utils/readFile";

const input = getInput(3).split("\n");

const testInput = [
  "467..114..",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598..",
];

let sum = 0;

type Symbol = { x: number; y: number };
const symbols: Symbol[] = [];

const isSymbolAdjacent = (x: number, y: number) => {
  for (const symbol of symbols) {
    if (Math.abs(symbol.x - x) <= 1 && Math.abs(symbol.y - y) <= 1) {
      return symbol;
    }
  }
  return null;
};

input.forEach((row, x) => {
  row.split("").forEach((char, y) => {
    if (char !== "." && !char.match(/\d/)) {
      symbols.push({ x, y });
    }
  });
});

sum = 0;
input.forEach((row, rowIndex) => {
  let number = "";
  let isValid = false;
  for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
    const char = row[columnIndex];
    if (!isNaN(parseInt(char))) {
      number += char;
      if (isSymbolAdjacent(rowIndex, columnIndex)) {
        isValid = true;
      }
    } else if (number) {
      if (isValid) {
        sum += parseInt(number);
      }
      number = "";
      isValid = false;
    }
  }
  if (number && isValid) {
    sum += parseInt(number);
  }
});

console.log(sum);

//Part2
type SymbolExtended = { x: number; y: number; numbers: number[]; char: string };
const symbolsExtended: SymbolExtended[] = [];

const isSymbolAdjacentExtended = (x: number, y: number) => {
  for (const symbol of symbolsExtended) {
    if (Math.abs(symbol.x - x) <= 1 && Math.abs(symbol.y - y) <= 1) {
      return symbol;
    }
  }
  return null;
};

input.forEach((row, x) => {
  row.split("").forEach((char, y) => {
    if (char !== "." && !char.match(/\d/)) {
      symbolsExtended.push({ x, y, char, numbers: [] });
    }
  });
});

sum = 0;
input.forEach((row, rowIndex) => {
  let number = "";
  let validSymbols: SymbolExtended[] = [];
  for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
    const char = row[columnIndex];
    if (!isNaN(parseInt(char))) {
      number += char;
      const closeSymbol = isSymbolAdjacentExtended(rowIndex, columnIndex);
      console.log(closeSymbol, "Close", validSymbols);
      if (
        closeSymbol &&
        !validSymbols.some(
          (symbol) => symbol.x === closeSymbol.x && symbol.y === closeSymbol.y
        )
      ) {
        validSymbols.push(closeSymbol);
      }
    } else if (number) {
      if (validSymbols.length) {
        validSymbols.forEach((symbol) => {
          symbol.numbers.push(parseInt(number));
        });
        sum += parseInt(number);
      }
      number = "";
      validSymbols = [];
    }
  }
  if (number && validSymbols.length) {
    validSymbols.forEach((symbol) => {
      symbol.numbers.push(parseInt(number));
    });
  }
});
sum = 0;

symbolsExtended.forEach(({ char, numbers }) => {
  if (char === "*" && numbers.length === 2) {
    sum += numbers[0] * numbers[1];
  }
});
console.log(sum);
