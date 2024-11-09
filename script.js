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
  let foodPosition = { x: Math.floor(Math.random() * 20) * 15, y: Math.floor(Math.random() * 20) * 15 };

  // O'yin funksiyalari
  function updateGame() {
      // Ilon boshini yangilash
      const newHead = { x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y };
      snake.unshift(newHead);

      // Agar ilon ovqatni yesa
      if (newHead.x === foodPosition.x && newHead.y === foodPosition.y) {
          score++;
          scoreElement.textContent = `Ball: ${score}`;
          foodPosition = { x: Math.floor(Math.random() * 20) * 10, y: Math.floor(Math.random() * 20) * 10 };
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

      // Tekshiruv - ilon o'ziga yoki devorga urilsa
      if (newHead.x < 0 || newHead.x >= 600 || newHead.y < 0 || newHead.y >= 600 ||
          snake.slice(1).some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          alert('O\'yin tugadi!');
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
  }

  // O'yinni boshlash
  setInterval(updateGame, 100);
  window.addEventListener('keydown', changeDirection);