import React, { useEffect, useState } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";
import { listDecks } from "../utils/api/index.js";
import ErrorMessage from "./ErrorMessage";
import Cards from "./Cards";

// TODos  Routes to Edit Card, Add Card

function Study() {
  const [deck, setDeck] = useState([]);
  const [error, setError] = useState(undefined);

  const deckId = useParams();

  console.log(deckId);

  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal).then(setDeck).catch(setError);

    return () => abortController.abort();
  }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }

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
        <Cards deck={deck} />
      </div>
    </section>
  );
}

export default Study;
