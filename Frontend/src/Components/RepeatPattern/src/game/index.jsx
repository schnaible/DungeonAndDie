import React, { memo, useReducer, useMemo, useEffect } from 'react';
import levels from '../config/levels';
import { Field } from './components/GameField';
import { GameFieldView, GameView, SwitchView } from './components/Styled';
import {
    GameReducer, initialState, NEW_LEVEL,
    FIELD_HIDE, FIELD_SHOW, RESET_LEVEL,
} from './game.reducer';
import { generateGameField } from './game.utils';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import styled from 'styled-components';

const Button = styled.button`
    background: ${props => props.primary ? "#f44336" : "white"};
    color: ${props => props.primary ? "white" : "#f44336"};
    font-size: 1em;
    margin: 2em;
    padding: 0.5em 1.5em;
    border: 2px solid #dfdfdf;
    border-radius: 3px;
`;

function Game({ toggleTheme }, {toggleGame}) {
    let [{ level, showHidden, showField, levelConfig }, dispatch] = useReducer(
        GameReducer, initialState
    );

    // const levelConfig = levels[level];
    const levelNum = levels.length;
    const { cellCount, memoryCount } = level < levelNum ? levelConfig : { cellCount: 0, memoryCount: 0 };

    const { field, hiddenCells } = useMemo(
        () => generateGameField(cellCount, memoryCount),
        // eslint-disable-next-line
        [levelConfig]
    );

    const fieldShow = () => {
        setTimeout(dispatch, 500, { type: FIELD_SHOW });
    };

    useEffect(
        () => fieldShow(),
        [levelConfig],
    );

    function updateLevel(shouldReset) {
        dispatch({ type: FIELD_HIDE });
        setTimeout(dispatch, 500, { type: shouldReset ? RESET_LEVEL : toggleGame('You passed the Minigame!'), level: level + 1 });
    }

    function restart() {
        window.location.reload();
    }

    return (
        <GameView>
            <GameFieldView {...levelConfig}>
                <SwitchView>
                    <div>Level: {level}</div>
                    <div>
                        Theme mode: <Switch onClick={toggleTheme} />
                    </div>
                </SwitchView>
                {level < levelNum &&
                    <Field
                        {...levelConfig}
                        levelConfig={levelConfig}
                        visible={showField}
                        key={field}
                        level={level}
                        field={field}
                        hiddenCells={hiddenCells}
                        dispatch={dispatch}
                        showHidden={showHidden}
                        updateLevel={updateLevel}
                    />
                }
                {level === levelNum &&
                    <div>
                        <Button primary onClick={() => restart()}>You win, congrats. Restart</Button>
                    </div>
                }
            </GameFieldView>
        </GameView>
    );
}

export default memo(Game);