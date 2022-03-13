import React from 'react'
import Canvas from './HotPursuit'
import Sketch from "react-p5";
import p5Types from "p5";

function App({childToParent}) {


    const draw = (ctx, frameCount, canvasWidth, canvasHeight) => {

        var script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js";
        // Player variables
        var player;
        var playerSizeX = 25;
        var playerSizeY = 25;

        // Fireball variables
        var fireballFromUp;
        var fireballFromDown;
        var fireballFromLeft;
        var fireballFromRight;
        var hitEdge = false;

        // Variable to store round of fireballs.
        var roundsLeft = 10;

        // Get dice roll for difficulty.
        var diceRoll = Math.floor(Math.random() * 6) + 1;

        // Image variables
        var playerImageRight;
        var playerImageLeft;
        var fireballImage;
        var backgroundImage;

        // Starting game variable
        var starter = 0;

        // On wake: create images.
        function preload() {
            playerImageRight = script.loadImage('/Textures/Player.png');
            playerImageLeft = script.loadImage('Textures/PlayerMirrored.png');
            fireballImage = script.loadImage('Textures/Fireball.png');
            backgroundImage = script.loadImage('/Textures/Background.png');
        }

        // Function on wake.
        function setup() {
            // Draw out our canvas.
            script.createCanvas(420, 420);

            // Create our player and spawn in the middle of canvas.
            player = script.createSprite(canvasWidth / 2, canvasHeight - (playerImageRight.canvasHeight / 2), 0, 0);
            fireballFromUp = script.createSprite(canvasWidth / 2, 0, 0, 0);
            fireballFromDown = script.createSprite(canvasWidth / 2, canvasHeight, 0, 0);
            fireballFromLeft = script.createSprite(0, canvasHeight / 2, 0, 0);
            fireballFromRight = script.createSprite(canvasWidth, canvasHeight / 2, 0, 0);

            // load sprite images
            player.addImage(playerImageRight);
            fireballFromUp.addImage(fireballImage);
            fireballFromDown.addImage(fireballImage);
            fireballFromLeft.addImage(fireballImage);
            fireballFromRight.addImage(fireballImage);

            // Rotate the fireballs
            fireballFromUp.rotationSpeed = 4.0;
            fireballFromDown.rotationSpeed = 4.0;
            fireballFromLeft.rotationSpeed = 4.0;
            fireballFromRight.rotationSpeed = 4.0;
        }

        function drawText() {
            script.textAlign(script.CENTER);
            script.fill('white');
            script.stroke('black');
            script.strokeWeight(2);
            script.textSize(15);
            script.text("Difficulty: " + diceRoll, canvasWidth - 50, 20);
            script.text("Rounds left: " + roundsLeft, 55, 20);
        }

        function checkCollision() {
            if (fireballFromLeft.overlap(player) || fireballFromRight.overlap(player)
                || fireballFromUp.overlap(player) || fireballFromDown.overlap(player)) {
                alert("You've been burnt to a crisp!");
                // TODO: Make game close window

                // Start the game over.
                resetGame();
            }
        }

        function resetGame() {
            // Reset all positions and die roll for testing purposes
            player.position.x = canvasWidth / 2;
            player.position.y = canvasHeight / 2;

            fireballFromUp.position.x = canvasWidth / 2;
            fireballFromUp.position.y = 0;

            fireballFromDown.position.x = canvasWidth / 2;
            fireballFromDown.position.y = canvasHeight;

            fireballFromLeft.position.x = 0;
            fireballFromLeft.position.y = canvasHeight / 2;

            fireballFromRight.position.x = canvasWidth;
            fireballFromRight.position.y = canvasHeight / 2;

            diceRoll = Math.floor(Math.random() * 6) + 1;
            roundsLeft = 10;
        }

        function constrainPlayerMovement() {
            if (script.keyDown(script.LEFT_ARROW) && player.position.x > 20) { // Left
                player.position.x -= 2;
                player.addImage(playerImageLeft);
            }
            if (script.keyDown(script.RIGHT_ARROW) && player.position.x < canvasWidth - 20) { // Right
                player.position.x += 2;
                player.addImage(playerImageRight);
            }
            if (script.keyDown(script.UP_ARROW) && player.position.y > 25) { // Up
                player.position.y -= 2;
            }
            if (script.keyDown(script.DOWN_ARROW) && player.position.y < canvasHeight - 25) { // Down
                player.position.y += 2;
            }
        }

        function moveFireBalls() {
            if (roundsLeft === 10) {
                fireballFromUp.position.y += 2;
                fireballFromDown.position.y -= 2;
                fireballFromLeft.position.x += 2;
                fireballFromRight.position.x -= 2;
            } else {
                fireballFromUp.position.y += diceRoll;
                fireballFromDown.position.y -= diceRoll;
                fireballFromLeft.position.x += diceRoll;
                fireballFromRight.position.x -= diceRoll;
            }
        }

        function resetFireballs() {
            if (fireballFromUp.position.y > canvasHeight) { // Up
                fireballFromUp.position.y = 0;
                fireballFromUp.position.x = Math.floor(Math.random() * canvasWidth - 12) + 12;
                hitEdge = true;
            }
            if (fireballFromDown.position.y < 0) { // Down
                fireballFromDown.position.y = canvasHeight;
                fireballFromDown.position.x = Math.floor(Math.random() * canvasWidth - 12) + 12;
                hitEdge = true;
            }
            if (fireballFromLeft.position.x > canvasWidth) { // Left
                fireballFromLeft.position.x = 0;
                fireballFromLeft.position.y = Math.floor(Math.random() * canvasHeight - 12) + 12;
                hitEdge = true;
            }
            if (fireballFromRight.position.x < 0) { // Right
                fireballFromRight.position.x = canvasWidth;
                fireballFromRight.position.y = Math.floor(Math.random() * canvasHeight - 12) + 12;
                hitEdge = true;
            }

            // Decrement rounds left if the fireballs hit the edge.
            if (hitEdge) {
                roundsLeft -= 1;
                hitEdge = false;
            }
        }

        function checkGameOver() {
            if (roundsLeft === 0) {
                alert("You survived!");
                resetGame();
            }
        }

        function startGame() {
            if (starter === 0) {
                starter++;
                resetGame();
            }
        }

        function draw() {
            startGame();

            // Check for collision.
            checkCollision();

            // Paint the background.
            script.background(backgroundImage);

            // Draw our text up top
            drawText();

            // Move player and keep within boundaries.
            constrainPlayerMovement();

            // Keep the fireballs raining down onto the player
            // from all directions.
            moveFireBalls();

            // Reset our fireballs if they reach the end of the canvas.
            // Also give them random x/y coordinates after resetting.
            resetFireballs();

            // Constantly check if we're out of fireball rounds.
            checkGameOver();

            // Draw our player.
            script.drawSprites();
        }
        draw();
    }

    return <Canvas draw={draw} height={320} width={480} />
}

export default App