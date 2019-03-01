var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

ctx.canvas.width = window.innerWidth - 20;
ctx.canvas.height = window.innerHeight - 50;

const isStorage = 'undefined' !== typeof localStorage;

var size = 40;
var speed = 1;
var border = 3;
var vX = 1;
var vY = 0;
var t;
var colour = 'white';
var colours = [ 'white', 'blue', 'green', 'yellow'];
var score = 0;
var food = fruit();
var snake = [];
var eat = false;
var len = 1;
var scores = [];
var gameOverMenu = document.getElementById('game-over');
var ol = document.createElement('ol');
var scoreBoard = document.getElementById('score-board').appendChild(ol);
var restartButton = document.getElementById('restart');


if (isStorage && localStorage.getItem('scores')) {
    scores = JSON.parse(localStorage.getItem('scores'));
}

for (var i = len - 1; i >= 0; i--) {
    snake.push({
        x: i + 1,
        y: 1
    });
}

document.addEventListener('keydown', direction);
restartButton.addEventListener('click', restart);

function restart() {
    window.location.href = '../index.html';
}

function direction(e) {
    if (e.keyCode == 39 && vX == 0) {
        vY = 0;
        vX = 1;
    }
    else if (e.keyCode == 37 && vX == 0) {
        vY = 0;
        vX = -1;
    }
    else if (e.keyCode == 38 && vY == 0) {
        vY = -1;
        vX = 0;
    }
    else if (e.keyCode == 40 && vY == 0) {
        vY = 1;
        vX = 0;
    }
    else if (e.keyCode == 32) {
        eat = true;
    }
}

function fruit() {
    x = Math.floor(Math.floor(Math.random() * (cvs.width - border)) / size);
    y = Math.floor(Math.floor(Math.random() * (cvs.height - border)) / size);
    return [x, y];
}

function draw(boo) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = colour;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2 * border;
    ctx.strokeRect(0, 0, cvs.width, cvs.height);
    for (var i = 0; i < snake.length; i++) {
        drawSnake(snake[i].x, snake[i].y);
    }
    if (boo) {
        snake.pop();
        if (snake.length > 0) {
            setTimeout(draw, 20, true);
        }
        else {
            gameOver();
        }
    }
}

function drawSnake(x, y) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(x * size + border, y * size + border, size - 2*border, size - 2*border);
}

function gameOver() {
    gameOverMenu.style.visibility = 'visible';
    gameOverMenu.style.top = (cvs.height / 2) - (gameOverMenu.offsetHeight / 2) + 'px';
    gameOverMenu.style.left = (cvs.width / 2) - (gameOverMenu.offsetWidth / 2) + 'px';
    var name = prompt("Please enter your name", "<name goes here>");
    scores.push({
        name: name,
        score: score
    });
    scores = scores.sort(function (a, b) {
        return parseFloat(b.score) - parseFloat(a.score);
    }).slice(0, 5);

    console.log(scores);

    scores.forEach(function (name) {
        var li = document.createElement('li');
        ol.appendChild(li);
        li.innerHTML += name.name + ' : ' + name.score;
    });
    
    scores = JSON.stringify(scores);
    isStorage && localStorage.setItem('scores', scores);
}

function main() {
    draw(false);
    
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;
    if (snakeX == food[0] && snakeY == food[1]) {
        eat = true;
    }
    for (var i = 1; i < snake.length; i++) {
        if (snakeX == snake[i].x && snakeY == snake[i].y) {
            vY = 0;
            clearInterval(t);
            draw(true);
        }
    }
    if (!eat) {
        snake.pop();
    }
    else {
        eat = false;
        food = fruit();
        score++;
        colour = colours[Math.floor(Math.random() * 3)];
        console.log(colour);
    }

    var newHead = {
        x: snakeX + vX,
        y: snakeY + vY
    };
    
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(food[0] * size + border, food[1] * size + border, size - 2 * border, size - 2 * border);

    snake.unshift(newHead);
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, cvs.height - 20);

    if (snakeX * size >= cvs.width || snakeX < 0 || snakeY * size >= cvs.height || snakeY < 0) {
        vY = 0;
        clearInterval(t);
        draw(true);
    }
}
t = setInterval(main, 100*(1/speed));


