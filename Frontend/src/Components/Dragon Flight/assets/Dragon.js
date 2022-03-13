import React from 'react';
//import { View } from 'react-native';
import image from './dragonSprite.png'

const Dragon = ({dragonBottom, dragonLeft}) => {
    const dragonWidth = 112
    const dragonHeight = 62

    return (
        <div style={{
    position: 'absolute',
    //imag: image,

    //backgroundColor: 'red',//dragon can be red
    width: dragonWidth,
    height: dragonHeight,
    left: dragonLeft - (dragonWidth / 2),
    bottom: dragonBottom - (dragonHeight / 2),
}}>
            <img src={image}  alt={"DRAGON!!!"}/>
        </div>
    )
}

export default Dragon
