import React from 'react';
export default function howToPlay(){
    return(
        <div align="center"  style={{
            backgroundColor: "lightgoldenrodyellow",
            height: 350,
            width: 900,
        }}
        >
            <h1 align="center" style={{
                fontStyle: "oblique",
                fontFamily: "serif",

            }}>How To Play</h1>
            <div style={{
                fontStyle: "oblique",
                fontFamily: "serif"
            }}>- Your player information is on the left of the board!</div>
            <div style={{
                fontStyle: "oblique",
                fontFamily: "serif"
            }}>- Hit "Play Minigame" to progress in the game. </div>
            <div style={{
                fontStyle: "oblique",
                fontFamily: "serif"
            }}> - If you lose, you lose 1 health</div>
            <div style={{
                fontStyle: "oblique",
                fontFamily: "serif"
            }}>- If you lose all your health you die and respawn at start</div>
            <div style={{
                fontStyle: "oblique",
                fontFamily: "serif"
            }}>- If you win, you might get a power-up!</div>
            <div style={{
                fontStyle: "oblique",
                fontFamily: "serif"
            }}>- If you reach the end of the board you win!</div>
            <div style={{
                fontStyle: "oblique",
                fontFamily: "serif"
            }}>- During each turn you can use any power-ups or class abilities you have!</div>
            <div style={{
                fontStyle: "oblique",
                fontFamily: "serif"
            }}>- The game ends if all but 1 player makes it to the finish line!</div>
            <div style={{
                fontStyle: "oblique",
                fontFamily: "serif"
            }}>- Your score will be stored in the High Score Table once the game ends.</div>
        </div>
    )
}