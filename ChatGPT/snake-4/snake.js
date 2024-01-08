const gameBoard = document.getElementById("game-board");
const size = 10;
let snake = [{ x: 150, y: 150 }];
let food = { x: 50, y: 50 };
let direction = { x: 0, y: -size };
let intervalId;

function createDiv(className, x, y) {
  const div = document.createElement("div");
  div.className = className;
  div.style.left = x + "px";
  div.style.top = y + "px";
  gameBoard.appendChild(div);
  return div;
}

function clearBoard() {
  gameBoard.innerHTML = "";
}

function drawSnake() {
  snake.forEach((part) => createDiv("snake", part.x, part.y));
}

function drawFood() {
  createDiv("food", food.x, food.y);
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    randomizeFood();
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= gameBoard.clientWidth ||
    head.y >= gameBoard.clientHeight
  ) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

function randomizeFood() {
  food.x = Math.floor((Math.random() * gameBoard.clientWidth) / size) * size;
  food.y = Math.floor((Math.random() * gameBoard.clientHeight) / size) * size;
}

function gameStep() {
  moveSnake();
  if (checkCollision()) {
    clearInterval(intervalId);
    alert("Game over!");
    return;
  }
  clearBoard();
  drawSnake();
  drawFood();
}

function changeDirection(event) {
  if (event.key === "ArrowUp" && direction.y === 0) {
    direction = { x: 0, y: -size };
  } else if (event.key === "ArrowDown" && direction.y === 0) {
    direction = { x: 0, y: size };
  } else if (event.key === "ArrowLeft" && direction.x === 0) {
    direction = { x: -size, y: 0 };
  } else if (event.key === "ArrowRight" && direction.x === 0) {
    direction = { x: size, y: 0 };
  }
}

document.addEventListener("keydown", changeDirection);
intervalId = setInterval(gameStep, 100);
