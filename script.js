// O'yin maydonini, ilon va ovqatni sozlash
const gameContainer = document.getElementById('gameContainer');
const scoreElement = document.getElementById('score');

// Ilon pozitsiyasi va tezligi
let snake = [{ x: 150, y: 150 }];
let snakeDirection = { x: 15, y: 0 };
let score = 0;

// Ovqat joylashuvi
const food = document.createElement('div');
food.classList.add('food');
gameContainer.appendChild(food);
let foodPosition = { x: Math.floor(Math.random() * 40) * 15, y: Math.floor(Math.random() * 40) * 15 };

// Ilonning o'z tanasiga tegib-tegmasligini tekshirish funksiyasi
function checkSelfCollision() {
    const [head, ...body] = snake;
    return body.some(segment => segment.x === head.x && segment.y === head.y);
}

// O'yin funksiyalari
function updateGame() {
    // Ilon boshini yangilash
    let newHead = { x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y };

    // Devordan chiqishda ilonni qarama-qarshi tomonga o'tkazish
    if (newHead.x < 0) {
        newHead.x = 585;
    } else if (newHead.x >= 600) {
        newHead.x = 0;
    }
    if (newHead.y < 0) {
        newHead.y = 585;
    } else if (newHead.y >= 600) {
        newHead.y = 0;
    }

    // Ilon boshini tananing oldiga qo'shish
    snake.unshift(newHead);

    // Agar ilon ovqatni yesa
    if (newHead.x === foodPosition.x && newHead.y === foodPosition.y) {
        score++;
        scoreElement.textContent = `Ball: ${score}`;
        foodPosition = { x: Math.floor(Math.random() * 40) * 15, y: Math.floor(Math.random() * 40) * 15 };
    } else {
        snake.pop();
    }

    // Ilonni chizish
    gameContainer.innerHTML = `<div class="score">Ball: ${score}</div>`;
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.classList.add('snake');
        snakeElement.style.left = `${segment.x}px`;
        snakeElement.style.top = `${segment.y}px`;
        gameContainer.appendChild(snakeElement);
    });

    // Ovqatni chizish
    food.style.left = `${foodPosition.x}px`;
    food.style.top = `${foodPosition.y}px`;
    gameContainer.appendChild(food);

    // Ilon o'z tanasiga tegsa, o'yinni tugatish
    if (checkSelfCollision()) {
        alert("O'yin tugadi! Ilon o'z tanasiga tegdi.");
        resetGame();
    }
}

// O'yinni boshqarish
function changeDirection(event) {
    const keyPressed = event.key;
    if (keyPressed === 'ArrowUp' && snakeDirection.y === 0) {
        snakeDirection = { x: 0, y: -15 };
    } else if (keyPressed === 'ArrowDown' && snakeDirection.y === 0) {
        snakeDirection = { x: 0, y: 15 };
    } else if (keyPressed === 'ArrowLeft' && snakeDirection.x === 0) {
        snakeDirection = { x: -15, y: 0 };
    } else if (keyPressed === 'ArrowRight' && snakeDirection.x === 0) {
        snakeDirection = { x: 15, y: 0 };
    }
}

// O'yinni qayta yuklash
function resetGame() {
    snake = [{ x: 150, y: 150 }];
    snakeDirection = { x: 15, y: 0 };
    score = 0;
    scoreElement.textContent = `Ball: ${score}`;
    foodPosition = { x: Math.floor(Math.random() * 40) * 15, y: Math.floor(Math.random() * 40) * 15 };
}

// O'yinni boshlash
setInterval(updateGame, 100);
window.addEventListener('keydown', changeDirection);
