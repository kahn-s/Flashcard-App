import React, { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { useParams, Link, withRouter } from "react-router-dom";

import { readDeck } from "../utils/api/index.js";

//Get a single deck

function ViewDeck({ decks, deck, setDeck, handleDelete, error, setError }) {
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    deckId &&
      readDeck(deckId, abortController.signal)
        .then((deck) => {
          return setDeck(deck);
        })
        .catch((error) => setError(error));

    return () => abortController.abort();
  }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  console.log(deck.name);
  deck.cards ? console.log("this deck = ", deck) : console.log("no deck");

  return (
    <section>
      <nav aria-label="breadcrumb">
        {" "}
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <p>{deck.name}</p>
          </li>
        </ol>
      </nav>
      <div key={deckId} className="card">
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <p className="card-text">{deck.description}</p>
          <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary">
            Edit
          </Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
            Study
          </Link>
          <Link to={`/decks/${deck.id}/addCards`} className="btn btn-primary">
            Add Cards
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete({ deck })}
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}
export default withRouter(ViewDeck);
