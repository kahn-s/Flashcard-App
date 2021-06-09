import React, { useEffect, useState } from "react";
import { useParams, useRef } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";
import ErrorMessage from "./ErrorMessage";
import Cards from "./Cards";

// TODos  Routes to Edit Card, Add Card

function Study() {
  const [deck, setDeck] = useState([]);
  const [error, setError] = useState(undefined);
  const { deckId } = useParams();
  const [currentDeckId, setCurrentDeckId] = useState(null);
  setCurrentDeckId(deckId);

  /*useEffect(() => {
    const abortController = new AbortController();

    currentDeckId &&
      readDeck(currentDeckId, abortController.signal)
        .then((deck) => setDeck(deck))

        .catch((error) => setError(error));

    console.log("deck= ", deck);

    return () => abortController.abort();
  }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }*/

  return (
    <section>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}`}>${deck.title}</a>
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
        <Cards deck={deck} />
      </div>
    </section>
  );
}

export default Study;
