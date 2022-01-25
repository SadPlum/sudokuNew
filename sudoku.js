"use strict";

const blankBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],

  //   ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
];

const board1 = [
  [6, 0, 3, 0, 0, 0, 0, 0, 4],
  [0, 0, 0, 0, 0, 3, 0, 7, 0],
  [0, 4, 5, 6, 2, 0, 0, 0, 0],
  [8, 0, 0, 3, 7, 0, 0, 4, 0],
  [0, 5, 0, 0, 0, 0, 0, 0, 6],
  [0, 0, 0, 0, 1, 6, 0, 8, 2],
  [5, 7, 8, 0, 6, 4, 3, 0, 9],
  [0, 2, 0, 0, 0, 0, 1, 0, 7],
  [1, 0, 6, 7, 9, 2, 4, 0, 8],
];

const board2 = [
  [1, 3, 0, 6, 0, 0, 0, 0, 0],
  [0, 0, 6, 0, 0, 1, 7, 0, 0],
  [0, 0, 8, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 8, 0, 0, 0, 0],
  [6, 0, 0, 1, 0, 7, 0, 0, 3],
  [0, 0, 0, 0, 9, 0, 5, 7, 0],
  [0, 0, 9, 0, 0, 0, 8, 0, 0],
  [0, 8, 0, 0, 0, 3, 9, 4, 0],
  [0, 7, 3, 0, 0, 0, 0, 5, 6],
];

const board3 = [
  [0, 0, 4, 0, 2, 0, 7, 0, 3],
  [8, 0, 0, 3, 0, 1, 2, 5, 0],
  [2, 0, 0, 0, 0, 0, 0, 0, 9],
  [0, 0, 0, 0, 3, 6, 9, 0, 1],
  [1, 0, 7, 0, 0, 0, 0, 3, 6],
  [3, 0, 0, 1, 4, 0, 0, 0, 0],
  [0, 0, 0, 6, 7, 3, 8, 4, 2],
  [0, 0, 0, 0, 0, 2, 0, 0, 0],
  [0, 8, 2, 0, 0, 4, 0, 0, 0],
];

const hardBoard = [
  [0, 0, 0, 0, 6, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0, 9, 0, 0],
  [9, 0, 0, 0, 1, 7, 0, 0, 8],
  [0, 5, 0, 0, 7, 4, 0, 1, 0],
  [0, 0, 0, 2, 0, 0, 0, 0, 4],
  [7, 0, 0, 6, 0, 0, 0, 0, 0],
  [2, 0, 0, 0, 9, 8, 0, 0, 1],
  [0, 0, 3, 0, 0, 0, 0, 5, 0],
  [0, 0, 0, 4, 0, 0, 0, 0, 0],
];

const blankArray = [
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
];

// copies multy layered array as shallow copy
function getCopyOfBoard(mat) {
  return mat.map((row) => row.map((col) => col));
}

let optArray = getCopyOfBoard(blankArray);

let board = getCopyOfBoard(board1);

// ui
const playBoard = document.querySelector("#boards");

const speed = document.querySelector("#speeds");

const cells = document.querySelectorAll(".cell");

const select = document.querySelector("#select");

const solve = document.querySelector("#solver");

let numStr = [];
const createNumStr = () => {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      numStr.push(board[y][x]);
    }
  }
};

const updateNumStr = () => {
  numStr = [];
  createNumStr();
  updateUI();
};

const restartUI = () => {
  for (const cell of cells) {
    cell.innerHTML = "";
  }
  updateNumStr();
};

const updateUI = () => {
  let i = 0;
  for (const cell of cells) {
    if (numStr[i] !== 0) {
      cell.innerHTML = numStr[i];
    }
    i++;
  }
};

solve.addEventListener("click", function () {
  let val = speed.value;
  run(val);
});

select.addEventListener("click", function () {
  if (running == true) {
    alert("Board currently solving");
    return;
  }
  let val = playBoard.value;
  board = getCopyOfBoard(eval(val));
  restartUI();
});

// solver functions

// checks if number is in row
const checkRow = (num, r) => {
  for (let x = 0; x < 9; x++) {
    if (num == board[r][x]) {
      return true;
    }
  }
  return false;
};

// checks if number is in col
const checkCol = (num, c) => {
  for (let y = 0; y < 9; y++) {
    if (num == board[y][c]) {
      return true;
    }
  }
  return false;
};

// checks if number is in cube
const checkCube = (num, r, c) => {
  let row = Math.floor(r / 3) * 3;
  let col = Math.floor(c / 3) * 3;
  for (let y = row; y < row + 3; y++) {
    for (let x = col; x < col + 3; x++) {
      if (num == board[y][x]) {
        return true;
      }
    }
  }
  return false;
};

// when building array of potential numbers, checks if number in cube
const checkBuildCube = (num, r, c) => {
  for (let y = r; y < r + 3; y++) {
    for (let x = c; x < c + 3; x++) {
      if (num == board[y][x]) {
        return true;
      }
    }
  }
  return false;
};

// builds array of potential numbers for given cell
const buildCube = (r, c) => {
  let arr = optArray;
  for (let num = 1; num < 10; num++) {
    if (checkBuildCube(num, r, c) == true) continue;
    for (let y = r; y < r + 3; y++) {
      for (let x = c; x < c + 3; x++) {
        if (board[y][x] !== 0) {
          continue;
        } else if (arr[y][x][0] == 0) {
          arr[y][x].shift();
        }
        if (checkCol(num, x) == false && checkRow(num, y) == false) {
          if (arr[y][x].includes(num) == false) {
            arr[y][x].push(num);
          }
        }
      }
    }
  }
  optArray = arr;
};

// checks if number is only potential number within cube
const checkSingleCube = (num, r, c) => {
  let singArr = [];
  let row = Math.floor(r / 3) * 3;
  let col = Math.floor(c / 3) * 3;
  for (let y = row; y < row + 3; y++) {
    for (let x = col; x < col + 3; x++) {
      if (optArray[y][x].includes(num)) {
        singArr.push([[y], [x]]);
      }
    }
  }
  if (singArr.length == 1) {
    return singArr[0];
  } else return false;
};

// checks if number is only potential number within row
const checkSingleRow = (num, r) => {
  let singArr = [];
  for (let c = 0; c < 9; c++) {
    if (optArray[r][c].includes(num)) {
      singArr.push([[r], [c]]);
    }
  }
  if (singArr.length == 1) {
    return singArr[0];
  } else return false;
};

// checks if number is only potential number within col
const checkSingleCol = (num, c) => {
  let singArr = [];
  for (let r = 0; r < 9; r++) {
    if (optArray[r][c].includes(num)) {
      singArr.push([[r], [c]]);
    }
  }
  if (singArr.length == 1) {
    return singArr[0];
  } else return false;
};

// adds number to cell, removes it from potential numbers
function insertNum(num, r, c) {
  board[r][c] = num;
  // removes from opt array
  optArray[r][c] = [];
  //   remove from col
  for (let m = 0; m < 9; m++) {
    if (optArray[m][c].includes(num)) {
      optArray[m][c] = optArray[m][c].filter((nums) => nums !== num);
    }
  }
  //  remove from row
  for (let n = 0; n < 9; n++) {
    if (optArray[r][n].includes(num)) {
      optArray[r][n] = optArray[r][n].filter((nums) => nums !== num);
    }
  }
  //   remove from cube
  let row = Math.floor(r / 3) * 3;
  let col = Math.floor(c / 3) * 3;
  for (let x = row; x < row + 3; x++) {
    for (let y = col; y < col + 3; y++) {
      if (optArray[x][y].includes(num)) {
        optArray[x][y] = optArray[x][y].filter((nums) => nums !== num);
      }
    }
  }
}

let numPool = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let safeboard = [];

let allBoards = [];

let emptyCell = (board) => {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (board[y][x] == 0) {
        return [y, x];
      }
    }
  }
  return [-1, -1];
};

const isValid = (num, y, x) => {
  if (checkCol(num, x) == true) return false;
  if (checkRow(num, y) == true) return false;
  if (checkCube(num, y, x) == true) return false;
  return true;
};

let isCompleted = false;

const completed = () => {};

let timer = 10;

const strIndex = (y, x) => {
  let yi = y.toString();
  let val = Number(yi + x) - y;
  return val;
};

const beginBrute = () => {
  safeboard = getCopyOfBoard(board);
  smartBrute(board);
};

const easyBrute = () => {
  start();
  smartBrute(board);
};

let iterations = 0;

const smartBrute = (board) => {
  iterations++;
  timer += 5;
  const ops = emptyCell(board);
  let y = ops[0];
  let x = ops[1];
  let cellInd = strIndex(y, x);
  if (y == -1) {
    console.log("complete");
    console.log(iterations);
    return;
  }
  for (let numInd = 0; numInd < optArray[y][x].length; numInd++) {
    let num = optArray[y][x][numInd];
    if (isValid(num, y, x) == false) {
      continue;
    }
    board[y][x] = num;
    setTimeout(() => {
      cells[cellInd].innerHTML = num;
    }, timer);
    smartBrute(board);
  }
  // if (emptyCell(board)[0] !== -1) {
  //   board[y][x] = 0;
  //   setTimeout(() => {
  //     cells[cellInd].innerHTML = "";
  //   }, timer);
  //   return board;
  // }
};

const start = () => {
  updateNumStr();
  for (let y = 0; y <= 6; y += 3) {
    for (let x = 0; x <= 6; x += 3) {
      buildCube(y, x);
    }
  }
};

let control = 0;
let first = 0;

// finds if number can only logically go in one place
const isolate = () => {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      for (let number = 1; number <= 9; number++) {
        if (board[y][x] !== 0) continue;
        let singleCube = checkSingleCube(number, y, x);
        let singleRow = checkSingleRow(number, x);
        let singleCol = checkSingleCol(number, y);
        if (singleCube !== false) {
          insertNum(number, singleCube[0], singleCube[1]);
          control = 0;
          return;
        } else if (singleRow !== false) {
          insertNum(number, singleRow[0], singleRow[1]);
          control = 0;
          return;
        } else if (singleCol !== false) {
          insertNum(number, singleCol[0], singleCol[1]);
          control = 0;
          return;
        }
      }
    }
  }
  return false;
};

// for future use for brute force
const startBrute = () => {
  findFirst();
  run();
};

// controls animation
function timeControl(ms) {
  return new Promise((resolve) =>
    setTimeout(function () {
      resolve();
    }, ms)
  );
}

let running;

// main function which starts animation
async function run(ms) {
  start();
  isolate();
  let isolated;
  while (isolated !== false) {
    start();
    isolated = isolate();
    await timeControl(ms);
  }
  if (emptyCell(board)[0] == -1) {
    console.log("finished");
    return;
  }
  beginBrute();
}

// gives ui clean board
restartUI();
