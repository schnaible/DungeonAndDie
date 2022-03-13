import {Fragment, useReducer, useState} from 'react';
import {
    click_on_cell_action, roll_die_action, reset_action, decrement_health_action,
    increase_score_action, heal_self_action, award_powerup_action, set_used_powerup_action,
    win_minigame_action, start_game_action} from './actions';
import { NUM_COLUMNS, NUM_ROWS } from './constants';
import { reducers } from './reducers';
import { createInitialState } from './reducers';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import HighScores from "../../HighScorePage/AddingHighScore";

import Breakout from "../../Breakout/Breakoutv2Page";
import Trivia from "../../Trivia/Trivias";
import DragonFlight from "../../Dragon Flight/DragonFlight"
import MemoryMatch from "../../MemoryMatch/App";
import OddOneOut from "../../OddOneOut/OddOneOutPage"
import TargetPractice from "../../TargetPractice/TargetPracticetPage"
// import RepeatPattern from "../../RepeatPattern/src/App"
// import HotPursuit from "../../HotPursuit/HotPursuit";

const MinigameArray = [Trivia, MemoryMatch, Breakout, OddOneOut, DragonFlight, TargetPractice];

function getImage(img){
    // console.log(`printing our image: ${img}`);
    return img;
}

function Cell(props) {

    const CellStyle = {
        backgroundColor: props.cell.color,
        display: 'inline-block'
    };

    if (getImage(props.cell.image) != ''){
        return (
            <td width="64px" height="64px"
                style={CellStyle}>
                <img src={getImage(props.cell.image)} width={64} height={64}/>
            </td>
        );
    }

    else{
        return (
            <td width="50px" height="50px"
                style={{backgroundColor: props.cell.color}}>
            </td>
        );
    }


}

function Row(props) {
    return (
        <tr>{ props.row.map( (cell, idx) => <Cell key={uniqueKey()}
                                                  cell={cell}
                                                  rowIdx={props.rowIdx}
                                                  colIdx={idx}
                                                  dispatch={props.dispatch}
        />)
        }
        </tr>
    )
}

let key = 1;
function uniqueKey() {
    return key++;
}


function TopMessage(props) {

    if( ! props.haveAWinner) {
        return <div style={{height: "50px", textAlign: "center"}}>
        </div>;
    }

    //const winnerColor = props.winnerColor.charAt(0).toUpperCase() + props.winnerColor.slice(1);
    return <div style={{height: "50px", align: "center"}}>
        <p align="center">
            <button align="center" onClick={() => props.dispatch(reset_action())}>Reset?</button></p>
    </div>
};

let selectedMinigame = 0;

function MinigameModal(props) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [played, setPlayed] = useState(false);
    const [isPlayingMinigame, setIsPlayingMinigame] = useState(false);
    const [data, setData] = useState('');
    const childToParent = (childdata) => {
        closeMinigameModal();
        if (props.usedPowerup == 'Win Minigame'){
            childdata = 'You passed the Minigame!';
            props.dispatch(win_minigame_action());
        }
        else if (childdata === 'You failed the Minigame!')
            props.dispatch(decrement_health_action());
        else if (childdata === 'You passed the Minigame!')
            props.dispatch(increase_score_action());
        setData(childdata);
        console.log(`childToParent: ${childdata}`);
    }

    const handleOpen = () => {
        setOpen(true);
        if (props.usedPowerup == 'Win Minigame'){
            childToParent('You passed the Minigame!');
        }
    }

    function closeMinigameModal(){
        handleClose();
        setPlayed(true);
        setIsPlayingMinigame(false);
    }

    function RollDie(){
        RollDiceHelper(props);
        setPlayed(false);

    }

    function RollDiceHelper(props){
        props.dispatch(roll_die_action());
    }
    function randomMinigame(){
        const gameNumber = Math.floor((Math.random() * MinigameArray.length));
        // const gameNumber = 5;
        return gameNumber;
    }
    if(!isPlayingMinigame)//This ensures the value is only calculated when it is time to pick a new game
        selectedMinigame = randomMinigame();
    if (props.haveAWinner === true){
        console.log (`The game is over. submitting highscores`);
        let playersPlaying = [];
        for (let i = 0; i < props.playerList.length; i++) {
            console.log(`Checking the player ${props.playerList[i]}`)
            if (props.playerList[i].playerName != ''){
                playersPlaying.push(props.playerList[i]);
            }
        }

        console.log(`Players Playing info ${JSON.stringify(playersPlaying)}`);
        return (
            <Fragment>
                <h1>Everyone has escaped!</h1>
                <div>
                    {playersPlaying.map((item) => (
                                <HighScores
                                Username={item.playerName}
                                Class={item.playerClass}
                                Score={item.playerScore}
                                Time={"10:10:10"}
                            />
                        ))}
                </div>
            </Fragment>
        );
    }
    if (played == false && selectedMinigame==0){
        return (
            <div>
                <p>Play a Minigame Before you Move</p>
                <Button onClick={handleOpen}>Play Minigame</Button>
                <Modal
                       open={open}
                       onClose={(event, reason) => {
                               if (reason !== 'backdropClick') {
                                 // handleClose(event, reason);
                                   closeMinigameModal();
                               }
                             }
                           }
                       aria-labelledby="modal-modal-title"
                       aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Trivia
                        </Typography>
                        {isPlayingMinigame &&
                        <Trivia
                            childToParent={childToParent}
                        />
                        }
                        {!isPlayingMinigame &&
                        <Fragment>
                            <div align="center">
                                <Button onClick={() => {
                                    setIsPlayingMinigame(true)
                                }}>Play Trivia</Button>
                            </div>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 350,
                                backgroundColor: 'lightcoral',
                                bgcolor: 'background.paper',
                                border: '2px solid #000',
                                p: 4,
                            }}>
                                <h3>How To Play Trivia</h3>
                                <div>- To win you must guess the right answer!</div>
                                <div>- You only get 1 guess!</div>
                                <div>- You only have 10 seconds to guess!</div>
                                <div>- You lose if you guess wrong!</div>
                            </div>
                        </Fragment>
                        }
                    </Box>
                </Modal>
            </div>
        );
    }
    else if (played == false && selectedMinigame==1){
        return (
            <div>
                <p>Play a Minigame Before you Move</p>
                <Button onClick={handleOpen}>Play Minigame</Button>
                <Modal
                    open={open}
                    onClose={(event, reason) => {
                        if (reason !== 'backdropClick') {
                            // handleClose(event, reason);
                            closeMinigameModal();
                        }
                    }
                    }
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Treasure Hunt
                        </Typography>
                        {isPlayingMinigame &&
                        <MemoryMatch
                            childToParent={childToParent}
                        />
                        }
                        {!isPlayingMinigame &&
                        <Fragment>
                            <div align="center">
                                <Button onClick={() => {
                                    setIsPlayingMinigame(true)
                                }}>Play Treasure Hunt</Button>
                            </div>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 350,
                                backgroundColor: 'lightcoral',
                                bgcolor: 'background.paper',
                                border: '2px solid #000',
                                p: 4,
                            }}>
                                <h3>How To Play Treasure Hunt</h3>
                                <div>- To win you must match the card you click on with its pair</div>
                                <div>- You can only mess up X amount of times</div>
                                <div>- Moves is how many times you can mess up!</div>
                                <div>- You lose if moves reaches zero!</div>
                            </div>
                        </Fragment>
                        }
                    </Box>
                </Modal>
            </div>
        );
    }
    else if (played == false && selectedMinigame==2){
        return (
            <div>
                <p>Play a Minigame Before you Move</p>
                <Button onClick={handleOpen}>Play Minigame</Button>
                <Modal
                    open={open}
                    onClose={(event, reason) => {
                        if (reason !== 'backdropClick') {
                            // handleClose(event, reason);
                            closeMinigameModal();
                        }
                    }
                    }
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Breakout
                        </Typography>
                        {isPlayingMinigame &&
                        <Breakout
                            childToParent={childToParent}
                        />
                        }
                        {!isPlayingMinigame &&
                        <Fragment>
                            <div align="center">
                                <Button onClick={() => {
                                    setIsPlayingMinigame(true)
                                }}>Play Breakout</Button>
                            </div>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 350,
                                backgroundColor: 'lightcoral',
                                bgcolor: 'background.paper',
                                border: '2px solid #000',
                                p: 4,
                            }}>
                                <h3>How To Play Breakout</h3>
                                <div>- You control the pad at the bottom!</div>
                                <div>- Use arrow Keys to move left or right!</div>
                                <div>- Hit all the objects to win!</div>
                                <div>- You lose if the ball falls out of the screen!</div>
                            </div>
                        </Fragment>
                        }
                    </Box>
                </Modal>
            </div>
        );
    }
    else if (played == false && selectedMinigame==3){
        return (
            <div>
                <p>Play a Minigame Before you Move</p>
                <Button onClick={handleOpen}>Play Minigame</Button>
                <Modal
                    open={open}
                    onClose={(event, reason) => {
                        if (reason !== 'backdropClick') {
                            // handleClose(event, reason);
                            closeMinigameModal();
                        }
                    }
                    }
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Odd-One-Out
                        </Typography>
                        {isPlayingMinigame &&
                        <OddOneOut
                            childToParent={childToParent}
                        />
                        }
                        {!isPlayingMinigame &&
                        <Fragment>
                            <div align="center">
                                <Button onClick={() => {
                                    setIsPlayingMinigame(true)
                                }}>Play Odd One Out</Button>
                            </div>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 350,
                                backgroundColor: 'lightcoral',
                                bgcolor: 'background.paper',
                                border: '2px solid #000',
                                p: 4,
                            }}>
                                <h3>How To Odd One Out</h3>
                                <div>- Click on the white circle to win!</div>
                                <div>- You have a few seconds to do it!</div>
                                <div>- You can click all you want!</div>
                            </div>
                        </Fragment>
                        }
                    </Box>
                </Modal>
            </div>
        );
    }
    else if (played == false && selectedMinigame==4){
        return (
            <div>
                <p>Play a Minigame Before you Move</p>
                <Button onClick={handleOpen}>Play Minigame</Button>
                <Modal
                    open={open}
                    onClose={(event, reason) => {
                        if (reason !== 'backdropClick') {
                            // handleClose(event, reason);
                            closeMinigameModal();
                        }
                    }
                    }
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={
                        {
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 730,
                            height: 800,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }
                    }>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Dragon Flight
                        </Typography>
                        {isPlayingMinigame &&//Use this as the key to make the howToPlays for the remaining minigames.
                        <DragonFlight
                            childToParent={childToParent}
                        />
                        }
                        {!isPlayingMinigame &&
                        <Fragment>
                            <div align="center">
                                <Button onClick={() => {
                                    setIsPlayingMinigame(true)
                                }}>Play Dragon Flight</Button>
                            </div>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 350,
                                backgroundColor: 'lightcoral',
                                bgcolor: 'background.paper',
                                border: '2px solid #000',
                                p: 4,
                            }}>
                                <h3>How To Play Dragon Flight</h3>
                                <div>- Avoid Obstacles to Win!</div>
                                <div>- Hold Left Mouse Button to move up!</div>
                                <div>- Release Mouse Button to move down!</div>
                            </div>
                        </Fragment>
                        }
                    </Box>
                </Modal>
            </div>
        );
    }
    else if (played == false && selectedMinigame==5){
        return (
            <div>
                <p>Play a Minigame Before you Move</p>
                <Button onClick={handleOpen}>Play Minigame</Button>
                <Modal
                    open={open}
                    onClose={(event, reason) => {
                        if (reason !== 'backdropClick') {
                            // handleClose(event, reason);
                            closeMinigameModal();
                        }
                    }
                    }
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Goblin Slayer
                        </Typography>
                        {isPlayingMinigame &&//Use this as the key to make the howToPlays for the remaining minigames.
                        <TargetPractice
                            childToParent={childToParent}
                        />
                        }
                        {!isPlayingMinigame &&
                        <Fragment>
                            <div align="center">
                                <Button onClick={() => {
                                    setIsPlayingMinigame(true)
                                }}>Play Goblin Slayer</Button>
                            </div>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 350,
                                backgroundColor: 'lightcoral',
                                bgcolor: 'background.paper',
                                border: '2px solid #000',
                                p: 4,
                            }}>
                                <h3>How To Play Goblin Slayer</h3>
                                <div>- Kill all of the Goblins by clicking on them!</div>
                                <div>- You only have 3 seconds!</div>
                                <div>- Be careful to not click on any Frogs!</div>
                            </div>
                        </Fragment>
                        }
                    </Box>
                </Modal>
            </div>
        );
    }
    // else if (played == false && selectedMinigame==6){
    //     return (
    //         <div>
    //             <p>Play a Minigame Before you Move</p>
    //             <Button onClick={handleOpen}>Play Minigame</Button>
    //             <Modal
    //                 open={open}
    //                 onClose={closeMinigameModal}
    //                 aria-labelledby="modal-modal-title"
    //                 aria-describedby="modal-modal-description"
    //             >
    //                 <Box sx={style}>
    //                     <Typography id="modal-modal-title" variant="h6" component="h2">
    //                         Hot Pursuit
    //                     </Typography>
    //                     {isPlayingMinigame &&//Use this as the key to make the howToPlays for the remaining minigames.
    //                     <HotPursuit
    //                         childToParent={childToParent}
    //                     />
    //                     }
    //                     {!isPlayingMinigame &&
    //                     <Fragment>
    //                         <div align="center">
    //                             <Button onClick={() => {
    //                                 setIsPlayingMinigame(true)
    //                             }}>Play Hot Pursuit</Button>
    //                         </div>
    //                         <div style={{
    //                             position: 'absolute',
    //                             top: '50%',
    //                             left: '50%',
    //                             transform: 'translate(-50%, -50%)',
    //                             width: 350,
    //                             backgroundColor: 'lightcoral',
    //                             bgcolor: 'background.paper',
    //                             border: '2px solid #000',
    //                             p: 4,
    //                         }}>
    //                             <h3>How To Play Hot Pursuit</h3>
    //                             <div>- Dodge all of the fireballs</div>
    //                             <div>- Use the arrow keys to move in all directions!</div>
    //                             <div>- Make it through all of the rounds to win!</div>
    //                         </div>
    //                     </Fragment>
    //                     }
    //                 </Box>
    //             </Modal>
    //         </div>
    //     );
    // }
    // else if (played == false && selectedMinigame==7){
    //     return (
    //         <div>
    //             <p>Play a Minigame Before you Move</p>
    //             <Button onClick={handleOpen}>Play Minigame</Button>
    //             <Modal
    //                 open={open}
    //                 onClose={closeMinigameModal}
    //                 aria-labelledby="modal-modal-title"
    //                 aria-describedby="modal-modal-description"
    //             >
    //                 <Box sx={
    //                     {
    //                         position: 'absolute',
    //                         top: '50%',
    //                         left: '50%',
    //                         transform: 'translate(-50%, -50%)',
    //                         width: 600,
    //                         height: 600,
    //                         bgcolor: 'background.paper',
    //                         border: '2px solid #000',
    //                         boxShadow: 24,
    //                         p: 4,
    //                     }
    //                 }>
    //                     <Typography id="modal-modal-title" variant="h6" component="h2">
    //                         Repeat Pattern
    //                     </Typography>
    //                     {isPlayingMinigame &&//Use this as the key to make the howToPlays for the remaining minigames.
    //                     <RepeatPattern
    //                         childToParent={childToParent}
    //                     />
    //                     }
    //                     {!isPlayingMinigame &&
    //                     <Fragment>
    //                         <div align="center">
    //                             <Button onClick={() => {
    //                                 setIsPlayingMinigame(true)
    //                             }}>Play Repeat Pattern</Button>
    //                         </div>
    //                         <div style={{
    //                             position: 'absolute',
    //                             top: '50%',
    //                             left: '50%',
    //                             transform: 'translate(-50%, -50%)',
    //                             width: 350,
    //                             backgroundColor: 'lightcoral',
    //                             bgcolor: 'background.paper',
    //                             border: '2px solid #000',
    //                             p: 4,
    //                         }}>
    //                             <h3>How To Play Repeat Pattern</h3>
    //                             <div>- On start a grid will draw green squares!</div>
    //                             <div>- You have five seconds to memorize this pattern!</div>
    //                             <div>- After that, you have 10 seconds to repeat the pattern!</div>
    //                         </div>
    //                     </Fragment>
    //                     }
    //                 </Box>
    //             </Modal>
    //         </div>
    //     );
    // }
    else{
        return (
            <div>
                <p>{data}</p>
                <Button onClick={RollDie}>Roll Die</Button>
            </div>
        );
    }

}

function Hud(props) {
    const HudStyle = {
        position: 'absolute',
        top: '50%',
        left: '15%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#F5EDD6',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    function healSelf(){
        props.dispatch(heal_self_action());
    }

    function plunderPowerup(){
        props.dispatch(award_powerup_action());
    }

    function callPowerup(powerupToUse){
        console.log(`powerupToUse of held Powerups: ${powerupToUse}`);
        props.dispatch(set_used_powerup_action(powerupToUse));
    }

    if( ! props.haveAWinner) {
        // const playerPosition = props.playerPosition;
        const playerPosition = props.playerPosition;
        const playerHP = props.playerHP;
        const playerClass = props.playerClass;
        const heldPowerups = props.heldPowerups;
        const playerAbility = props.playerAbility;
        const playerScore = props.playerScore;
        const abilityCooldown = props.abilityCooldown;
        const maxHP = props.maxHP;
        const usedPowerup = props.usedPowerup;

        if (playerAbility == 'Heal'){
            return (
                <div>
                    <Box sx={HudStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <h3 top-margin="100px">{playerClass}'s Turn</h3>
                            <p top-margin="100px">Current Position: {playerPosition}</p>
                            <p top-margin="100px">Current HP: {playerHP}/{maxHP}</p>
                            {/*<p top-margin="100px">Held Powerups: {heldPowerups}</p>*/}
                            <div>
                                Held Powerups({heldPowerups.length}/3): {heldPowerups.map((item) => (
                                <button onClick={(itemIdx) => callPowerup(item)}>{item}</button>
                            ))}
                            </div>
                            <p top-margin="100px">Active Powerup: {usedPowerup}</p>
                            <p top-margin="100px">Class Ability: <Button onClick={healSelf}>Heal</Button> ({abilityCooldown})</p>
                            <p top-margin="100px">Score: {playerScore}</p>
                        </Typography>
                    </Box>
                </div>
            )
        }
        else if (playerAbility == 'Plunder'){
            return (
                <div>
                    <Box sx={HudStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <h3 top-margin="100px">{playerClass}'s Turn</h3>
                            <p top-margin="100px">Current Position: {playerPosition}</p>
                            <p top-margin="100px">Current HP: {playerHP}/{maxHP}</p>
                            {/*<p top-margin="100px">Held Powerups: {heldPowerups}</p>*/}
                            <div>
                                Held Powerups({heldPowerups.length}/3): {heldPowerups.map((item) => (
                                <button onClick={(itemIdx) => callPowerup(item)}>{item}</button>
                            ))}
                            </div>
                            <p top-margin="100px">Active Powerup: {usedPowerup}</p>
                            <p top-margin="100px">Class Ability: <Button onClick={plunderPowerup}>Plunder</Button> ({abilityCooldown})</p>
                            <p top-margin="100px">Score: {playerScore}</p>
                        </Typography>
                    </Box>
                </div>
            )
        }
        else return (
                <div>
                    <Box sx={HudStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <h3 top-margin="100px">{playerClass}'s Turn</h3>
                            <p top-margin="100px">Current Position: {playerPosition}</p>
                            <p top-margin="100px">Current HP: {playerHP}/{maxHP}</p>
                            {/*<p top-margin="100px">Held Powerups: {heldPowerups}</p>*/}
                            <div>
                                Held Powerups({heldPowerups.length}/3): {heldPowerups.map((item) => (
                                <button onClick={(itemIdx) => callPowerup(item)}>{item}</button>
                            ))}
                            </div>
                            <p top-margin="100px">Active Powerup: {usedPowerup}</p>
                            <p top-margin="100px">Class Ability: {playerAbility}</p>
                            <p top-margin="100px">Score: {playerScore}</p>
                        </Typography>
                    </Box>
                </div>
            )
    };

};

export default function Board(props) {

    const [state, dispatch] = useReducer(reducers, undefined, createInitialState);

    function callStartGame(){
        let playername1 = document.getElementById("playername1");
        let playername2 = document.getElementById("playername2");
        let playername3 = document.getElementById("playername3");
        let playername4 = document.getElementById("playername4");
        let playerNameArray = [playername1,playername2,playername3,playername4];
        for (let i = 0; i < playerNameArray.length; i++) {
            if (playerNameArray[i].value != "")
                dispatch(start_game_action(playerNameArray));
        }
        // alert("You must enter at least 1 player name");
    }

    if(state.gameStarted === false){
        return (
            <Fragment>
                <h1>Welcome to the Dungeon!</h1>
                <h3>Enter Player Names</h3>
                <p>Leave text fields empty to limit the number of players.</p>
                <p>You must have at least one player.</p>
                {/*<TextField id="player1" label="Playername" variant="standard" />*/}
                <p>Rogue: <input type="text" id="playername1" defaultValue=""/></p>
                <p>Thief: <input type="text" id="playername2" defaultValue=""/></p>
                <p>Cleric: <input type="text" id="playername3" defaultValue=""/></p>
                <p>Tank: <input type="text" id="playername4" defaultValue=""/></p>
                <p><Button onClick={callStartGame}>Start Game</Button></p>
            </Fragment>
            );
    }
    // console.log(`initial state is: ${JSON.stringify(state)}`);
    else {
        return (
            <Fragment>
                <TopMessage nextColor={state.nextColor}
                            winnerColor={state.winnerColor}
                            nextImage={state.nextImage}
                            haveAWinner={state.haveAWinner}
                            dispatch={dispatch}
                            playerPosition={state.playerList[state.currentPlayerNum].playerPosition}
                />
                {/*<RollDice   nextColor={state.nextColor}*/}
                {/*            nextImage = {state.nextImage}*/}
                {/*            winnerColor={state.winnerColor}*/}
                {/*            haveAWinner={state.haveAWinner}*/}
                {/*            dispatch={dispatch}*/}

                {/*/>*/}
                <MinigameModal
                    playerList={state.playerList}
                    playerClass={state.playerList[state.currentPlayerNum].playerClass}
                    playerScore={state.playerList[state.currentPlayerNum].playerScore}
                    usedPowerup={state.playerList[state.currentPlayerNum].usedPowerup}
                    haveAWinner={state.haveAWinner}
                    playerName={state.playerList[state.currentPlayerNum].playerName}
                    dispatch={dispatch}
                />
                <table border={1} align="center">
                    <tbody>
                    {
                        state.board.map((row, rowIdx) => (<Row key={uniqueKey()}
                                                               row={row}
                                                               rowIdx={rowIdx}
                                                               dispatch={dispatch}
                        />))
                    }
                    </tbody>
                </table>
                <Hud playerHP={state.playerList[state.currentPlayerNum].playerHP}
                     maxHP={state.playerList[state.currentPlayerNum].maxHP}
                     playerClass={state.playerList[state.currentPlayerNum].playerClass}
                     playerScore={state.playerList[state.currentPlayerNum].playerScore}
                     playerPosition={state.playerList[state.currentPlayerNum].playerPosition}
                     heldPowerups={state.playerList[state.currentPlayerNum].heldPowerups}
                     playerAbility={state.playerList[state.currentPlayerNum].playerAbility}
                     abilityCooldown={state.playerList[state.currentPlayerNum].abilityCooldown}
                     usedPowerup={state.playerList[state.currentPlayerNum].usedPowerup}
                     dispatch={dispatch}
                />
            </Fragment>
        );
    }
}
