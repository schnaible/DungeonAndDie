import Trivia from '../Components/Trivia/Trivias';
import HighScore from '../Components/HighScorePage/HighScores'
import Game from '../Components/Board/src/GameBoard'
import Breakout from '../Components/Breakout/Breakoutv2Page'
import DragonFlight from "../Components/Dragon Flight/DragonFlight";
import MemoryMatch from "../Components/MemoryMatch/App";
import OddOneOut from "../Components/OddOneOut/OddOneOutPage"
import RepeatPattern from "../Components/RepeatPattern/src/App"
import HowToPlay from "../Components/HowToPlay/HowToPlay";
import Menu from "./Menu"
import About from "../Components/Lore/About";
import Lore from "../Components/Lore/Lore";
import Credits from "../Components/Lore/Credits"

const presentationComponents = (props) => {

    return[
        {
            title: 'Play Now',
            component: <Game />
        },
        {
            title: 'High Score',
            component: <HighScore/>
        },
        // {
        //     title: 'Trivia',
        //     component: <Trivia/>
        // },
        // {
        //     title: 'Breakout',
        //     component: <Breakout/>
        // },
        //  {
        //      title: 'Dragon Flight',
        //      component: <DragonFlight/>
        //  },
        // {
        //     title: 'Memory Match',
        //     component: <MemoryMatch/>
        // },
        // {
        //     title: 'Odd One Out',
        //     component: <OddOneOut/>
        // },
        // {
        //     title: 'Repeat Pattern',
        //     component: <RepeatPattern/>
        // },
        {
            title: 'How To Play',
            component: <HowToPlay/>
        },
        {
            title: 'Lore',
            component: <Lore/>
        },
        {
            title: 'About',
            component: <About />
        },
        {
            title: 'Credits',
            component: <Credits />
        }

    ];
};


const containerComponents = (props) => {
    return [
        {
            title: 'Main Menu',
            component: <Menu />
        },

    ];
};

export {presentationComponents, containerComponents};
