import React, { useState, useEffect } from "react";
import { classNames } from "../utils/class-names";

export default function Cards({ sampleDeck, sampleCards }) {
  const [flip, setFlip] = useState(false);
  const [currentCard, setCurrentCard] = useState(sampleCards[0]);

  const length = sampleCards.length;
  console.log(sampleCards, length);
  function NextCard() {
    console.log("deck =", sampleDeck);
    console.log("Cards = ", sampleCards);
    console.log(currentCard);
    let next = {};
    //useEffect(() => {
    // const abortController = new AbortController();
    if (currentCard.id < length - 1) {
      console.log("length of Cards array = ", length);
      next = sampleCards.filter((card) => card.id === { currentCard }.id + 1);

      console.log(next);
      setCurrentCard(next);
      console.log("new currentCard is ", currentCard);
    }
    if (currentCard.id === length) {
      next = sampleCards.filter((card) => card.id === 1);
      setCurrentCard(1);
      console.log("repeat: currentCard is ", currentCard);
    }
    //return () => abortController.abort();
    //}, []);
  }

  function DisplayCurrentCard() {
    useEffect(() => {
      const abortController = new AbortController();
      sampleCards.map((card) => {
    return (
      <div className="card">
        <div className="card-body">
          <h6 className="card-subtitle">{`Card ${currentCard.id} of ${length}`}</h6>
          <div className="front">
            <p className="card-text">{currentCard.front}</p>
          </div>
          <div className="back">
            <p className="card-text">{currentCard.back}</p>
          </div>
          <button type="button" className="btn btn-secondary">
            Flip
          </button>
          <button type="button" className="btn btn-primary" onClick={NextCard}>
            Next
          </button>
        </div>
      </div>
    );
    return () => abortController.abort();
    }, []);
  }
}
  return (
    <div>
      <DisplayCurrentCard />
    </div>
  );
}
