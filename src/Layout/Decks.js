import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import { listDecks } from "../utils/api/index.js";
import { handleDelete } from "../utils/decks/index.js";

function Decks() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);
  const abortController = new AbortController();
  const { path } = useRouteMatch();
  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal)
      .then((decks) => {
        return setDecks(decks);
      })
      .catch((error) => setError(error));

    return () => abortController.abort();
  }, []);
  useEffect(() => {
    console.log(`decks is rendered ${decks}`);
  }, [decks]);

  function renderDecks() {
    if (decks.length > 0) {
      const allDecks = decks.map((deck) => {
        return (
          <div key={deck.id} className="card">
            <div className="card-body" key={deck.id}>
              <Link to="/decks/new" className="btn btn-secondary">
                Create Deck
              </Link>
              <h5 className="card-title">{deck.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {deck.cards.length} cards
              </h6>
              <p className="card-text">{deck.description}</p>
              <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
                View
              </Link>
              <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
                Study
              </Link>
              <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary">
                Edit
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete({ deck }, { setDecks }, { decks })}
              >
                Delete
              </button>
            </div>
          </div>
        );
      });

      return allDecks;
    } else {
      return null;
    }
  }

  return <section className="row">{renderDecks()}</section>;
}
export default Decks;
