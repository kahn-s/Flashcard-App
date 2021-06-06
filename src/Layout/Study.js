import React, { useEffect, useState } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";
import { listDecks } from "../utils/api/index.js";
import ErrorMessage from "./ErrorMessage";
import Cards from "./Cards";

// TODos  Routes to Edit Card, Add Card

export const Study = () => {
  const [deck, setDeck] = useState([]);
  const [error, setError] = useState(undefined);

  const deckId = useParams();
  const sampleCard = {
    id: 1,
    front: "Differentiate between Real DOM and Virtual DOM.",
    back: "Virtual DOM updates are faster but do not directly update the HTML",
    deckId: 1,
  };
  console.log(deckId);
  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal)
      .then((value) => {
        setDeck(value.filter((deck) => deck.id === deckId));
      })
      .catch(setError);

    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  deck.map((card) => {
    return (
      <>
        <Cards card={card} key={card.id} className="card" />;
        <div className="card-body" key={card.id}>
          <h5 className="card-title">{`Card ${card.id} of ${deck.length}`}</h5>
          <p className="card-text">{card}</p>

          <button type="button" className="btn btn-primary">
            Flip
          </button>
        </div>
      </>
    );
  });

  return (
    <section>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}`}>deck.title</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <div>
        <h1>Study</h1>
      </div>

      <div>
        <Cards />
      </div>
    </section>
  );
};
export default Study;
