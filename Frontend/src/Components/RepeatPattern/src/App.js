import React, { useState } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { getFromTheme } from './utils';
import './index.css';

import Game from './game';
import themes from './config/themes.json';
import {decrement_health_action, increase_score_action} from "../../Board/src/actions";

function App ({childToParent}) {
  const [themeName, toggleTheme] = useTheme('darkTheme');

  const GlobalStyle = createGlobalStyle`
    body {
        background: ${getFromTheme('body.bg')};
        color: ${getFromTheme('body.color')};
        transition: background .3s ease;
    }
  `;

  const [gameState, toggleGame] = useGame('none');

  const gameToApp = (childdata) => {
    console.log(`gameToApp: ${childdata}`);

    if (childdata === 'You failed the Minigame!')
      childToParent('You failed the Minigame!');

    else if (childdata === 'You passed the Minigame!')
      childToParent('You passed the Minigame!');

  }
  
  return (
    <ThemeProvider theme={themes[themeName]}>
      <>
        <GlobalStyle />
        <Game toggleTheme={toggleTheme}
              toggleGame={toggleGame}/>
      </>
    </ThemeProvider>
  );
}

function useTheme(defaultThemeName) {
  const [themeName, setTheme] = useState(defaultThemeName);

  function switchTheme(name) {
    setTheme(themeName === 'darkTheme' ? 'lightTheme' : 'darkTheme');
  }

  return [themeName, switchTheme];
}

function useGame(defaultGame){
  const [gameName,setGame] = useState(defaultGame);

  function switchGame(name){
    setGame(gameName === 'none' ? 'You passed the Minigame!' : 'You passed the Minigame!');
  }

  return [gameName,switchGame];
}


export default App;
