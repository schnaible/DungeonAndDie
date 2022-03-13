import React from 'react'
import Canvas from './TargetPractice'

function App({childToParent}) {

    const draw = (ctx, frameCount, canvasWidth, canvasHeight) => {
        // JavaScript code goes here
        // var canvas = document.getElementById("myCanvas");
        // var ctx = canvas.getContext("2d");

        // X and Y coordinate of shapes.
        var x;
        var y;

        // Print statement for testing purposes.
        //console.log("x: " + x + " y: " + y);
        var dx = 2;
        var dy = -2;

        // Keep track of game score to add to player
        var gameScore = 0;
        var isWinner;

        // Dice roll difficulty.
        var diceRoll = Math.floor(Math.random() * 6) + 1;

        // Create an array of shapes.
        var shapeCount = 1 * diceRoll; // Difficulty of shape spawns.
        var goblins = new Array(shapeCount);

        var froggeCount = shapeCount%3
        var frogges = new Array(froggeCount);

        for(var c = 0; c < shapeCount; c++) { // Store goblins in 2D array.
            var goblinX = Math.floor(Math.random() * ((canvasWidth - 50) - 50 + 1) + 50);
            var goblinY = Math.floor(Math.random() * ((canvasHeight - 50) - 50 + 1) + 50);
            goblins[c] = {goblinX, goblinY, isHit: false};
        }

        for(var c = 0; c < shapeCount; c++) { // Store frogges in 2D array.
            var froggeX = Math.floor(Math.random() * ((canvasWidth - 50) - 50 + 1) + 50);
            var froggeY = Math.floor(Math.random() * ((canvasHeight - 50) - 50 + 1) + 50);
            frogges[c] = {froggeX, froggeY, isHit: false};
        }

        var numTargets = shapeCount;
        var numTargetsClicked = 0;

        for(var c = 0; c < shapeCount; c++) { // Store bricks in 2D array.
            var goblinX = Math.floor(Math.random() * ((canvasWidth - 50) - 50 + 1) + 50);
            var goblinY = Math.floor(Math.random() * ((canvasHeight - 50) - 50 + 1) + 50);
            goblins[c] = {goblinX, goblinY, isHit: false};
        }

        // Texture images.
        // var brickTexture = new Image();
        // brickTexture.src = 'Textures/Brick2.png';

        var goblinHeadImage = new Image();
        goblinHeadImage.src = 'https://blue.cs.sonoma.edu/~kschnaible/goblin.png';
        var froggeImage = new Image();
        froggeImage.src = 'https://blue.cs.sonoma.edu/~kschnaible/cutefrog.png';
        var background = new Image();
        background.src = 'https://blue.cs.sonoma.edu/~kschnaible/BreakoutBackground.png';

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
            for (let i = 0; i < goblins.length; i++) {
                // goblinX = Math.floor(Math.random() * canvasWidth);
                // goblinY = Math.floor(Math.random() * (canvasHeight - 50 + 1) + 50);
                drawGoblin();
                drawFrogge();
            }
        }

        function drawGoblin() {
            for(var c = 0; c < shapeCount; c++) {
                if (goblins[c].isHit == false){ // Check if current element in target list has already been clicked
                    ctx.beginPath();
                    //ctx.rect(goblins[c].goblinX, goblins[c].goblinY, 25, 25);
                    ctx.drawImage(goblinHeadImage, goblins[c].goblinX, goblins[c].goblinY, 32, 32);
                    ctx.closePath();
                }
            }
        }

        function drawFrogge() {
            for(var c = 0; c < froggeCount; c++) {
                if (frogges[c].isHit == false){ // Check if current element in target list has already been clicked
                    ctx.beginPath();
                    ctx.drawImage(froggeImage, frogges[c].froggeX, frogges[c].froggeY, 32, 32);
                    ctx.closePath();
                }
            }
        }


        function drawText() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText("Slay all of the Goblins", 8, 20);
        }

        var timeLeft = 8; // Set seconds
        function drawTimer() {
            let countDown = setInterval(function() {
                // ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Added to refresh canvas.
                // Check if we reached 0.
                if (timeLeft <= 0 && !isWinner) {
                    // alert("Time's up!");
                    for(var c = 0; c < shapeCount; c++) {
                        goblins[c] = {isHit: true};
                    }
                    for(var c = 0; c < shapeCount; c++) {
                        frogges[c] = {isHit: true};
                    }
                    childToParent('You failed the Minigame!');
                    isWinner = false;
                    // document.location.reload(); // reload the page
                    clearInterval(countDown);
                }
                else { // Less than 10,
                    ctx.beginPath();
                    //ctx.clearRect(200, 0, 90, 24);
                    drawBackground();
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
            drawShapes();
            drawText();
            drawTimer();
            drawDifficulty();

        }
        // Event listeners for paddle movement.
        document.addEventListener('click', printMousePos, true);
        function printMousePos(e){
            // Variables for mouse coordinates
            let cursorX = e.pageX;
            let cursorY= e.pageY;

            // Print coordinates for testing purposes.
            //console.log( "pageX: " + cursorX +",pageY: " + cursorY );
            //console.log("X: " + x + " Y: " + y);

            // Check if clicked within target area
            let deltaX = ((window.innerWidth-600)/2)+37;
            let deltaY = ((window.innerHeight-500)/2)+77;
            for (let i = 0; i < goblins.length; i++) {
                if (Math.abs(goblins[i].goblinX - (cursorX - deltaX)) <= 18 && Math.abs(goblins[i].goblinY - (cursorY - deltaY)) <= 18) {
                    gameScore += 5;
                    numTargetsClicked += 1;
                    goblins[i].isHit = true;
                    goblins[i].goblinX = 1800;  // Temp way of removing the target
                    if (numTargetsClicked == numTargets){
                        // alert("You won!");
                        isWinner = true;
                        // document.location.reload(); // reload the page
                        childToParent('You passed the Minigame!');
                    }
                }
            }
        }

        // Draw the canvas and all the shapes within.
        draw();
    }

    return <Canvas draw={draw} height={320} width={480} />
}

export default App