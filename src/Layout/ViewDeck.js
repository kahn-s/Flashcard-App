import React, { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";

function ViewDeck({ handleDelete }) {
  const [deck, setDeck] = useState([]);
  const [error, setError] = useState(undefined);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((deck) => {
        return setDeck(deck);
      })
      .catch((error) => setError(error));

    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

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
            <a href={`/decks/${deck.id}`}>{deck.name}</a>
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
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}
export default ViewDeck;
