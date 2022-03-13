import React from 'react'
import Canvas from './Breakoutv2'

function App({childToParent}) {

    const draw = (ctx, frameCount, canvasWidth, canvasHeight) => {
        console.log(`Entering the draw function`)
        // X and Y coordinate of ball.
        var x = canvasWidth / 2;
        var y = canvasHeight - 30;
        var dx = 2;
        var dy = -2;

        // Paddle variables
        var paddleHeight = 10;
        var paddleWidth = 75;
        var paddleX = (canvasWidth - paddleWidth) / 2;

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
        var background = new Image();
        background.src = 'https://blue.cs.sonoma.edu/~kschnaible/BreakoutBackground.png';

        // background.onload = function(){
        //     ctx.drawImage(background,0,0);
        // }
        function drawBackground(){
            ctx.drawImage(background,0,0,canvasWidth,canvasHeight);
        }

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
                                // alert("Congratulations!");
                                // document.location.reload(); // reload the page
                                childToParent('You passed the Minigame!');
                                clearInterval(interval); // Chrome support
                            }
                        }
                    }
                }
            }
        }

        function drawBall() {
            // Draw the ball
            ctx.beginPath();
            //ctx.arc(x, y, ballRadius, 0, Math.PI*2);
            ctx.drawImage(spikeBallImage, x, y, 20, 20);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
            ctx.closePath();
        }

        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = "#ADD8E6";
            ctx.fill();
            ctx.closePath();
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
                        ctx.beginPath();
                        ctx.drawImage(brickTexture, brickX, brickY, brickWidth, brickHeight);
                        //ctx.fillStyle = "C:/Users/Samuel/Downloads/Brick.html";
                        //ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }

        function drawScore() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText("Score: " + gameScore, 8, 20);
            console.log(`score: ${gameScore}`);
        }

        function drawDifficulty() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText("Difficulty: " + diceRoll, canvasWidth - 100, 20);
        }

        function draw() {
            // Clear canvas after every frame

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Draw everything
            drawBackground();
            drawBricks();
            drawBall();
            drawPaddle();
            drawScore();
            drawDifficulty();
            collisionDetection();

            // Keep the ball from going out of bounds, but reverse
            // the direction of it.
            if (x + dx < ballRadius || x + dx > canvasWidth - ballRadius) { // Left & Right
                dx = -dx;
            }
            if (y + dy < ballRadius) { // Top
                dy = -dy;
            }
            else if (y + dy > canvasHeight - ballRadius) { // Bottom
                // Check if collided with paddle
                if (x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
                }
                else { // Hit the bottom = game over
                    //alert("GAME OVER");
                    isWinner = false;
                    // document.location.reload();
                    childToParent('You failed the Minigame!');
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
                if (paddleX + paddleWidth > canvasWidth) {
                    paddleX = canvasWidth - paddleWidth;
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
    }

    return <Canvas draw={draw} height={320} width={480} />
}

export default App