import React, { useEffect, useState, Fragment } from 'react';
//import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react';
import Dragon from './assets/Dragon'
import Obstacles from './assets/Obstacles'

import Box from '@mui/material/Box';

export default function DragonFlight({childToParent}) {
    const screenWidth = 500//this is an arbitrary numbers so feel free to change them
    const screenHeight = 400
    const [difficulty, setDifficulty]= useState(1);
    const [inGame, setinGame]= useState(false)
    if(!inGame) {
        setDifficulty(  Math.floor(Math.random() * 7) + 1);
        //setinGame(true);
    }

    const obstacleSpacing = screenWidth/difficulty;
    const gameSpeed = 20-2*difficulty;//this dictates how fast the game goes
    const dragonLeft = 100
    const [dragonBottom, setDragonBottom]= useState(screenHeight / 2)
    const [obstaclesLeft, setObstaclesLeft]= useState(screenWidth/16 + obstacleSpacing)
    const [obstaclesLeftTwo, setObstaclesLeftTwo]= useState(400 + obstacleSpacing)
    const [obstaclesLeftThree, setObstaclesLeftThree]= useState(800 + obstacleSpacing)
    const [obstaclesLeftFour, setObstaclesLeftFour]= useState(1200 + obstacleSpacing)
    const [obstaclesLeftFive, setObstaclesLeftFive]= useState(1600 + obstacleSpacing)
    const [obstaclesLeftSix, setObstaclesLeftSix]= useState(2000 + obstacleSpacing)

    const [obstaclesNegHeight, setObstaclesNegHeight]= useState(0)
    const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo]= useState(0)
    const [obstaclesNegHeightThree, setObstaclesNegHeightThree]= useState(0)
    const [obstaclesNegHeightFour, setObstaclesNegHeightFour]= useState(0)
    const [obstaclesNegHeightFive, setObstaclesNegHeightFive]= useState(0)
    const [obstaclesNegHeightSix, setObstaclesNegHeightSix]= useState(0)

    const [isGameOver, setIsGameOver]= useState(false)
    const [isWinner, setIsWinner]= useState(false)
    const [score, setScore]= useState(0)

    const gravity = 1//this dictates how fast our dragon falls
    let obstacleWidth = 45
    let obstacleHeight = 200
    let gap = 200 - 10*difficulty;//this dictates the gap between objects
    let gameTimerId
    let obstaclesTimerId,obstaclesTimerIdTwo, obstaclesTimerIdThree, obstaclesTimerIdFour, obstaclesTimerIdFive, obstaclesTimerIdSix
    if(!inGame)
    {
        setObstaclesNegHeight(- Math.random() * 100)
        setObstaclesNegHeightTwo(- Math.random() * 150)
        setObstaclesNegHeightThree(- Math.random() * 150)
        setObstaclesNegHeightFour(- Math.random() * 150)
        setObstaclesNegHeightFive(- Math.random() * 150)
        setObstaclesNegHeightSix(- Math.random() * 200)
        setinGame(true)
    }
    //this is where we add the click detection
    /*useEffect( () => {
        if(!isWinner) {

            obstaclesTimerIdFour = setInterval(() => {
                setDragonBottom(dragonBottom => dragonBottom + 10)
                //document.addEventListener("mousedown", () => setDragonBottom(dragonBottom => dragonBottom + 1))
                //setIsWinner(true)
            }, 100)
            return () => {
                clearInterval(obstaclesTimerIdFour)
                //document.removeEventListener("mousedown", () => setDragonBottom(dragonBottom => dragonBottom + 1))
            }
        }

    }, [dragonBottom])*/
//start dragon falling
    useEffect(() => {
        if (dragonBottom > 0 && !isWinner) {
            gameTimerId = setInterval(() => {
                setDragonBottom(dragonBottom => dragonBottom - gravity)
                document.addEventListener("mousedown", () => setIsWinner(true))
            },gameSpeed)

            return () => {
                document.removeEventListener("mousedown", () => setIsWinner(true))
                document.removeEventListener("mouseup", () => setIsWinner(false))
                clearInterval(gameTimerId)
            }
        }
        else{
            gameTimerId = setInterval(() => {
                setDragonBottom(dragonBottom => dragonBottom + gravity)
                document.addEventListener("mouseup", () => setIsWinner(false))
            },gameSpeed)

            return () => {
                document.removeEventListener("mousedown", () => setIsWinner(true))
                document.removeEventListener("mouseup", () => setIsWinner(false))
                clearInterval(gameTimerId)
            }
        }
        //if i dont have dragonBottom as a dependecy, it wont stop
    }, [dragonBottom])
    console.log(dragonBottom)

    const jump = () => {
        if (!isGameOver && (dragonBottom < screenHeight)) {
            setDragonBottom(dragonBottom => dragonBottom + 1)
            console.log('jumped')
        }
    }

    //start first obstacle
    useEffect(() => {
        if (obstaclesLeft > -30) {
            obstaclesTimerId = setInterval(() => {
                setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
                //setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)

            }, gameSpeed)
            return () => {
                clearInterval(obstaclesTimerId)
            }
        } else if (obstaclesLeft <= -30 && score < 3) {
            setScore(score => score + 1)
            setObstaclesLeft(600);
        } else {
            setScore(score => score + 1)
            setObstaclesLeft(-6000);
        }

    }, [obstaclesLeft])

    //start second obstacle
    useEffect(() => {
        if (obstaclesLeftTwo > -30) {
            obstaclesTimerIdTwo = setInterval(() => {
                setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
            }, gameSpeed)
            return () => {
                clearInterval(obstaclesTimerIdTwo)

            }
        } else if (obstaclesLeftTwo <= -30 && score < 4) {
            setScore(score => score +1)
            setObstaclesLeftTwo(600);
        } else {
            setScore(score => score + 1)
            setObstaclesLeftTwo(-6000);
            if (score >= 6){
                childToParent('You passed the Minigame!');
            }
        }
    }, [obstaclesLeftTwo])
   // if(difficulty > 3)
    //start Third obstacle
    /*useEffect(() => {
        if (obstaclesLeftThree > -30) {
            obstaclesTimerIdThree = setInterval(() => {
                setObstaclesLeftThree(obstaclesLeftThree => obstaclesLeftThree - 5)
            }, gameSpeed)
            return () => {
                clearInterval(obstaclesTimerIdThree)

            }
        } else {
            setScore(score => score +1)
            setObstaclesLeftThree(-600);
        }
    }, [obstaclesLeftThree])
    //start Fourth obstacle
    useEffect(() => {
        if (obstaclesLeftFour > -30) {
            obstaclesTimerIdFour = setInterval(() => {
                setObstaclesLeftFour(obstaclesLeftFour => obstaclesLeftFour - 5)
            }, gameSpeed)
            return () => {
                clearInterval(obstaclesTimerIdFour)

            }
        } else {
            setScore(score => score +1)
            setObstaclesLeftFour(-600);
        }
    }, [obstaclesLeftFour])
    //start Fifth obstacle
    useEffect(() => {
        if (obstaclesLeftFive > -30) {
            obstaclesTimerIdFive = setInterval(() => {
                setObstaclesLeftFive(obstaclesLeftFive => obstaclesLeftFive - 5)
            }, gameSpeed)
            return () => {
                clearInterval(obstaclesTimerIdFive)

            }
        } else {
            setScore(score => score +1)
            setObstaclesLeftFive(-600);
        }
    }, [obstaclesLeftFive])
    //start Sixth obstacle
    useEffect(() => {
        if (obstaclesLeftSix > -30) {
            obstaclesTimerIdSix = setInterval(() => {
                setObstaclesLeftSix(obstaclesLeftSix => obstaclesLeftSix - 5)
            }, gameSpeed)
            return () => {
                clearInterval(obstaclesTimerIdSix)

            }
        } else {
            setScore(score => score +1)
            setObstaclesLeftSix(-600);
        }
    }, [obstaclesLeftSix])*/

    //check for collisions
    useEffect(() => {
       // console.log(obstaclesLeft)
       // console.log(screenWidth/2)
        //console.log(obstaclesLeft > screenWidth/2)
        if (
            ((dragonBottom < (obstaclesNegHeight + obstacleHeight + 25) ||
                    dragonBottom > (obstaclesNegHeight + obstacleHeight + gap)) &&
                (obstaclesLeft > dragonLeft -50 && obstaclesLeft < dragonLeft + 50 )
            )
            ||
            ((dragonBottom < (obstaclesNegHeightTwo + obstacleHeight + 25) ||
                    dragonBottom > (obstaclesNegHeightTwo + obstacleHeight + gap)) &&
                (obstaclesLeftTwo > dragonLeft -50 && obstaclesLeftTwo < dragonLeft + 50 )
            )
                ||
            ((dragonBottom < (obstaclesNegHeightThree + obstacleHeight + 25) ||
                    dragonBottom > (obstaclesNegHeightThree + obstacleHeight + gap)) &&
                (obstaclesLeftThree > dragonLeft -50 && obstaclesLeftThree < dragonLeft + 50 )
            )
                ||
            ((dragonBottom < (obstaclesNegHeightFour + obstacleHeight + 25) ||
                    dragonBottom > (obstaclesNegHeightFour + obstacleHeight + gap)) &&
                (obstaclesLeftFour > dragonLeft -50 && obstaclesLeftFour < dragonLeft + 50 )
            )
                ||
            ((dragonBottom < (obstaclesNegHeightFive + obstacleHeight + 25) ||
                    dragonBottom > (obstaclesNegHeightFive + obstacleHeight + gap)) &&
                (obstaclesLeftFive > dragonLeft -50 && obstaclesLeftFive < dragonLeft + 50 )
            )
                ||
            ((dragonBottom < (obstaclesNegHeightSix + obstacleHeight + 25) ||
                    dragonBottom > (obstaclesNegHeightSix + obstacleHeight + gap)) &&
                (obstaclesLeftSix > dragonLeft -50 && obstaclesLeftSix < dragonLeft + 50 )
            )
        )
        {
            console.log('game over')
            gameOver()
        }
    })

    //this is where we include the game over code
    const gameOver = () => {
        /*if(!isGameOver)
        {
            alert("winner");
            //return to the board
        }
        if(isGameOver)
        {
            alert("loser");
            //get penalized
            //return to the board
        }*/
        clearInterval(gameTimerId)
        clearInterval(obstaclesTimerId)
        clearInterval(obstaclesTimerIdTwo)
        clearInterval(obstaclesTimerIdThree)
        clearInterval(obstaclesTimerIdFour)
        clearInterval(obstaclesTimerIdFive)
        clearInterval(obstaclesTimerIdSix)
        setIsGameOver(true)
        console.log(`In Game over: ${score}`);
        if (score >= 5){
            childToParent('You passed the Minigame!');
        }
        else{
            childToParent('You failed the Minigame!');
        }
    }


    return (
        //style={styles.container}
        //<TouchableWithoutFeedback onClick={jump}>
/*style={{
            width: 500,
            height: 500,
            backgroundColor: "white"
        }}*/
        <Fragment>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },
                }}
            >
        <div>
            {/*{score >= 6 && !isGameOver && <h1 align="left" style={{fontSize: '30px'}}>Winner!!!{gameOver}</h1>}*/}
            {/*{score < 6 && isGameOver && <h1 align="left" style={{fontSize: '30px'}}>You Lost!{gameOver}</h1>}*/}
            <Dragon
                dragonBottom = {dragonBottom}
                dragonLeft = {dragonLeft}
            />
            <Obstacles
                color={'grey'}
                obstacleWidth = {obstacleWidth}
                obstacleHeight = {obstacleHeight}
                randomBottom = {obstaclesNegHeight}
                gap = {gap}
                obstaclesLeft = {obstaclesLeft}
            />
            <Obstacles
                color={'grey'}
                obstacleWidth = {obstacleWidth}
                obstacleHeight = {obstacleHeight}
                randomBottom = {obstaclesNegHeightTwo}
                gap = {gap}
                obstaclesLeft = {obstaclesLeftTwo}
            />
        </div>
</Box>
</Fragment>
        // </TouchableWithoutFeedback>
    )
}

/*const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
})*/
