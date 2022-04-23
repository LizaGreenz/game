document.addEventListener('DOMContentLoaded', () => {
  const gameGridDisplay = document.querySelector('.grid-container');
  const scoreDisplay = document.getElementById('displayed_score');
  const bestScoreDisplay = document.getElementById('displayed_best_score');
  const gridCells = 16;
  const emptyCell = 0;
  let cells = [];

  /**
   * initializing Fn
   */
  (function init() {
    createBoardCells();
  })();

  /**
   * Creating playing board cells
   * @returns {HTMLElement} Grid Cells of 16
   */
  function createBoardCells() {
    for (let i = 0; i < gridCells; i++) {
      const cell = document.createElement('div');
      cell.innerHTML = emptyCell;
      gameGridDisplay.appendChild(cell);
      cells.push(cell);
    }
    generateRandomNumber();
  }

  /**
   * Generating a number Randomly 2 (90%) or 4 (10%) in empty Cells
   * @returns {Number} 2 or 4 in empty cell
   */
  function generateRandomNumber() {
    let randomNumber = Math.floor(Math.random() * gridCells);
    if (+cells[randomNumber].innerHTML === emptyCell) {
      // Generate 2 (90%) or 4 (10%)
      const cellValue = Math.floor(Math.random() * 100);
      if (cellValue >= 90) {
        cells[randomNumber].innerHTML = 4;
      } else {
        cells[randomNumber].innerHTML = 2;
      }
    } else generateRandomNumber();
  }

  /**
   * Move numbers to right
   */
  function moveRight() {
    for (let i = 0; i < gridCells; i++) {
      // getting the Row and its values
      if (i % 4 === 0) {
        const row = [
          +cells[i].innerHTML,
          +cells[i + 1].innerHTML,
          +cells[i + 2].innerHTML,
          +cells[i + 3].innerHTML,
        ];

        const rowWithValues = row.filter((num) => num);
        const emptyCellsInRow = 4 - rowWithValues.length;
        const emptyCells = Array(emptyCellsInRow).fill(emptyCell);
        const newRow = emptyCells.concat(rowWithValues);

        cells[i].innerHTML = newRow[0];
        cells[i + 1].innerHTML = newRow[1];
        cells[i + 2].innerHTML = newRow[2];
        cells[i + 3].innerHTML = newRow[3];
      }
    }
  }

  /**
   * Move numbers to left
   */
  function moveLeft() {
    for (let i = 0; i < gridCells; i++) {
      // getting the Row and its values
      if (i % 4 === 0) {
        const row = [
          +cells[i].innerHTML,
          +cells[i + 1].innerHTML,
          +cells[i + 2].innerHTML,
          +cells[i + 3].innerHTML,
        ];

        const rowWithValues = row.filter((num) => num);
        const emptyCellsInRow = 4 - rowWithValues.length;
        const emptyCells = Array(emptyCellsInRow).fill(emptyCell);
        const newRow = rowWithValues.concat(emptyCells);

        cells[i].innerHTML = newRow[0];
        cells[i + 1].innerHTML = newRow[1];
        cells[i + 2].innerHTML = newRow[2];
        cells[i + 3].innerHTML = newRow[3];
      }
    }
  }

  /**
   * Combing rows
   */
  function combineRow() {
    for (let i = 0; i < gridCells - 1; i++) {
      if (cells[i].innerHTML === cells[i + 1].innerHTML) {
        // Combining numbers to directional cell
        cells[i].innerHTML = +cells[i].innerHTML + +cells[i + 1].innerHTML;
        // reset the other cell
        cells[i + 1].innerHTML = emptyCell;
      }
    }
  }

  // key codes
  function handleKeyCode(e) {
    switch (e.keyCode) {
      // Key Right
      case 39:
        keyRight();
        break;
      // Key Left
      case 37:
        keyLeft();
        break;
      // Key Up
      case 38:
        // keyUp();
        break;
      // key Down
      case 40:
        // keyDown();
        break;
    }
  }

  document.addEventListener('keyup', handleKeyCode);

  /**
   * Handles moving to numbers to right
   */
  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generateRandomNumber();
  }

  /**
   * Handles moving to numbers to left
   */
  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generateRandomNumber();
  }

  /**
   * Handles moving to numbers to up
   */

  /**
   * Handles moving to numbers to down
   */
});
