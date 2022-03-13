import {Fragment, useReducer} from 'react';
import { click_on_cell_action, reset_action } from './actions';
import { NUM_COLUMNS, NUM_ROWS } from './constants';
import { reducers } from './reducers';
import { createInitialState } from './reducers';


function Cell(props) {

    return (
        <td onClick={() => props.dispatch(click_on_cell_action(props.colIdx))} width="50px" height="50px"
            style={{backgroundColor: props.cell.color}}>
        </td>
    );
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
        const playerColor = props.nextColor.charAt(0).toUpperCase() + props.nextColor.slice(1);
        return <div style={{height: "50px", textAlign: "center"}}><p top-margin="100px">{playerColor} plays
            next</p></div>;
    }

    const winnerColor = props.winnerColor.charAt(0).toUpperCase() + props.winnerColor.slice(1);
    return <div style={{height: "50px", align: "center"}}>
        <p align="center">{winnerColor} Wins. Game Over.<br />
            <button align="center" onClick={() => props.dispatch(reset_action())}>Reset?</button></p>
    </div>
};

function RollDice(props) {
    var rollValue = Math.floor((Math.random() * NUM_COLUMNS));
    return <div style={{height: "50px", align: "center"}}>
        <p align="center">
            <button align="center" onClick={() => props.dispatch(click_on_cell_action(rollValue))}>Roll Dice</button>
        </p>
    </div>
    
}


export default function Board(props) {

    const [state, dispatch] = useReducer(reducers, undefined, createInitialState);

    // console.log(`initial state is: ${JSON.stringify(state)}`);
    return (
        <Fragment>
            <TopMessage nextColor={state.nextColor}
                        winnerColor={state.winnerColor}
                        haveAWinner={state.haveAWinner}
                        dispatch={dispatch} />
            <RollDice   nextColor={state.nextColor}
                        winnerColor={state.winnerColor}
                        haveAWinner={state.haveAWinner}
                        dispatch={dispatch} />
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
        </Fragment>
    );
}


