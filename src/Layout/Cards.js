import React, { useState } from "react";
import classNames from "../utils/class-names/index.js";
//@deck = array of cards from selected deck
// I need to display 1 card and toggle Flip it
export default function Cards({ deck }) {
  const [show, setShow] = useState(true);
  const [flip, setFlip] = useState(true);
  const [currentCard, setCurrentCard] = useState(null);

  // console.log(deck);
  /* if (deck) {
    setCurrentCard(deck.cards[0]);
    console.log(currentCard);
  }*/

  const NextCard = () => {
    const length = deck.cards.length;
    let index = deck.indexOf({ currentCard });
    if (index < length - 1) {
      index++;
    }
    if (index === length - 1) {
      index = 0;
    }
    setCurrentCard(deck[index]);
  };

  console.log(deck);
  const cards = deck.cards;
  console.log(cards);
  const list =
    cards &&
    cards.map((card) => {
      return (
        <div key={card.id} className="card-data">
          <div
            className={classNames("card-body", {
              show: currentCard,
              hide: !currentCard,
            })}
          />
          <h6 className="card-subtitle">{`Card ${card.id} of ${deck.cards.length}`}</h6>
          <div className="card-text">
            {flip ? <p> {card.front}</p> : <p>{card.back}</p>}
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setFlip(!flip)}
          >
            Flip
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => NextCard()}
          >
            Next
          </button>
        </div>
      );
    });

  return <div>{list}</div>;
}
