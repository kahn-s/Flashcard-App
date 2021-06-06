import React, { useState } from "react";

export default function Cards({ card }) {
  const [flip, setFlip] = useState(false);

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
