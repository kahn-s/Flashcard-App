import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { listDecks } from "../utils/api/index.js";
import ErrorMessage from "./ErrorMessage";
import Decks from "./Decks";

export const DecksList = () => {
  const [decks, setDecks] = useState({});
  const [error, setError] = useState(undefined);

  // useEffect(() => {
  //   const abortController = new AbortController();

  //   listDecks(abortController.signal)
  //     .then((decks) => setDecks(decks))
  //     .catch((error) => setError(error));

  //   return () => abortController.abort();
  // }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  function handleDelete({ deck }) {
    const toRemove = deck.id;
    if (window.confirm("Delete this deck? You won't be able to recover it.")) {
      const newDecks = decks.filter((deck) => deck.id !== toRemove);
      setDecks(newDecks);
    }
  }

  const list = decks.map((deck) => {
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
            onClick={() => handleDelete({ deck })}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <main className="container">
      <Switch>
        <Route exact path="/">
          <section className="row">{list}</section>
        </Route>
        <Route path="/decks">
          <Decks decks={decks} error={error} setError={setError} />
        </Route>
      </Switch>
    </main>
  );
};

export default DecksList;
