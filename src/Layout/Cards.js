import React, { useState, useEffect } from "react";

export default function Cards({ deck }) {
  const [flip, setFlip] = useState(true);
  const [currentCard, setCurrentCard] = useState(null);
  const cards = [];
  cards.push(...deck.cards);

  useEffect(() => {
    setCurrentCard(cards[0]);
  }, []);

  const NextCard = () => {
    console.log("currentCard index =", cards.indexOf(currentCard));
    let currentIndex = cards.indexOf(currentCard);
    currentIndex < cards.length ? currentIndex++ : (currentIndex = 0);
    setCurrentCard(cards[currentIndex]);
  };

  // console.log(cards);
  // const list =
  // cards &&
  // cards.map((card) => {
  function showCard() {
    console.log(currentCard);
    if (currentCard) {
      return (
        <div key={currentCard.id} className="card-data">
          <h6 className="card-subtitle">{`Card ${currentCard.id} of ${deck.cards.length}`}</h6>
          <div className="card-text">
            {flip ? <p> {currentCard.front}</p> : <p>{currentCard.back}</p>}
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
    }
  }
  return <div>{showCard()}</div>;
}
