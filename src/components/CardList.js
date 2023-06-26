import React from "react";
import PropTypes from 'prop-types';
import Card from './Card.js';

const CardList = ({cards}) => {
    const getCardListJSX = (cards) => {
        return cards.map((card) => {
            return (
                <Card
                    id={card.id}
                    key={card.id}
                    message={card.message}
                    likesCount={card.likesCount}
                />
            )
        })
    }

    return (
        <div>
            <ul className='card-list'>{getCardListJSX(cards)}</ul>
        </div>
    )
}

CardList.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            likesCount: PropTypes.number.isRequired,
        })
    )
}

export default CardList;