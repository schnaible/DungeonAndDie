import React from 'react';
import image from './flightObstacle3.png'
//import { View } from 'react-native';

const Obstacles = ({
    color,
    obstacleWidth, 
    obstacleHeight, 
    randomBottom, 
    gap, 
    obstaclesLeft}) => {

    return (
        <div>

            <div style={{
    position: 'absolute',
    width: obstacleWidth,
    height: 380,
    left: obstaclesLeft,
    bottom: randomBottom + obstacleHeight + gap,
}}>
                <img src={image}  alt={"This is a pillar"}/>
            </div>
            <div style={{
    position: 'absolute',
    width: obstacleWidth,
    height: obstacleHeight,
    left: obstaclesLeft,
    bottom: randomBottom,
}}>
                <img src={image}  alt={"This is a pillar"}/>
            </div>
            <div style={{
                position: 'absolute',
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom,
            }}>
                <img src={image}  alt={"This is a pillar"}/>
            </div>
            <div style={{
                position: 'absolute',
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom,
            }}>
                <img src={image}  alt={"This is a pillar"}/>
            </div>
            <div style={{
                position: 'absolute',
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom,
            }}>
                <img src={image}  alt={"This is a pillar"}/>
            </div>
            <div style={{
                position: 'absolute',
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom,
            }}>
                <img src={image}  alt={"This is a pillar"}/>
            </div>
        </div>
    )
}

export default Obstacles
