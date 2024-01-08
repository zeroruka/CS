var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var gridSize = 20;
var snake = [{ x: 0, y: 0 }];
var food = { x: 0, y: 0 };
var direction = "right";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function drawGrid() {
  ctx.strokeStyle = "lightgray";
  for (var x = 0; x <= canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (var y = 0; y <= canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function drawSnake() {
  ctx.fillStyle = "green";
  for (var i = 0; i < snake.length; i++) {
    var x = snake[i].x * gridSize;
    var y = snake[i].y * gridSize;
    ctx.fillRect(x, y, gridSize, gridSize);
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  var x = food.x * gridSize;
  var y = food.y * gridSize;
  ctx.fillRect(x, y, gridSize, gridSize);
}

function moveSnake() {
  var head = { x: snake[0].x, y: snake[0].y };

  if (direction === "right") {
    head.x++;
  } else if (direction === "left") {
    head.x--;
  } else if (direction === "up") {
    head.y--;
  } else if (direction === "down") {
    head.y++;
  }

  if (
    head.x < 0 ||
    head.x >= canvas.width / gridSize ||
    head.y < 0 ||
    head.y >= canvas.height / gridSize ||
    checkCollision(head)
  ) {
    alert("Game over!");
    location.reload();
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    generateFood();
  } else {
    snake.pop();
  }
}

function checkCollision(head) {
  for (var i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }
  return false;
}

function generateFood() {
  var x, y;
  do {
    x = getRandomInt(canvas.width / gridSize);
    y = getRandomInt(canvas.height / gridSize);
  } while (checkCollision({ x: x, y: y }));

  food.x = x;
  food.y = y;
}

function handleKeyDown(e) {
  if (e.keyCode === 39 && direction !== "left") {
    direction = "right";
  } else if (e.keyCode === 37 && direction !== "right") {
    direction = "left";
  } else if (e.keyCode === 38 && direction !== "down") {
    direction = "up";
  } else if (e.keyCode === 40 && direction !== "up") {
    direction = "down";
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid();
  drawFood();
  drawSnake();
  moveSnake();

  setTimeout(gameLoop, 100);
}

generateFood();
document.addEventListener("keydown", handleKeyDown);
gameLoop();
