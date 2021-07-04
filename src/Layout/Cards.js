import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import classNames from "../utils/class-names/index.js";

function Cards({ deck }) {
  const cards = deck.cards;

  const [currentCard, setCurrentCard] = useState(cards[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flip, setFlip] = useState(true);
  const history = useHistory();

  if (cards.length <= 2) {
    return (
      <div>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are 2 cards in this deck.
        </p>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
      </div>
    );
  }

  function NextCard() {
    if (currentIndex < cards.length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentCard(cards[nextIndex]);
      console.log(currentCard);
      setFlip(true);
    }

    if (currentIndex === cards.length) {
      if (
        window.confirm(
          "Restart cards? Click cancel to return to the home page."
        )
      ) {
        setCurrentIndex(0);
        setCurrentCard(cards[0]);
        setFlip(true);
      } else {
        history.push("/");
      }
    }
    console.log("currentIndex is ", currentIndex);
  }

  if (currentCard && Object.keys(currentCard).length > 0) {
    return (
      <div key={currentCard.id} className="card-data">
        <h6 className="card-subtitle">{`Card ${currentCard.id} of ${cards.length}`}</h6>
        <div className="card-text">
          {flip ? <p> {currentCard.front}</p> : <p>{currentCard.back}</p>}
        </div>
        <button
          type="button"
          className="btn btn-secondary mr-4"
          onClick={() => setFlip(!flip)}
        >
          Flip
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => NextCard()}
        >
          <span
            className={classNames({
              oi: true,
              ".d-none": flip,
              "oi-arrow-thick-right": !flip,
            })}
          />
          Next
        </button>
      </div>
    );
  }
  return null;
}
export default Cards;
