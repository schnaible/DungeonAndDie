import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import GameBoard from "../Board/src/GameBoard"


const triviasTableAttributes = [
    {
        attributeName: 'Question',
        attributeDBName: 'Question',
        align: 'left'
    },
    {
        attributeName: 'Answer',
        attributeDBName: 'Answer',
        align: 'left'
    },
    {
        attributeName: 'Incorrect Answer #1',
        attributeDBName: 'notAnswer1',
        align: 'left'
    },
    {
        attributeName: 'Incorrect Answer #2',
        attributeDBName: 'notAnswer2',
        align: 'left'
    },
    {
        attributeName: 'Incorrect Answer #3',
        attributeDBName: 'notAnswer3',
        align: 'left'
    },
    {
        attributeName: 'Question ID',
        attributeDBName: 'QuestionID',
        align: 'left'
    }
];

let keyID = 0;

const nextKey = () => keyID++;
let choices = ["0000000","0000000","0000000","0000000"];

export default function TriviaTable({childToParent}) {
    const [trivias, setTrivias] = useState(["0","0","0","0"]);//Dont forget to initialize each answer!
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(10);


    // console.log(`In Trivia Game: triviaGameWon: ${gameWon}`);
    // console.log(`In Trivia from GameBoard, ${GameBoard}`);       // Gets the Game Board information
    let intervalId;

    useEffect(() => {//this code handles the stopwatch timer
        if (isActive) {
            intervalId = setInterval(() => {
                setCounter(counter => counter - 1);
            }, 1000)
        }
        if (counter <= 0) {
            gameOver(false);
            setCounter(10);
        }
        return () => clearInterval(intervalId);
    }, [isActive, counter])

    console.log(`in TriviaTTable trivias contains is ${JSON.stringify(trivias)}`);

    useEffect(() => {//Seems like useEffect is essential for the game to work!
        const api = new API();

        async function getTrivias() {//This must remain asynchronous
            let randomQuestion = Math.floor((Math.random() * (21 - 1)) + 1);//this produces a random value from 1 - 8
            const triviasJSONString = await api.triviasWithID(randomQuestion);//this pulls that number's row from the database

            console.log(`trivias from the DB ${JSON.stringify(triviasJSONString)}`);
            setTrivias(triviasJSONString.data);
            choices[0] = undefined;
        }

        getTrivias();
    }, []);//Somehow putting Trivias here breaks the system (infinite refreshing) fix is to backtrack code
    function gameOver(isWinner){
        if(isWinner){
            childToParent('You passed the Minigame!');
        }
        //score would be incremented if you won
            else if(counter <= 0){
            childToParent('You failed the Minigame!');
        }
        else{
            childToParent('You failed the Minigame!');
        }

        setIsActive(false);
        clearInterval(intervalId);

        // health decremented if you lost
    }
    //this is where we extract the answers from the database
    let answer = JSON.stringify(trivias[0][`Answer`]);
    let notAnswer1 = JSON.stringify(trivias[0][`notAnswer1`]);
    let notAnswer2 = JSON.stringify(trivias[0][`notAnswer2`]);
    let notAnswer3 = JSON.stringify(trivias[0][`notAnswer3`]);
    let question = JSON.stringify(trivias[0][`Question`]);
    //This is where we remove the extra quotes stringify adds
    if(JSON.stringify(trivias[0][`Answer`]) !== undefined) {
        answer = JSON.stringify(trivias[0][`Answer`]).substring(1,answer.length-1);
    }
    if(JSON.stringify(trivias[0][`notAnswer1`]) !== undefined) {
        notAnswer1 = JSON.stringify(trivias[0][`notAnswer1`]).substring(1,notAnswer1.length-1);
    }
    if(JSON.stringify(trivias[0][`notAnswer2`]) !== undefined) {
        notAnswer2 = JSON.stringify(trivias[0][`notAnswer2`]).substring(1,notAnswer2.length-1);
    }
    if(JSON.stringify(trivias[0][`notAnswer3`]) !== undefined) {
        notAnswer3 = JSON.stringify(trivias[0][`notAnswer3`]).substring(1,notAnswer3.length-1);
    }
    if(JSON.stringify(trivias[0][`Question`]) !== undefined) {
        question = JSON.stringify(trivias[0][`Question`]).substring(1,question.length-1);
    }
    //this if statement prevents the shuffled answers from being organized again
    if(choices[0] === "0000000" || choices[0] === undefined || !isActive) {
        choices = [answer, notAnswer1, notAnswer2, notAnswer3];
        if(choices[0] !== undefined) {
            shuffle();
            setIsActive(true);
        }
    }
    function shuffle() {
        for (let i = 0; i < 4; i++) {//this loop is what randomizes the order of the trivia answers
            let answerOrderGenerator = Math.floor((Math.random() * 4));
            let swap = Math.floor((Math.random() * 4));
            while (swap === answerOrderGenerator)//this inner loop prevents us from not swapping anything
                swap = Math.floor((Math.random() * 4));

            //this is where we swap potential answers
            let temp = choices[answerOrderGenerator];
            choices[answerOrderGenerator] = choices[swap];
            choices[swap] = temp;
        }
    }
   /* if(JSON.stringify(trivias[0][`Question`]) !== undefined && counter === 10) {
        shuffle();
    }*/
    function handleClick(selection){
        if(selection === answer)
            return true;
        return false;
    }
    //This is where each of the 4 buttons are assigned an Answer
    const buttons = [
        <Button key="one" onClick ={() => {
            if (handleClick(choices[0]))
                gameOver(true);
            else
                gameOver(false);
        }}
        >{choices[0]}</Button>,
        <Button key="two" onClick ={() => {
            if (handleClick(choices[1]))
                gameOver(true);
            else
                gameOver(false);
        }}>{choices[1]}</Button>,
        <Button key="three" onClick ={() => {
            if (handleClick(choices[2]))
                gameOver(true);
            else
                gameOver(false);
        }}>{choices[2]}</Button>,
        <Button key="four" onClick ={() => {
            if (handleClick(choices[3]))
                gameOver(true);
            else
                gameOver(false);
        }}>{choices[3]}</Button>,
    ];
    //   if(answerOrderGenerator)
    //}

    return (
        <Fragment>
            <h1 key="question" align="center">
                {question }
            </h1>
            <div className="time">
                <p align="center">
                    <span role="img" aria-label="clock" style={{paddingRight: 10}}>⏰</span>
                    <span align={"bottom"} className="counter">{counter}</span>
                </p>
            </div>

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

                <ButtonGroup size="large" aria-label="large button group">
                    {buttons}
                </ButtonGroup>
            </Box>
        </Fragment>
    );

}