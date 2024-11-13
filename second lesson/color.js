// Ranglarni tasodifiy qilish uchun funksiya
function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Button'lar uchun tasodifiy ranglarni o'zgartirish
function changeButtonColors() {
    const buttons = document.querySelectorAll('.controls button');
    buttons.forEach(button => {
        button.style.backgroundColor = randomColor();
    });
}

// Har safar button ustiga bosilganda tasodifiy ranglarni o'zgartirish
document.querySelector('.controls').addEventListener('click', changeButtonColors);
