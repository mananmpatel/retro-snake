// Define HTMl elements
const board = document.getElementById("game-board");
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');

// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let  food = generateFood();
let direction = 'right';
let gameInterval;
let gameStarted;
let gameSpeedDelay = 200;
let highScore = 0;


// Draw game map. snake, food
function draw() {
    board.innerHTML = ``;
    drawSnake();
    drawFood();
    updateScore();
}

// Draw Snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    })
}

// Create a snake or food cube/div
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Set the position of snake orfood 
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

// Draw food function
function drawFood() {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

// Generate food
function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}

// Moving the Snake
function move() {
    const head = { ...snake[0]}
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;

    }

    snake.unshift(head);

    // snake.pop();

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        clearInterval(); // Clear past interval
        gameInterval = setInterval(() => {
            move();
            draw();
        }, gameSpeedDelay);
    } else {
        snake.pop();
    }
}

// Start game functiion
function startGame() {
    gameStarted = true; // Keep track of the game running
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        // checkCollision();
        draw();
    }, gameSpeedDelay)
}

// test moving
// setInterval(() => {
//     move(); // Move first
//     draw(); // then draw again new postion
// }, 1000);

// testing draw function
// draw()

// console.log(board);

//Keypress event listener
function handleKeyPress(event) {
    if((!gameStarted && event.code === 'Space') || (!gameStarted && event.code === ' ')){
        startGame();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up'
                break;
            case 'ArrowDown':
                direction = 'down'
                break;
            case 'ArrowLeft':
                direction = 'left'
                break;
            case 'ArrowRight':
                direction = 'right'
                break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress);

function updateScore () {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3,'0');
}


function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0');
    }
    highScoreText.style.display = 'block';
    
}