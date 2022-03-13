import {NUM_COLUMNS, NUM_ROWS} from "./constants";
import doWeHaveAWinner from "./doWeHaveAWinner";
import {useState, Button, Modal, render} from 'react';
import {isEmpty} from "ramda";

// import Breakout from './Minigames/Breakout/breakout';

const powerupList = ['Restore Health', 'Boost Score', 'Boost Movement', 'Win Minigame'];

function advanceColor(color) {
    return '#1B0F2B';
}

function advancePlayer(playerNum, state) {
    const numberOfPlayers = state.numPlayers;
    console.log(`Number of Players this Game: ${numberOfPlayers}`)
    console.log(`current Player Num: ${playerNum}`)
    let newPlayerNum = playerNum + 1;
    if (newPlayerNum >= numberOfPlayers){
        newPlayerNum = 0;
    }
    // if (state.playerList[newPlayerNum].hasEscaped){
    //     newPlayerNum += 1;
    // }
    // if (newPlayerNum >= numberOfPlayers){
    //     newPlayerNum = 0;
    // }
    console.log(`${state.playerList[newPlayerNum].hasEscaped}`)
    while (state.playerList[newPlayerNum].hasEscaped === true){
        console.log(`checking player: ${newPlayerNum}. Escaped: ${state.playerList[newPlayerNum].hasEscaped}`);
        newPlayerNum += 1;
        if (newPlayerNum >= numberOfPlayers){
            newPlayerNum = 0;
        }
    }
    console.log(`new player num: ${newPlayerNum}`);
    return newPlayerNum;
}

function checkOccupancy(playerList, positionToCheck, playerNum, isMovingAway){
   // console.log(`Position that current player is move away from: ${positionToCheck}`);
    console.log('Entering checkOccupancy function');
    let playersAtPosition = [];
    if (isMovingAway) {
        for (let i = 0; i < playerList.length; i++) {
            if (playerList[i].playerPosition == positionToCheck && i != playerNum) {
                console.log(` player at position ${playerList[i].playerClass}`);
                playersAtPosition.push(i + 1);
            }
        }
    }
    else{
        for (let i = 0; i < playerList.length; i++) {
            if (playerList[i].playerPosition == positionToCheck) {
                console.log(` player at position ${playerList[i].playerClass}`);
                playersAtPosition.push(i + 1);
            }
        }
    }
    if (positionToCheck == 99){
        return 'https://blue.cs.sonoma.edu/~kschnaible/BoardFloor3.png';
    }
    else if (playersAtPosition.length == 4){
        console.log(`All 4 players`);
        console.log(`${playersAtPosition}`);
        return  'https://blue.cs.sonoma.edu/~kschnaible/ClericThiefRogueTank.png';
    }
    else if (playersAtPosition.length == 3){
        console.log(`3 players`);
        console.log(`${playersAtPosition}`);
        if (JSON.stringify(playersAtPosition) === JSON.stringify([1,2,3])){
            return  'https://blue.cs.sonoma.edu/~kschnaible/ClericRogueThief.png';
        }
        else if (JSON.stringify(playersAtPosition) === JSON.stringify([1,2,4])){
            return  'https://blue.cs.sonoma.edu/~kschnaible/RogueThiefTank.png';
        }
        else if (JSON.stringify(playersAtPosition) === JSON.stringify([1,3,4])){
            return  'https://blue.cs.sonoma.edu/~kschnaible/ClericRogueTank.png';
        }
        else if (JSON.stringify(playersAtPosition) === JSON.stringify([2,3,4])){
            // console.log(`We should see Thief Cleric and Tank`)
            return  'https://blue.cs.sonoma.edu/~kschnaible/ClericThiefTank.png';
        }
    }
    else if (playersAtPosition.length == 2){
        console.log(`2 players`);
        console.log(`${playersAtPosition}`);
        if (JSON.stringify(playersAtPosition) === JSON.stringify([1,2])){
            return  'https://blue.cs.sonoma.edu/~kschnaible/RogueThief.png';
        }
        else if (JSON.stringify(playersAtPosition) === JSON.stringify([1,3])){
            return  'https://blue.cs.sonoma.edu/~kschnaible/ClericRogue.png';
        }
        else if (JSON.stringify(playersAtPosition) === JSON.stringify([1,4])){
            return  'https://blue.cs.sonoma.edu/~kschnaible/RogueTank.png';
        }
        else if (JSON.stringify(playersAtPosition) === JSON.stringify([2,3])){
            return  'https://blue.cs.sonoma.edu/~kschnaible/ClericThief.png';
        }
        else if (JSON.stringify(playersAtPosition) === JSON.stringify([2,4])){
            return  'https://blue.cs.sonoma.edu/~kschnaible/ThiefTank.png';
        }
        else if (JSON.stringify(playersAtPosition) === JSON.stringify([3,4])){
            return  'https://blue.cs.sonoma.edu/~kschnaible/ClericTank.png';
        }
    }
    else if(playersAtPosition.length == 1){
        console.log(`1 player`);
        console.log(`${playersAtPosition}`);
        return playerList[playersAtPosition[0]-1].classImage;
    }
    else if (playersAtPosition.length == 0){
        console.log(`0 players`);
        return 'https://blue.cs.sonoma.edu/~kschnaible/BoardFloor3.png';
    }
    console.log('Exiting checkOccupancy function');

}

function getStartingCellImage(playerList){
    console.log('Entering getStartingCellImage function');
    let playersAtPosition = [];
    for (let i = 0; i < playerList.length; i++) {
        console.log(`${playerList[i]}`);
        if (playerList[i].playerName != ''){
            playersAtPosition.push(i + 1);
        }
    }
    if (playersAtPosition.length == 4){
        console.log(`All 4 players`);
        console.log(`${playersAtPosition}`);
        return  'https://blue.cs.sonoma.edu/~kschnaible/ClericThiefRogueTank.png';
    }
    else if (playersAtPosition.length == 3){
        console.log(`3 players`);
        console.log(`${playersAtPosition}`);
        if (JSON.stringify(playersAtPosition) === JSON.stringify([1,2,3])){
            return  'https://blue.cs.sonoma.edu/~kschnaible/ClericRogueThief.png';
        }
        else if (JSON.stringify(playersAtPosition) === JSON.stringify([1,2,4])){
            return  'https://blue.cs.sonoma.edu/~kschnaible/RogueThiefTank.png';
        }
        else if (JSON.stringify(playersAtPosition) === JSON.stringify([1,3,4])){
            return  'https://blue.cs.sonoma.edu/~kschnaible/ClericRogueTank.png';
        }
        else if (JSON.stringify(playersAtPosition) === JSON.stringify([2,3,4])){
            // console.log(`We should see Thief Cleric and Tank`)
            return  'https://blue.cs.sonoma.edu/~kschnaible/ClericThiefTank.png';
        }
    }
    else if (playersAtPosition.length == 2){
        console.log(`2 players`);
        console.log(`${playersAtPosition}`);
        if (JSON.stringify(playersAtPosition) === JSON.stringify([1,2])){
            return  'https://blue.cs.sonoma.edu/~kschnaible/RogueThief.png';
        }
        else if (JSON.stringify(playersAtPosition) === JSON.stringify([1,3])){
            return  'https://blue.cs.sonoma.edu/~kschnaible/ClericRogue.png';
        }
        else if (JSON.stringify(playersAtPosition) === JSON.stringify([1,4])){
            return  'https://blue.cs.sonoma.edu/~kschnaible/RogueTank.png';
        }
        else if (JSON.stringify(playersAtPosition) === JSON.stringify([2,3])){
            return  'https://blue.cs.sonoma.edu/~kschnaible/ClericThief.png';
        }
        else if (JSON.stringify(playersAtPosition) === JSON.stringify([2,4])){
            return  'https://blue.cs.sonoma.edu/~kschnaible/ThiefTank.png';
        }
        else if (JSON.stringify(playersAtPosition) === JSON.stringify([3,4])){
            return  'https://blue.cs.sonoma.edu/~kschnaible/ClericTank.png';
        }
    }
    else if(playersAtPosition.length == 1){
        console.log(`1 player`);
        console.log(`${playersAtPosition}`);
        return playerList[playersAtPosition[0]-1].classImage;
    }
    else if (playersAtPosition.length == 0){
        console.log(`0 players`);
        return 'https://blue.cs.sonoma.edu/~kschnaible/BoardFloor3.png';
    }
    console.log('Exiting getStartingCellImage function');
}

function startBoardGame(state,playerNameArray){
    let affectedPlayerList = state.playerList.slice();

    for (let i = 0; i < playerNameArray.length; i++) {
        console.log(`Entered playername: ${playerNameArray[i].value}`);
        if (playerNameArray[i].value == ""){
            console.log(`You ain't got no name!`);
            affectedPlayerList[i] = {
                ...affectedPlayerList[i],
                playerName: playerNameArray[i].value,
                playerPosition: 99,
                hasEscaped: true
            };
        }
        else {
            affectedPlayerList[i] = {
                ...affectedPlayerList[i],
                playerName: playerNameArray[i].value
            };
        }
    }

    let newBoard = state.board.slice();
    let firstRow = newBoard[0].slice();
    firstRow[0] = {
        ...firstRow[0],
        image: getStartingCellImage(affectedPlayerList),
        isOccupied: true
    };
    newBoard[0] = firstRow;


    let newState = {
        ...state,
        board: newBoard,
        playerList: affectedPlayerList,
        gameStarted: true,
    };

    newState = {
        ...newState,
        currentPlayerNum: advancePlayer(99, newState)
    };


    return newState;
}

function createInitialState() {
    // The board is a 2D array of Objects. Each Object holds the state of the "cell" that it represents. - From 4-in-a-row Board

    let board = Array(NUM_ROWS).fill(Array(NUM_COLUMNS).fill({color: "#1B0F2B", image: 'https://blue.cs.sonoma.edu/~kschnaible/BoardFloor3.png', isOccupied: false}));
    board.map((row, rowIdx) => row.map( (col, colIdx) => {
        return {...board[rowIdx][colIdx], row: rowIdx, column: colIdx }
    }));

    let player1 = {
        playerPosition: 0,
        playerClass: 'Rogue',
        playerHP: 4,
        maxHP: 4,
        playerScore: 0,
        heldPowerups: [],
        usedPowerup: 'none',
        playerAbility: 'none',
        dieValue: 8,
        classImage: 'https://blue.cs.sonoma.edu/~kschnaible/Rogue1.png',
        hasEscaped: false,
        playerName: ''
    }

    let player2 = {
        playerPosition: 0,
        playerClass: 'Thief',
        playerHP: 6,
        maxHP: 6,
        playerScore: 0,
        heldPowerups: [],
        usedPowerup: 'none',
        playerAbility: 'Plunder',
        abilityCooldown: 0,
        dieValue: 6,
        classImage: 'https://blue.cs.sonoma.edu/~kschnaible/Thief1.png',
        hasEscaped: false,
        playerName: ''
    }

    let player3 = {
        playerPosition: 0,
        playerClass: 'Cleric',
        playerHP: 6,
        maxHP: 6,
        playerScore: 0,
        heldPowerups: [],
        usedPowerup: 'none',
        playerAbility: 'Heal',
        abilityCooldown: 0,
        dieValue: 6,
        classImage: 'https://blue.cs.sonoma.edu/~kschnaible/Cleric1.png',
        hasEscaped: false,
        playerName: ''
    }

    let player4 = {
        playerPosition: 0,
        playerClass: 'Tank',
        playerHP: 8,
        maxHP: 8,
        playerScore: 0,
        heldPowerups: [],
        usedPowerup: 'none',
        playerAbility: 'none',
        dieValue: 5,
        classImage: 'https://blue.cs.sonoma.edu/~kschnaible/Tank1.png',
        hasEscaped: false,
        playerName: ''
    }

    return {
        board,
        firstAvailableIndex: Array(NUM_COLUMNS).fill(NUM_ROWS - 1),
        haveAWinner: false,
        nextColor: '#1B0F2B',
        playerList: [player1, player2, player3, player4],
        currentPlayerNum: 0,
        numPlayers: 4,
        gameStarted: false
    };
}

function integrateDieRoll(state) {
    console.log('Calling integrateDieRoll Function');
    let currentPlayerNum = state.currentPlayerNum;
    console.log(`current Player Num: ${JSON.stringify(state.playerList[currentPlayerNum])}`);
    const currentPosition = state.playerList[currentPlayerNum].playerPosition;
    const maximumRollValue = state.playerList[currentPlayerNum].dieValue;
    let currentPlayerImage = state.playerList[currentPlayerNum].classImage;
    const activePlayerNum = state.currentPlayerNum;
    // Create a copy of our player array
    let affectedPlayerList = state.playerList.slice();
    // const currentPosition = state.playerPosition;

    if (currentPosition > 99) {
        return;
    }

    console.log(`currentPosition: ${currentPosition}`);
    let rollValue = Math.floor((Math.random() * maximumRollValue)+1); // Roll a die
    // let rollValue = 33; // Roll a die
    console.log(`rollValue: ${rollValue}`);

    if (state.playerList[currentPlayerNum].usedPowerup == 'Boost Movement'){
       rollValue += 3;
        affectedPlayerList[currentPlayerNum] = {
            ...affectedPlayerList[currentPlayerNum],
            usedPowerup: 'none'
        };
    }

    let newPosition = rollValue + currentPosition; // Update position based on the die roll
    console.log(`newPosition: ${newPosition}`);


    // Remove the marker of the player so there will only be one.
    const oldPosition = state.playerList[currentPlayerNum].playerPosition;
    const oldColIdx = Math.floor(oldPosition%NUM_COLUMNS);
    const oldRowIdx = Math.floor(oldPosition/NUM_ROWS);

    let board = state.board;
    let oldAffectedRow = board[oldRowIdx].slice();

    // Check if another player is on the cell the current player is moving away from
    // If there is another player, draw its picture. If not draw an empty cell.
    const checkedOccupancy = checkOccupancy(state.playerList, oldPosition, currentPlayerNum, true);
    // if (checkedOccupancy != 'https://blue.cs.sonoma.edu/~kschnaible/BoardFloor3.png'){
        const newImage = checkedOccupancy;
        console.log(`newImage: ${newImage}`);
        oldAffectedRow[oldColIdx] = {
            ...oldAffectedRow[oldRowIdx],
            color: '#1B0F2B',
            image: newImage,
            isOccupied: true
        };

    board[oldRowIdx] = oldAffectedRow



    // Update the board to show the new player marker
    const colIdx = Math.floor(newPosition%NUM_COLUMNS);
    const rowIdx = Math.floor(newPosition/NUM_ROWS);
    console.log(`rowIdx: ${rowIdx}`);
    console.log(`cellIdx: ${colIdx}`);

    if (newPosition >= 99){
        // Player has moved enough tiles to exit the dungeon
        // Call game complete functionality for current player
        affectedPlayerList[currentPlayerNum] = {
            ...affectedPlayerList[currentPlayerNum],
            playerPosition: 99,
            hasEscaped: true
        };

        let numEscapedPlayers = 0;
        for (let i = 0; i <state.numPlayers; i++) {
            if (affectedPlayerList[i].hasEscaped === true){
                numEscapedPlayers += 1;
            }
            if (numEscapedPlayers == state.numPlayers){
                let newState = {
                    ...state,
                    playerList: affectedPlayerList,
                    haveAWinner: true,
                };
                return newState;
            }
        }

        let newState = {
            ...state,
            playerList: affectedPlayerList,
            haveAWinner: false,
            currentPlayerNum: advancePlayer(activePlayerNum, state)
        };
        return newState;
    }

    // Select the current player in array, update their information.
    affectedPlayerList[currentPlayerNum] = {
        ...affectedPlayerList[currentPlayerNum],
        playerPosition: newPosition
    };

    // Update the Board based on the new player position
    let affectedRow = board[rowIdx].slice();

    // Decrements ability cooldown to 0 if player has used ability recently
    if (state.playerList[currentPlayerNum].playerClass === 'Cleric' || state.playerList[currentPlayerNum].playerClass === 'Thief'){
        if (state.playerList[currentPlayerNum].abilityCooldown != 0){
            let newAbilityCooldown = state.playerList[currentPlayerNum].abilityCooldown - 1;
            affectedPlayerList[currentPlayerNum] = {
                ...affectedPlayerList[currentPlayerNum],
                abilityCooldown: newAbilityCooldown
            };
        }
    }


    let  newBoard= board.slice();
    newBoard[rowIdx] = affectedRow;
    const activeColor = state.nextColor;


    console.log(`affectedPlayer: `, affectedPlayerList[currentPlayerNum]);
    // state.playerList = affectedPlayerList;  // We do NOT want to do this


    let newState = {
        ...state,
        board: newBoard,
        nextColor: advanceColor(activeColor),
        playerList: affectedPlayerList,
        currentPlayerNum: advancePlayer(activePlayerNum, state)
    };

    if (affectedPlayerList[currentPlayerNum].playerPosition == 0){
        affectedRow[colIdx] = {
            ...affectedRow[rowIdx],
            color: '#1B0F2B',
            image: 'https://blue.cs.sonoma.edu/~kschnaible/BoardFloor3.png',
            isOccupied: false,
        };
    }
    else {
        affectedRow[colIdx] = {
            ...affectedRow[rowIdx],
            color: '#1B0F2B',
            isOccupied: true,
        };

        const hasPlayers = checkOccupancy(newState.playerList, newPosition, currentPlayerNum, false);
        affectedRow[colIdx] = {
            ...affectedRow[rowIdx],
            image: hasPlayers,
        };

        console.log(`in the else affecting position: ${JSON.stringify(affectedRow[rowIdx])}`)
    }

    console.log(newState)
    console.log('Exiting integrateDieRoll Function');

    return newState;
}

function decreasePlayerHealth(state){
    console.log(`Entering decreasePlayerHealth Function`);
    let currentPlayerNum = state.currentPlayerNum
    // Create a copy of our player array
    let affectedPlayerList = state.playerList.slice();
    const oldPosition = state.playerList[currentPlayerNum].playerPosition;
    const oldColIdx = Math.floor(oldPosition%NUM_COLUMNS);
    const oldRowIdx = Math.floor(oldPosition/NUM_ROWS);
    let newPlayerHP = state.playerList[currentPlayerNum].playerHP;
    let newPosition = state.playerList[currentPlayerNum].playerPosition;
    let resetPlayer = false;


        console.log(`Lost minigame!`);

    if (affectedPlayerList[currentPlayerNum].usedPowerup == 'Boost Score'){
        affectedPlayerList[currentPlayerNum] = {
            ...affectedPlayerList[currentPlayerNum],
            usedPowerup: 'none'
        };
    }

        console.log(`Current playerHP: ${state.playerList[currentPlayerNum].playerHP}`);
        newPlayerHP -= 1;
        if (newPlayerHP < 1){
            resetPlayer = true;
            newPlayerHP = state.playerList[currentPlayerNum].maxHP;
            newPosition = 0;
        }
        console.log(`New playerHP: ${newPlayerHP}`);

    const newColIdx = Math.floor(newPosition%NUM_COLUMNS);
    const newRowIdx = Math.floor(newPosition/NUM_ROWS);
    // Select the current player in array, update their information.
    affectedPlayerList[currentPlayerNum] = {
        ...affectedPlayerList[currentPlayerNum],
        playerPosition: newPosition,
        playerHP: newPlayerHP,
    };

    let newBoard = state.board;
    let oldAffectedRow = newBoard[oldRowIdx].slice();
    let newAffectedRow = newBoard[newRowIdx].slice();


    // newBoard[newRowIdx] = newAffectedRow;

    let newState = {
        ...state,
        board: newBoard,
        playerList: affectedPlayerList,
    };

    if (resetPlayer){
        const movedFrom = checkOccupancy(state.playerList, oldPosition, currentPlayerNum,true);

        oldAffectedRow[oldColIdx] = {
            ...oldAffectedRow[oldRowIdx],
            color: '#1B0F2B',
            image: movedFrom,
        };
        newBoard[oldRowIdx] = oldAffectedRow;


        newAffectedRow[newColIdx] = {
            ...newAffectedRow[newRowIdx],
            color: '#1B0F2B',
            isOccupied: true,
        };

        // Trying to update the starting position to show the player that moved back and any other players that are already there.
        const movedTo =  checkOccupancy(newState.playerList, newPosition, currentPlayerNum,true);
        console.log(`moved to returned: ${movedTo}`);
        newAffectedRow[newColIdx] = {
            ...newAffectedRow[newRowIdx],
            image: movedTo,
        };

    }

    console.log(newState)
    console.log('Exiting decreasePlayerHealth Function');

    return newState;

}

function increasePlayerScore(state){
    console.log('Entering increasePlayerScore Function')
    let currentPlayerNum = state.currentPlayerNum
    // Create a copy of our player array
    let affectedPlayerList = state.playerList.slice();
    let newPlayerScore = affectedPlayerList[currentPlayerNum].playerScore;

    console.log(`Won minigame!`);
    if (affectedPlayerList[currentPlayerNum].usedPowerup == 'Boost Score'){
        newPlayerScore +=100;
        affectedPlayerList[currentPlayerNum] = {
            ...affectedPlayerList[currentPlayerNum],
            usedPowerup: 'none'
        };
    }

    newPlayerScore += 100;
    console.log(`New playerScore: ${newPlayerScore}`);

    // Select the current player in array, update their information.
    affectedPlayerList[currentPlayerNum] = {
        ...affectedPlayerList[currentPlayerNum],
        playerScore: newPlayerScore,
    };

    let newState = {
        ...state,
        playerList: affectedPlayerList,
    };

    console.log('Exiting increasePlayerScore Function')

    return newState;
}

function increasePlayerHealth(state){
    // This function is called when the Cleric casts its Heal ability
    console.log(`Entering increasePlayerHealth Function`);
    let currentPlayerNum = state.currentPlayerNum
    // Create a copy of our player array
    let affectedPlayerList = state.playerList.slice();
    let newPlayerHP = state.playerList[currentPlayerNum].playerHP;
    let playerAbilityCooldown = state.playerList[currentPlayerNum].abilityCooldown;

    console.log(`Current playerHP: ${state.playerList[currentPlayerNum].playerHP}`);
    if (newPlayerHP != state.playerList[currentPlayerNum].maxHP){
        if(playerAbilityCooldown == 0){
            newPlayerHP += 1;
            playerAbilityCooldown = 5;
        }
        else{
            console.log(`You can heal yourself in ${playerAbilityCooldown} rounds`);
        }
    }
    console.log(`New playerHP: ${newPlayerHP}`);

    // Select the current player in array, update their information.
    affectedPlayerList[currentPlayerNum] = {
        ...affectedPlayerList[currentPlayerNum],
        playerHP: newPlayerHP,
        abilityCooldown: playerAbilityCooldown
    };

    let newState = {
        ...state,
        playerList: affectedPlayerList,
    };

    console.log(newState)
    console.log('Exiting increasePlayerHealth Function');

    return newState;

}

function awardPlayerPowerup(state){
    // This function is to give the THIEF with a powerup when using the 'plunder' ability
    console.log(`Entering awardPlayerPowerup Function`);
    const selectedPowerup = Math.floor((Math.random() * powerupList.length)); // Select a random powerup
    let currentPlayerNum = state.currentPlayerNum;
    // Create a copy of our player array
    let affectedPlayerList = state.playerList.slice();
    let currentlyHeldPowerups = state.playerList[currentPlayerNum].heldPowerups;
    let playerAbilityCooldown = state.playerList[currentPlayerNum].abilityCooldown;

    if (currentlyHeldPowerups.length != 3) {
        if(playerAbilityCooldown == 0){
            currentlyHeldPowerups.push(powerupList[selectedPowerup]);
            playerAbilityCooldown = 3;
        }
        else{
            console.log(`You can plunder in ${playerAbilityCooldown} rounds`);
        }

    }
    else{
        console.log(`You are holding too many powerups`);
    }

    // Select the current player in array, update their information.
    affectedPlayerList[currentPlayerNum] = {
        ...affectedPlayerList[currentPlayerNum],
        heldPowerups: currentlyHeldPowerups,
        abilityCooldown: playerAbilityCooldown
    };

    let newState = {
        ...state,
        playerList: affectedPlayerList,
    };

    console.log(newState)
    console.log('Exiting awardPlayerPowerup Function');

    return newState;
}

function findRandomPowerup(state){
    // This function is to award a player with a random powerup sometimes when they win a minigame
    console.log(`Entering findRandomPowerup Function`);

    const foundPowerup = Math.floor((Math.random() * 9)+1);
    if (foundPowerup > 3){
        const selectedPowerup = Math.floor((Math.random() * powerupList.length)); // Select a random powerup
        // const selectedPowerup = 3;
        let currentPlayerNum = state.currentPlayerNum;
        // Create a copy of our player array
        let affectedPlayerList = state.playerList.slice();
        let currentlyHeldPowerups = state.playerList[currentPlayerNum].heldPowerups;

        if (state.playerList[currentPlayerNum].heldPowerups.length != 3) {
            state.playerList[currentPlayerNum].heldPowerups.push(powerupList[selectedPowerup]);
        }
        else{
            console.log(`You are holding too many powerups`);
        }

        // Select the current player in array, update their information.
        affectedPlayerList[currentPlayerNum] = {
            ...affectedPlayerList[currentPlayerNum],
            heldPowerups: currentlyHeldPowerups,
        };

        let newState = {
            ...state,
            playerList: affectedPlayerList,
        };

        console.log(newState)
        return newState;
    }

    console.log('Exiting findRandomPowerup Function');
}

function setPlayerPowerup(state, selectedPowerup){
    // Sets the current player's usedPowerup to the selected button.
    console.log('Entering setPlayerPowerup Function');

    let currentPlayerNum = state.currentPlayerNum
    // Create a copy of our player array
    let affectedPlayerList = state.playerList.slice();
    let playerUsedAbility = state.playerList[currentPlayerNum].usedPowerup;
    let playerHeldPowerups = state.playerList[currentPlayerNum].heldPowerups;


    if (playerUsedAbility == 'none') {

        // Remove the powerup from the player's held powerups.
        const index = playerHeldPowerups.indexOf(selectedPowerup);
        if (index > -1) {
            console.log(`deleting ${JSON.stringify(playerHeldPowerups[index])}`)
            playerHeldPowerups.splice(index, 1); // This is currently removing duplicates of the selected powerup, we don't want to do this.
        }


        if (selectedPowerup == 'Restore Health'){
            console.log(`Current playerHP: ${state.playerList[currentPlayerNum].playerHP}`);
            let newPlayerHP = state.playerList[currentPlayerNum].playerHP;
            if (newPlayerHP != state.playerList[currentPlayerNum].maxHP) {
                newPlayerHP += 1;

                affectedPlayerList[currentPlayerNum] = {
                    ...affectedPlayerList[currentPlayerNum],
                    playerHP: newPlayerHP,
                    usedPowerup: 'none',
                    heldPowerups: playerHeldPowerups
                };
            }
            // else the player's hp is at max
        }
        else{
            // Select the current player in array, update their information.
            affectedPlayerList[currentPlayerNum] = {
                ...affectedPlayerList[currentPlayerNum],
                usedPowerup: selectedPowerup,
                heldPowerups: playerHeldPowerups
            };
        }

        let newState = {
            ...state,
            playerList: affectedPlayerList,
        };

        console.log(newState)
        console.log('Exiting setPlayerPowerup Function');
        return newState;
    }
    console.log('You already have used a powerup this turn.');
    console.log('Exiting setPlayerPowerup Function');
    return state;
}

function usedWinMinigamePowerup(state){
    // This function removes the 'Win Minigame' powerup when selected.
    console.log(`Entering usedWinMinigamePowerup Function`);

    let currentPlayerNum = state.currentPlayerNum;
    let affectedPlayerList = state.playerList.slice();
    let currentlyHeldPowerups = state.playerList[currentPlayerNum].heldPowerups;
    let playerHeldPowerups = state.playerList[currentPlayerNum].heldPowerups;
    let newPlayerScore = affectedPlayerList[currentPlayerNum].playerScore;

    const index = playerHeldPowerups.indexOf('Win Minigame');
        if (index > -1) {
            console.log(`deleting ${JSON.stringify(playerHeldPowerups[index])}`)
            playerHeldPowerups.splice(index, 1); // This is currently removing duplicates of the selected powerup, we don't want to do this.
        }

        newPlayerScore += 100;
        // Select the current player in array, update their information.
        affectedPlayerList[currentPlayerNum] = {
            ...affectedPlayerList[currentPlayerNum],
            heldPowerups: playerHeldPowerups,
            playerScore: newPlayerScore,
            usedPowerup: 'none'
        };

        let newState = {
            ...state,
            playerList: affectedPlayerList,
        };

        console.log(newState)
        return newState;

    console.log('Exiting usedWinMinigamePowerup Function');
}


function reducers(state, action) {
    if( state === undefined )
        return state;

    // console.log(`in reducers. action.type is: ${action.type}, board contains: ${JSON.stringify(state)}`);

    if( action.type === 'INITIALIZE' || action.type === 'RESET') {
        return createInitialState();
    }

    if(action.type === 'DECREMENT_HEALTH'){
        return decreasePlayerHealth(state);
    }

    if(action.type === 'HEAL_SELF'){
        return increasePlayerHealth(state);
    }

    if(action.type === 'INCREASE_SCORE'){
        findRandomPowerup(state);
        return increasePlayerScore(state);
    }

    if(action.type === 'PLUNDER'){
        return awardPlayerPowerup(state);
    }

    if(action.type === 'SET_POWERUP'){
        return setPlayerPowerup(state, action.selectedPowerup);
    }

    if(action.type === 'WIN_MINIGAME'){
        return usedWinMinigamePowerup(state);
    }

    if(action.type === 'START_GAME'){
        return startBoardGame(state, action.playerNameArray);
    }

    else if( action.type === 'ROLL_DIE') {
        // if( state.haveAWinner )
        //     return state;
        //
        // if(state.firstAvailableIndex[action.rollValue] < 0)  // column is full
        //     return state;
        //
        // return {
        //     ...state,
        //     ...integrateDieRoll(state, action.rollValue)
        // }
        return integrateDieRoll(state);
    }

    // return state;

}

export {reducers, createInitialState};