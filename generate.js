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
const diffBtns = document.querySelectorAll('.diff-btn');
const hintBtn = document.querySelector("#giveHintBtn");
const checkBtn = document.querySelector('#checkBtn');
const solveBtn = document.querySelector('#solveBtn');
const resetYes = document.querySelector('#resetYes');
const resetNo = document.querySelector('#resetNo')
const askReset = document.querySelector('#askReset');
const askDifficulty = document.querySelector('#askDifficulty');
const askHelp = document.querySelector('#askHelp')
const helpYes = document.querySelector('#helpYes')
const helpNo = document.querySelector('#helpNo')
const gameBtn = document.querySelector('#newGameBtn')



// copies multy layered array as shallow copy
function getCopyOfBoard(mat) {
  return mat.map((row) => row.map((col) => col));
}

// only allows numbers and 1 digit in a cell
cells.forEach(e => e.addEventListener('input', function(){
  e.classList.remove('wrong');
  let num = e.value;
  if (isNaN(num) == true || num == "0"){e.value = ''}
  if (num.length > 1) {e.value = e.value[1]}
  updatePlayStr();
  if (helpOn) {checkWrong()}
}))

// game reset btn sequence
gameBtn.addEventListener("click", function() {
  askReset.classList.remove('hidden');
})

resetYes.addEventListener('click', function() {
  askReset.classList.add('hidden')
  askDifficulty.classList.remove('hidden')
})

resetNo.addEventListener('click', function() {
  askReset.classList.add('hidden')
})

let difficulty;
diffBtns.forEach(e => e.addEventListener('click', function(){
  difficulty = e.value;
  askDifficulty.classList.add('hidden');
  askHelp.classList.remove('hidden');
}))

let helpOn = false;
helpYes.addEventListener('click', function() {
helpOn = true;
askHelp.classList.add('hidden');
cells.forEach(e => e.classList.remove('wrong'));
newGame(difficulty);
})

helpNo.addEventListener('click', function() {
  helpOn = false;
  askHelp.classList.add('hidden');
  cells.forEach(e => e.classList.remove('wrong'))
newGame(difficulty);
})

// checks for wrong answers
checkBtn.addEventListener('click', function() {
  checkWrong();
})

// gives a random him
hintBtn.addEventListener('click', function(){
  giveHint();
})

solveBtn.addEventListener('click', function(){
  for (let i =0; i<81; i++) {
    playStr[i] = gameStr[i];
    cells[i].value = gameStr[i];
  }
})

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
    cell.value = "";
  }
};

const updateUI = () => {
  let i = 0;
  for (const cell of cells) {
    if (numStr[i] !== 0) {
      cell.value = numStr[i];
    }
    i++;
  }
};

const updatePlayStr = () => {
  for (let i =0; i< 81; i++) {
    if (cells[i].value =="") continue;
    playStr[i]= Number(cells[i].value);
  }
}

const giveHint = () => {
  let nums = shuffle(cellNums);
  for (let i =0; i< nums.length; i++) {
    let cell = nums[i]
    if (playStr[cell] == 0) {
      playStr[cell] = gameStr[cell];
      cells[cell].value = playStr[cell];
      return
    }
    continue;
  }
}

const checkWrong = () => {
  for (let i=0; i< 81; i++) {
    if (playStr[i]== 0 || playStr[i] =="") {
      cells[i].classList.remove('wrong')
      continue;}
      
    if (playStr[i] !== gameStr[i]) {
      cells[i].classList.add('wrong')
    }
  }
}

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
      cells[shuffled[i]].value = gameStr[shuffled[i]];
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

// solver functions

let optArray = getCopyOfBoard(blankArray);

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


let isCompleted = false;

const completed = () => {};

let timer = 10;

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
async function run() {
  start();
  isolate();
  let isolated;
  while (isolated !== false) {
    start();
    isolated = isolate();
    await timeControl(5);
  }
  if (emptyCell(board)[0] == -1) {
    console.log("finished");
    return;
  }
  beginBrute();
}

// gives ui clean board
restartUI();
