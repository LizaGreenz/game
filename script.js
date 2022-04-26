document.addEventListener("DOMContentLoaded", () => {
  const gameGridDisplay = document.querySelector(".grid-container");
  const scoreDisplay = document.getElementById("displayed_score");
  const bestScoreDisplay = document.getElementById("displayed_best_score");
  const gridCells = 16;
  const width = 4;
  const emptyCell = "";
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
      const cell = document.createElement("div");
      cell.classList.add("cell");
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
    if (cells[randomNumber].innerHTML === emptyCell) {
      // Generate 2 (90%) or 4 (10%)
      const cellValue = Math.floor(Math.random() * 10);
      if (cellValue >= 9) {
        cells[randomNumber].innerHTML = 4;
        cells[randomNumber].classList.add("tile_animated");
        setTimeout(() => {
          cells[randomNumber].classList.remove("tile_animated");
        }, 300);
      } else {
        cells[randomNumber].innerHTML = 2;
        cells[randomNumber].classList.add("tile_animated");
        setTimeout(() => {
          cells[randomNumber].classList.remove("tile_animated");
        }, 300);
      }
    } else generateRandomNumber();
  }

  /**
   * Move numbers to right or left
   * @param {String} input
   */
  function moveHorizontal(input) {
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
        const numOfEmptyCellsInaRow = 4 - rowWithValues.length;
        const emptyCells = Array(numOfEmptyCellsInaRow).fill(emptyCell);
        let newRow = [];
        if (input === "right") {
          newRow = emptyCells.concat(rowWithValues);
        } else {
          newRow = rowWithValues.concat(emptyCells);
        }

        cells[i].innerHTML = newRow[0];
        cells[i + 1].innerHTML = newRow[1];
        cells[i + 2].innerHTML = newRow[2];
        cells[i + 3].innerHTML = newRow[3];
      }
    }
  }

  function moveVertical(input) {
    for (let i = 0; i < width; i++) {
      // getting the Column and its values
      const column = [
        +cells[i].innerHTML,
        +cells[i + width].innerHTML,
        +cells[i + width * 2].innerHTML,
        +cells[i + width * 3].innerHTML,
      ];
      const columnWithValues = column.filter((num) => num);
      const numOfEmptyCellsInaColumn = 4 - columnWithValues.length;
      const emptyCells = Array(numOfEmptyCellsInaColumn).fill(emptyCell);
      let newColumn = [];
      if (input === "down") {
        newColumn = emptyCells.concat(columnWithValues);
      } else {
        newColumn = columnWithValues.concat(emptyCells);
      }

      cells[i].innerHTML = newColumn[0];
      cells[i + width].innerHTML = newColumn[1];
      cells[i + width * 2].innerHTML = newColumn[2];
      cells[i + width * 3].innerHTML = newColumn[3];
    }
  }

  /**
   * Combing rows
   */
  function combineRow() {
    for (let i = 0; i < gridCells - 1; i++) {
      if (cells[i].innerHTML === cells[i + 1].innerHTML) {
        // console.log(i + 1);
        // Combining numbers to directional cell
        cells[i].innerHTML = +cells[i].innerHTML + +cells[i + 1].innerHTML;
        // reset the other cell
        cells[i + 1].innerHTML = emptyCell;
      }
    }
  }

  function combineColumn() {
    for (let i = 0; i < width * 3; i++) {
      if (cells[i].innerHTML === cells[i + width].innerHTML) {
        // Combining numbers to directional cell
        cells[i].innerHTML = +cells[i].innerHTML + +cells[i + width].innerHTML;
        // reset the other cell
        cells[i + width].innerHTML = emptyCell;
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
        keyUp();
        break;
      // key Down
      case 40:
        keyDown();
        break;
    }
  }

  document.addEventListener("keyup", handleKeyCode);

  /**
   * Handles moving numbers to right
   */
  function keyRight() {
    moveHorizontal("right");
    combineRow();
    moveHorizontal("right");
    generateRandomNumber();
  }

  /**
   * Handles moving to numbers to left
   */
  function keyLeft() {
    moveHorizontal();
    combineRow();
    moveHorizontal();
    generateRandomNumber();
  }

  /**
   * Handles moving to numbers to up
   */
  function keyUp() {
    moveVertical();
    combineColumn();
    moveVertical();
    generateRandomNumber();
  }

  /**
   * Handles moving to numbers to down
   */
  function keyDown() {
    moveVertical("down");
    combineColumn();
    moveVertical("down");
    generateRandomNumber();
  }
});
