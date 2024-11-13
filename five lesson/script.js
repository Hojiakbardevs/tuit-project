const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const boxSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = { x: randomPosition(canvas.width), y: randomPosition(canvas.height) };
let dx = boxSize;
let dy = 0;
let score = 0;

function randomPosition(max) {
  return Math.floor(Math.random() * (max / boxSize)) * boxSize;
}

function drawSnake() {
  ctx.fillStyle = "#00FF00";
  snake.forEach(part => ctx.fillRect(part.x, part.y, boxSize, boxSize));
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").textContent = score;
    food = { x: randomPosition(canvas.width), y: randomPosition(canvas.height) };
  } else {
    snake.pop();
  }
}

function changeDirection(event) {
  const key = event.key;
  if (key === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -boxSize;
  } else if (key === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = boxSize;
  } else if (key === "ArrowLeft" && dx === 0) {
    dx = -boxSize;
    dy = 0;
  } else if (key === "ArrowRight" && dx === 0) {
    dx = boxSize;
    dy = 0;
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }
  return false;
}

function gameLoop() {
  if (checkCollision()) {
    alert("O'yin tugadi! Yakuniy ball: " + score);
    snake = [{ x: 200, y: 200 }];
    dx = boxSize;
    dy = 0;
    score = 0;
    document.getElementById("score").textContent = score;
    food = { x: randomPosition(canvas.width), y: randomPosition(canvas.height) };
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  moveSnake();
  drawSnake();
}

document.addEventListener("keydown", changeDirection);
setInterval(gameLoop, 100);
