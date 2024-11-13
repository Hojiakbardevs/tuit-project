const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');

let snake = [{ x: 200, y: 200 }];
let direction = { x: 10, y: 20 };
let food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
let gameInterval;

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    // Snake
    ctx.fillStyle = 'green';
    snake.forEach(part => ctx.fillRect(part.x, part.y, 10, 10));

    // Move snake
    let newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);

    // Check for food collision
    if (newHead.x === food.x && newHead.y === food.y) {
        food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
    } else {
        snake.pop();
    }

    // Check for wall collision
    if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height) {
        clearInterval(gameInterval);
        alert("O'yin tugadi! Siz devorga urildingiz.");
    }

    // Check for self-collision
    for (let i = 1; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            clearInterval(gameInterval);
            alert("O'yin tugadi! Siz ilonga urildingiz.");
        }
    }
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -10 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 10 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -10, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 10, y: 0 };
            break;
    }
}

startBtn.addEventListener('click', () => {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 10, y: 0 };
    food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
    clearInterval(gameInterval);
    gameInterval = setInterval(drawGame, 100);
});

window.addEventListener('keydown', changeDirection);