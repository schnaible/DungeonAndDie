import React from "react";
import classnames from "classnames";
import chest from "./Textures/chest.png";
import "./card.scss";

const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
    const handleClick = () => {
        !isFlipped && !isDisabled && onClick(index);
    };

    return (
        <div
            className={classnames("card", {
                "is-flipped": isFlipped,
                "is-inactive": isInactive
            })}
            onClick={handleClick}
        >
            <div className="card-face card-font-face">
                <img src={chest} alt="chest" />
            </div>
            <div className="card-face card-back-face">
                <img src={card.image} alt="flipped" />
            </div>
        </div>
    );
};

export default Card;