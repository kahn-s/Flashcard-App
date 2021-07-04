import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";
import Cards from "./Cards";

// TODos  Routes to Edit Card, Add Card

function Study({ decks, setDecks, deck, setDeck, error, setError }) {
  let { deckId } = useParams();
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((_deck) => {
        return setDeck(_deck);
      })
      .catch((error) => {
        setError(error);
      });

    return () => abortController.abort();
  }, []);

  if (deck && Object.keys(deck).length > 0) {
    return (
      <section>
        <nav aria-label="breadcrumb">
          {" "}
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/decks/${deck.id}`}>{deck.name}</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <div>
          <h2>Study: {deck.name}</h2>
        </div>
        <div>
          <Cards deck={deck} setDeck={setDeck} />
        </div>
      </section>
    );
  } else {
    console.log("we got no deck??", deck);
    return <div>loading!</div>;
  }
}

export default Study;
