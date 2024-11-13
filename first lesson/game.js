// Canvas va o'yin o'lchamlari
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const canvasWidth = 400;
const canvasHeight = 400;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let snake = [{ x: 160, y: 160 }];
let direction = 'RIGHT';
let food = { x: 100, y: 100 };
let score = 0;
let gameOver = false;

// O'yin ishga tushirilgan vaqtda ishlash uchun asosiy funksiya
function gameLoop() {
    if (gameOver) {
        alert('O\'yiningiz tugadi! Skor: ' + score);
        return;
    }

    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveSnake();
        drawSnake();
        drawFood();
        checkCollision();
        gameLoop();
    }, 200);
}

// Ilonni harakatlantirish
function moveSnake() {
    const head = { ...snake[0] };

    if (direction === 'UP') head.y -= gridSize;
    if (direction === 'DOWN') head.y += gridSize;
    if (direction === 'LEFT') head.x -= gridSize;
    if (direction === 'RIGHT') head.x += gridSize;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = generateFood();
    } else {
        snake.pop();
    }
}

// Ilon va ovni chizish
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Ovni tasodifiy joylash
function generateFood() {
    const x = Math.floor(Math.random() * (canvasWidth / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvasHeight / gridSize)) * gridSize;
    return { x, y };
}

// Ilon o'zi bilan to'qnashuv yoki chekka chegaradan chiqmasligini tekshirish
function checkCollision() {
    const head = snake[0];

    // Chegaradan chiqish (devordan chiqsa)
    if (head.x < 0) {
        head.x = canvasWidth - gridSize;  // Chapdan chiqsa, o'ng tomonga o'tadi
    }
    if (head.x >= canvasWidth) {
        head.x = 0;  // O'ngdan chiqsa, chap tomonga o'tadi
    }
    if (head.y < 0) {
        head.y = canvasHeight - gridSize;  // Yuqoridan chiqsa, pastga o'tadi
    }
    if (head.y >= canvasHeight) {
        head.y = 0;  // Pastdan chiqsa, yuqoriga o'tadi
    }

    // O'zi bilan to'qnashuv
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;  // Agar ilon o'ziga urilsa, o'yin tugaydi
        }
    }
}

// Klaviatura hodisalari
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// O'yinni boshlash
gameLoop();
