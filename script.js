import Grid from "./Grid.js";
import Tile from "./Tile.js";

var xDown = null;
var yDown = null;

const gameBoard = document.querySelector(".grid-container");
const gameTable = document.querySelector(".game-table-container");

const grid = new Grid(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);

setupInput();
setupInputTouch();

function setupInput() {
  window.addEventListener("keydown", handleInput, { once: true });
}

function setupInputTouch() {
  window.addEventListener("touchstart", handleTouchStart, false);
  window.addEventListener("touchmove", handleTouchMove, false);
}

async function handleInput(e) {
  switch (e.key) {
    case "ArrowUp":
      if (!canMoveUp()) {
        setupInput();
        return;
      }
      await moveUp();
      break;
    case "ArrowDown":
      if (!canMoveDown()) {
        setupInput();
        return;
      }
      await moveDown();
      break;
    case "ArrowLeft":
      if (!canMoveLeft()) {
        setupInput();
        return;
      }
      await moveLeft();
      break;
    case "ArrowRight":
      if (!canMoveRight()) {
        setupInput();
        return;
      }
      await moveRight();
      break;

    default:
      setupInput();
      return;
  }

  grid.cells.forEach((cell) => cell.mergeTiles());

  const newTile = new Tile(gameBoard);
  grid.randomEmptyCell().tile = newTile;

  if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
    youLose();
    return;
  }
  /*  newTile.waitForTransition(true).then(() => {
      alert("You lose");
    }); */

  setupInput();
}

function moveUp() {
  return slideTiles(grid.cellsByColumn);
}

function moveDown() {
  return slideTiles(grid.cellsByColumn.map((column) => [...column].reverse()));
}

function moveLeft() {
  return slideTiles(grid.cellsByRow);
}

function moveRight() {
  return slideTiles(grid.cellsByRow.map((row) => [...row].reverse()));
}

function slideTiles(cells) {
  return Promise.all(
    cells.flatMap((group) => {
      const promises = [];
      for (let i = 1; i < group.length; i++) {
        const cell = group[i];
        if (cell.tile == null) continue;
        let lastValidCell;
        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = group[j];
          if (!moveToCell.canAccept(cell.tile)) break;
          lastValidCell = moveToCell;
        }

        if (lastValidCell != null) {
          promises.push(cell.tile.waitForTransition());
          if (lastValidCell.tile != null) {
            lastValidCell.mergeTile = cell.tile;
          } else {
            lastValidCell.tile = cell.tile;
          }
          cell.tile = null;
        }
      }
      return promises;
    })
  );
}

function canMoveUp() {
  return canMove(grid.cellsByColumn);
}

function canMoveDown() {
  return canMove(grid.cellsByColumn.map((column) => [...column].reverse()));
}

function canMoveLeft() {
  return canMove(grid.cellsByRow);
}

function canMoveRight() {
  return canMove(grid.cellsByRow.map((row) => [...row].reverse()));
}

function canMove(cells) {
  return cells.some((group) => {
    return group.some((cell, index) => {
      if (index === 0) return false;
      if (cell.tile == null) return false;
      const moveToCell = group[index - 1];
      return moveToCell.canAccept(cell.tile);
    });
  });
}

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      if (!canMoveLeft()) {
        setupInputTouch();
        return;
      }
      moveLeft();
      /* right swipe */
    } else {
      if (!canMoveRight()) {
        setupInputTouch();
        return;
      }
      moveRight();
      /* left swipe */
    }
  } else {
    if (yDiff > 0) {
      if (!canMoveUp()) {
        setupInputTouch();
        return;
      }
      moveUp();
      /* down swipe */
    } else {
      if (!canMoveDown()) {
        setupInputTouch();
        return;
      }
      moveDown();
      /* up swipe */
    }
  }

  grid.cells.forEach((cell) => cell.mergeTiles());

  const newTile = new Tile(gameBoard);
  grid.randomEmptyCell().tile = newTile;

  xDown = null;
  yDown = null;

  if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
    youLose();
    /* newTile.waitForTransition(true).then(() => {
      alert("You lose");
    }); */
    return;
  }

  setupInputTouch();
}

function youLose() {
  const gameOver = document.createElement("div");
  gameOver.classList.add("you-lose-window");
  const gameOverParagraph = document.createElement("p");
  gameOverParagraph.classList.add("you-lose-text");
  const node = document.createTextNode("You lose!");
  gameOverParagraph.appendChild(node);
  gameOver.appendChild(gameOverParagraph);
  gameBoard.append(gameOver);
  var buttonLose = document.createElement("a");
  buttonLose.innerHTML = "Try again";
  buttonLose.classList.add("restart-button");
  gameOver.appendChild(buttonLose);
  buttonLose.addEventListener("click", function () {
    window.location.reload();
  });
}
