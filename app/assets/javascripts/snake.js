window.onload = function(){

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
var userEmail = document.getElementById("userEmail").innerText;

//make unit
const box = 32;

//load images
const ground = new Image();
ground.src = "/assets/ground.png";

const foodImg = new Image();
foodImg.src = "/assets/food.png";
//make snake
let snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

// create food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

//get score

let score = 0;

//snake controls

let d;

document.addEventListener("keydown", direction);

function direction(event) {

    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }

}

//collision function
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
            location.reload();
        }
    }
    return false
}

//function to draw everything

    function draw() {

    //draw background
    ctx.drawImage(ground, 0, 0);

    //draw snakehead
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "yellow";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    //draw food
    ctx.drawImage(foodImg, food.x, food.y);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    //directions

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    //when snake eats food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {

        //remove tail
        snake.pop();
    }

    //make a new head square
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //gameover
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {

        clearInterval(game);

        $.ajax({
              type: "POST",
              beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
              url: "/scores",
              data: { score: { email: userEmail, score: score } },
        })
        function timedRefresh(timeoutPeriod) {
	       setTimeout("location.reload(true);",timeoutPeriod);
            }

            window.onload = timedRefresh(1300);
    }

    snake.unshift(newHead);



    // draw score
    ctx.fillStyle = "white";
    ctx.font = "40px Arial one";
    ctx.fillText(score, 2 * box, 1.6 * box);

}


let game = setInterval(draw, 200);

}
