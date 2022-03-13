import React from 'react'
import Canvas from './OddOneOut'

function App({childToParent}) {

    const draw = (ctx, frameCount, canvasWidth, canvasHeight) => {
// X and Y coordinate of shapes.
        var x;
        var y;
        var squareX = Math.floor(Math.random() * canvasWidth);
        var squareY = Math.floor(Math.random() * (canvasHeight - 50 + 1) + 50);
        var triangleX = Math.floor(Math.random() * canvasWidth);
        var triangleY = Math.floor(Math.random() * (canvasHeight - 50 + 1) + 50);
        var heartStartX = Math.floor(Math.random() * canvasWidth);
        var heartStartY = Math.floor(Math.random() * (canvasHeight - 50 + 1) + 50);

        // Print statement for testing purposes.
        //console.log("x: " + x + " y: " + y);
        var dx = 2;
        var dy = -2;

        // Ball variables
        var ballRadius = 12;

        // Keep track of game score to add to player
        var gameScore = 0;
        var isWinner;

        // Dice roll difficulty.
        var diceRoll = Math.floor(Math.random() * 6) + 1;

        // Create an array of shapes.
        var shapeCount = 10 * diceRoll; // Difficulty of shape spawns.
        var squares = new Array(shapeCount);
        var triangles = new Array(shapeCount);
        var hearts = new Array(shapeCount);


        // Texture images.
        var background = new Image();
        background.src = 'https://blue.cs.sonoma.edu/~kschnaible/BreakoutBackground.png';
        //var spikeBallImage = new Image();
        //spikeBallImage.src = 'Textures/spike-ball.png';

        function getWindowDimensions() {
            const {
                innerWidth: width,
                innerHeight: height
            } = window;
            return {
                width,
                height
            };
        }

        function drawBackground(){
            ctx.drawImage(background,0,0,canvasWidth,canvasHeight);
        }

        function drawShapes() {
            for (let i = 0; i < squares.length; i++) {
                squareX = Math.floor(Math.random() * canvasWidth);
                squareY = Math.floor(Math.random() * (canvasHeight - 50 + 1) + 50);
                drawSquare();
            }
            for (let i = 0; i < triangles.length; i++) {
                triangleX = Math.floor(Math.random() * canvasWidth);
                triangleY = Math.floor(Math.random() * (canvasHeight - 50 + 1) + 50);
                drawTriangle();
            }
            for (let i = 0; i < hearts.length; i++) {
                heartStartX = Math.floor(Math.random() * canvasWidth);
                heartStartY = Math.floor(Math.random() * (canvasHeight - 50 + 1) + 50);
                drawHeart();
            }
        }

        function drawBall() {
            x = Math.floor(Math.random() * canvasWidth);
            y = Math.floor(Math.random() * (canvasHeight - 50 + 1) + 50);
            // Draw the ball
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            //ctx.drawImage(spikeBallImage, x, y, 30, 30);
            ctx.fillStyle = "#FFFFFF";
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 2.0;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }

        function drawHeart() {
            ctx.beginPath();
            var topCurveHeight = 25 * 0.3;
            ctx.moveTo(heartStartX, heartStartY + topCurveHeight);
            // top left curve
            ctx.bezierCurveTo(
                heartStartX, heartStartY,
                heartStartX - 25 / 2, heartStartY,
                heartStartX - 25 / 2, heartStartY + topCurveHeight
            );

            // bottom left curve
            ctx.bezierCurveTo(
                heartStartX - 25 / 2, heartStartY + (25 + topCurveHeight) / 2,
                heartStartX, heartStartY + (25 + topCurveHeight) / 2,
                heartStartX, heartStartY + 25
            );

            // bottom right curve
            ctx.bezierCurveTo(
                heartStartX, heartStartY + (25 + topCurveHeight) / 2,
                heartStartX + 25 / 2, heartStartY + (25 + topCurveHeight) / 2,
                heartStartX + 25 / 2, heartStartY + topCurveHeight
            );

            // top right curve
            ctx.bezierCurveTo(
                heartStartX + 25 / 2, heartStartY,
                heartStartX, heartStartY,
                heartStartX, heartStartY + topCurveHeight
            );

            ctx.closePath();
            ctx.fillStyle = "#FF0000";
            ctx.strokeStyle = "#000000";
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }

        function drawSquare() {
            ctx.beginPath();
            ctx.rect(squareX, squareY, 25, 25);
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 2.0;
            ctx.fillStyle = "#00FF00";
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }

        function drawTriangle() {
            ctx.beginPath();
            ctx.moveTo(triangleX, triangleY);
            ctx.lineTo(triangleX - 25, triangleY);
            ctx.lineTo(triangleX - 25, triangleY - 25);
            ctx.fillStyle = "#00FFFF";
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 2.0;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }

        function drawText() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText("Shape: Circle", 8, 20);
        }

        function drawTimer() {
            var timeLeft = 10; // Set seconds
            let countDown = setInterval(function () {
                //ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Added to refresh canvas.
                // Check if we reached 0.
                if (timeLeft <= 0 && !isWinner) {
                    // alert("Time's up!");
                    childToParent('You failed the Minigame!');
                    isWinner = false;
                    // document.location.reload(); // reload the page
                    clearInterval(countDown);
                } else { // Less than 10,
                    ctx.beginPath();
                    //ctx.clearRect(200, 0, 90, 24);

                    // Shuffle the shapes around every second.
                    drawBackground();
                    drawBall();
                    drawShapes();
                    drawText();
                    drawDifficulty();

                    // Draw timer.
                    ctx.font = "16px Arial";
                    ctx.fillStyle = "#FFFFFF";
                    ctx.strokeStyle = "#000000";
                    ctx.fillText("Time left: " + timeLeft, 200, 20);
                    ctx.closePath();
                }
                timeLeft -= 1;
            }, 1000);
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
            drawBall();
            drawHeart();
            drawSquare();
            drawTriangle();
            drawShapes();
            drawText();
            drawTimer();
            drawDifficulty();

            // Keep the ball from going out of bounds, but reverse
            // the direction of it.
            if (x + dx < ballRadius || x + dx > canvasWidth - ballRadius) { // Left & Right
                dx = -dx;
            }
            if (y + dy < 0 || y + dy > canvasHeight) {
                dy = -dy;
            }
        }

        // Event listeners for paddle movement.
        document.addEventListener('click', printMousePos, true);

        function printMousePos(e) {
            // Variables for mouse coordinates
            let cursorX = e.pageX;
            let cursorY = e.pageY;

            // Print coordinates for testing purposes.
            // console.log( "pageX: " + cursorX +",pageY: " + cursorY );
            // console.log("X: " + x + " Y: " + y);

            // Check if clicked within ball radius
            // console.log(`page width: ${window.innerWidth}, page height: ${window.innerHeight}`);
            // console.log(`position clicked ${(window.innerWidth-cursorX)}, ${(window.innerHeight)}`);
            let deltaX = ((window.innerWidth-600)/2)+25;
            let deltaY = ((window.innerHeight-500)/2)+60;
            // console.log(`offset: ${deltaX},${deltaY}`);
            if (Math.abs(x - (cursorX - deltaX)) <= 12 && Math.abs(y - (cursorY - deltaY)) <= 12) {
                gameScore += 5;
                // alert("You won!");
                isWinner =  true;
                childToParent('You passed the Minigame!');
                // document.location.reload(); // reload the page
            }
        }

        // Draw the canvas and all the shapes within.
        draw();
    }

    return <Canvas draw={draw} height={320} width={480} />
}

export default App