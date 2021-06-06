import React, { useState } from "react";

export default function Cards({ deck }) {
  const [flip, setFlip] = useState(false);
  const card = deck.map((card) => (
    <div className="card">
      <div className="card-body">
        <h6 className="card-subtitle">{`Card ${card.id} of {deck.length}`}</h6>
        <div classname="front">
          <p className="card-text">{card.front}</p>
        </div>
        <div classname="back">
          <p className="card-text">{card.back}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <section>
      <div
        className={`card $flip ? "flip" : ""} `}
        onClick={() => setFlip(!flip)}
      >
        {flip ? card.back : card.front}
      </div>
      <div className="question">{card.front}</div>
      <div className="answer">{card.back}</div>
    </section>
  );
}
