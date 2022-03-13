import React from "react";
import Canvas from './Breakout'

const draw = context => {
    // JavaScript code goes here
    // var canvas = document.getElementById("myCanvas");
    // var ctx = canvas.getContext("2d");

    // X and Y coordinate of ball.
    var x = Canvas.width / 2;
    var y = Canvas.height - 30;
    var dx = 2;
    var dy = -2;

    // Paddle variables
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (Canvas.width - paddleWidth) / 2;

    // Ball variables
    var ballRadius = 10;

    // Paddle variables
    var leftPressed = false;
    var rightPressed = false;

    // Brick variables
    var brickRowCount = 3;
    var brickColumnCount = 5;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
    var bricks = [];
    for(var c = 0; c < brickColumnCount; c++) { // Store bricks in 2D array.
        bricks[c] = [];
        for(var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    // Keep track of game score to add to player
    var gameScore = 0;
    var isWinner;

    // Dice roll difficulty.
    var diceRoll = Math.floor(Math.random() * 6) + 1;

    // Texture images.
    var brickTexture = new Image();
    brickTexture.src = 'https://blue.cs.sonoma.edu/~kschnaible/Brick.png';
    var spikeBallImage = new Image();
    spikeBallImage.src = 'https://blue.cs.sonoma.edu/~kschnaible/spikeBall.png';


    function collisionDetection() {
        for(var c = 0; c < brickColumnCount; c++) {
            for(var r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r]; // Store brick object in every loop.
                if (b.status == 1) {
                    // calculations for the following 4:
                    // 1. x position of ball is greater than x pos of brick
                    // 2. x position of ball is less than x pos of brick + its width
                    // 3. y position of ball is greater than y position of brick
                    // 4. y position of ball is less than y pos of brick + its height
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0; // Make brick disappear upon collision.
                        gameScore++;

                        // Check if victor
                        if (gameScore == brickRowCount * brickColumnCount) {
                            isWinner = true;
                            alert("Congratulations!");
                            document.location.reload(); // reload the page
                            clearInterval(interval); // Chrome support
                        }
                    }
                }
            }
        }
    }

    function drawBall() {
        // Draw the ball
        context.beginPath();
        //context.arc(x, y, ballRadius, 0, Math.PI*2);
        context.drawImage(spikeBallImage, x, y, 20, 20);
        context.fillStyle = "#FFFFFF";
        context.fill();
        context.closePath();
    }

    function drawPaddle() {
        context.beginPath();
        context.rect(paddleX, Canvas.height - paddleHeight, paddleWidth, paddleHeight);
        context.fillStyle = "#ADD8E6";
        context.fill();
        context.closePath();
    }

    function drawBricks() {
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status == 1) { // If true, brick hasn't been touched
                    // Create coordinates for brick placements for each loop
                    var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;

                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    context.beginPath();
                    context.drawImage(brickTexture, brickX, brickY, brickWidth, brickHeight);
                    //context.fillStyle = "C:/Users/Samuel/Downloads/Brick.html";
                    //context.fill();
                    context.closePath();
                }
            }
        }
    }

    function drawScore() {
        context.font = "16px Arial";
        context.fillStyle = "#FFFFFF";
        context.fillText("Score: " + gameScore, 8, 20);
    }

    function drawDifficulty() {
        context.font = "16px Arial";
        context.fillStyle = "#FFFFFF";
        context.fillText("Difficulty: " + diceRoll, Canvas.width - 100, 20);
    }

    function draw() {
        // Clear Canvas after every frame
        context.clearRect(0, 0, Canvas.width, Canvas.height);

        // Draw everything
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawDifficulty();
        collisionDetection();

        // Keep the ball from going out of bounds, but reverse
        // the direction of it.
        if (x + dx < ballRadius || x + dx > Canvas.width - ballRadius) { // Left & Right
            dx = -dx;
        }
        if (y + dy < ballRadius) { // Top
            dy = -dy;
        }
        else if (y + dy > Canvas.height - ballRadius) { // Bottom
            // Check if collided with paddle
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else { // Hit the bottom = game over
                //alert("GAME OVER");
                isWinner = false;
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            }
        }

        // Keep the paddle from going out of bounds.
        // This code also moves the paddle left and right.
        if (leftPressed) {
            paddleX -= 4;
            if (paddleX < 0) {
                paddleX = 0;
            }
        }
        else if (rightPressed) {
            paddleX += 4;
            if (paddleX + paddleWidth > Canvas.width) {
                paddleX = Canvas.width - paddleWidth;
            }
        }

        // Update coordinates every 10 milliseconds
        x += dx;
        y += dy;
    }
    // Event listeners for paddle movement.
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
        else if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
        else if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        }
    }

    // Update the frame every 10 milliseconds.
    var interval = setInterval(draw, 10 - diceRoll);
};

function App() {
    return (
      <Canvas draw={draw} height={320} width={480}/>
    );
}

export default App;