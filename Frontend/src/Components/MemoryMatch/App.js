import { useEffect, useState, useRef , Fragment } from "react";
import Box from '@mui/material/Box';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
    DialogTitle
} from "@material-ui/core";
import Card from "./card";
import "./app.scss";

const uniqueCards = [
    {
        type: "Amethyst",
        image: 'https://blue.cs.sonoma.edu/~kschnaible/flippedCard4.png'
    },
    {
        type: "Bag",
        image: 'https://blue.cs.sonoma.edu/~kschnaible/flippedCard2.png'
    },
    {
        type: "Gold",
        image: 'https://blue.cs.sonoma.edu/~kschnaible/flippedCard1.png'
    },
    {
        type: "Key",
        image: 'https://blue.cs.sonoma.edu/~kschnaible/flippedCard5.png'
    },
    {
        type: "Knapsack",
        image: 'https://blue.cs.sonoma.edu/~kschnaible/flippedCard6.png'
    },
    {
        type: "Sapphire",
        image: 'https://blue.cs.sonoma.edu/~kschnaible/flippedCard3.png'
    }
];

// Shuffle the deck here.
function shuffleCards(array) {
    const length = array.length;

    // Traverse the board, setting a random card on each spot.
    for (let i = length; i > 0; i--) {
        const randIdx = Math.floor(Math.random() * i);
        const currIdx = i - 1;
        const temp = array[currIdx];
        array[currIdx] = array[randIdx];
        array[randIdx] = temp;
    }
    console.log(`Array of cards: ${JSON.stringify(array)}`);
    return array;
}

// Driver function
export default function App({childToParent}) {
    // Create useState for the cards.
    const [cards, setCards] = useState(() =>
        shuffleCards(uniqueCards.concat(uniqueCards))
    );

    // Variables for cards, moves and score
    const [openCards, setOpenCards] = useState([]);
    const [clearedCards, setClearedCards] = useState({});
    const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
    const [moves, setMoves] = useState(9-Math.floor((Math.random() * 6)+1));
    const [showModal, setShowModal] = useState(false);
    const [bestScore, setBestScore] = useState(JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
    );
    const timeout = useRef(null);

    const disable = () => {
        setShouldDisableAllCards(true);
    };
    const enable = () => {
        setShouldDisableAllCards(false);
    };

    // Check if we completed the board.
    const checkCompletion = () => {
        if (Object.keys(clearedCards).length === uniqueCards.length) {
            setShowModal(true);

            // Set the high score.
            const highScore = Math.min(moves, bestScore);
            setBestScore(highScore);
            localStorage.setItem("bestScore", highScore);
            childToParent('You passed the Minigame!');
        }
    };

    // Evaluate what cards we just flipped.
    const evaluate = () => {
        const [first, second] = openCards;
        enable();

        // Check if cards match.
        if (cards[first].type === cards[second].type) {
            setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
            setOpenCards([]);
            return;
        }

        // Else: Flip cards back after 500ms.
        timeout.current = setTimeout(() => {
            setOpenCards([]);
        }, 500);

        setMoves((moves) => moves - 1);
        if (moves < 2)
            childToParent('You failed the Minigame!');
    };

    // Handle clicking on a card
    const handleCardClick = (index) => {
        // Leave 1 card flipped.
        if (openCards.length === 1) {
            setOpenCards((prev) => [...prev, index]);
            // setMoves((moves) => moves - 1);
            // if (moves === 0)
            //     childToParent('You failed the Minigame!');
            disable();
        }
        else {
            clearTimeout(timeout.current);
            setOpenCards([index]);
        }
    };

    useEffect(() => {
        let timeout = null;
        if (openCards.length === 2) { // Check both cards.
            timeout = setTimeout(evaluate, 300);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [openCards]);

    useEffect(() => {
        checkCompletion();
    }, [clearedCards]);

    // Check if a card is flipped.
    const checkIsFlipped = (index) => {
        return openCards.includes(index);
    };

    // Check if a card is inactive.
    const checkIsInactive = (card) => {
        return Boolean(clearedCards[card.type]);
    };

    return (
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
        <div className="App">
            {/*<header>*/}
            {/*    <h3>Treasure Hunter</h3>*/}
            {/*    <div>*/}
            {/*        Open a chest and match 2 treasures with each other!*/}
            {/*    </div>*/}
            {/*</header>*/}
            <div className="container">
                {cards.map((card, index) => {
                    return (
                        <Card
                            key={index}
                            card={card}
                            index={index}
                            isDisabled={shouldDisableAllCards}
                            isInactive={checkIsInactive(card)}
                            isFlipped={checkIsFlipped(index)}
                            onClick={handleCardClick}
                        />
                    );
                })}
            </div>
            <footer>
                <div className="score">
                    <div className="moves">
                        <span className="bold">Moves:</span> {moves}
                    </div>
                    {localStorage.getItem("bestScore") && (
                        <div className="high-score">
                            <span className="bold">Best Score:</span> {bestScore}
                        </div>
                    )}
                </div>
            </footer>
            {/*<Dialog*/}
            {/*    open={showModal}*/}
            {/*    disableBackdropClick*/}
            {/*    disableEscapeKeyDown*/}
            {/*    aria-labelledby="alert-dialog-title"*/}
            {/*    aria-labelledby="alert-dialog-description"*/}
            {/*>*/}
            {/*    <DialogTitle id="alert-dialog-title">*/}
            {/*        Congratulations! Enjoy the treasure!*/}
            {/*    </DialogTitle>*/}
            {/*    <DialogContent>*/}
            {/*        <DialogContentText id="alert-dialog-description">*/}
            {/*            Completed in {moves} moves. Best score: {" "} {bestScore} moves*/}
            {/*        </DialogContentText>*/}
            {/*    </DialogContent>*/}
            {/*</Dialog>*/}
        </div>
        </Box>
    );
}