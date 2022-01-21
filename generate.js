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

const cells = document.querySelectorAll(".cell");

// copies multy layered array as shallow copy
function getCopyOfBoard(mat) {
  return mat.map((row) => row.map((col) => col));
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let cellNums = [...Array(81).keys()];
let gameStr;
let playStr;

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

const shuffle = (numbers) => {
  let nums = numbers;
  for (let i = nums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }
  return nums;
};

// backend board
let gameBoard;

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

const isValid = (num, y, x) => {
  if (checkCol(num, x) == true) return false;
  if (checkRow(num, y) == true) return false;
  if (checkCube(num, y, x) == true) return false;
  return true;
};

const strIndex = (y, x) => {
  let yi = y.toString();
  let val = Number(yi + x) - y;
  return val;
};

// temporary board for building
let board;

const generate = () => {
  board = getCopyOfBoard(blankBoard);
  generateBoard();
  gameBoard = getCopyOfBoard(board);
  gameStr = gameBoard.flat();
};

// board player sees
let playBoard;

const createGameBoard = (diff) => {
  playBoard = getCopyOfBoard(blankBoard);
  playStr = blankBoard.flat();
  let shuffled = shuffle(cellNums);
  console.log(shuffled);
  for (let i = 0; i < 81; i++) {
    if (i < diff) {
      cells[shuffled[i]].innerHTML = gameStr[shuffled[i]];
      playStr[shuffled[i]] = gameStr[shuffled[i]];
    }
  }
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      let ind = strIndex(y, x);
      if (playStr[ind] !== 0) {
        playBoard[y][x] = playStr[ind];
      }
    }
  }
};

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

// recusrive to build playable board
const generateBoard = () => {
  let nums = shuffle(numbers);
  let [y, x] = emptyCell(board);
  if (y == -1) {
    console.log("generation complete");
    console.log(board);
    return;
  }
  for (let i = 0; i < 9; i++) {
    if (isValid(nums[i], y, x) == false) continue;
    board[y][x] = nums[i];
    generateBoard();
  }
  if (emptyCell(board)[0] !== -1) {
    board[y][x] = 0;
    return;
  }
};

const newGame = (diff) => {
  restartUI();
  generate();
  createGameBoard(diff);
};
