import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index.js";
import ErrorMessage from "./ErrorMessage";

function EditCard({ deck, setDeck, card, setCard, error, setError }) {
  const { deckId } = useParams();
  const { cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    deckId &&
      readDeck(deckId, abortController.signal)
        .then((deck) => {
          return setDeck(deck);
        })
        .catch((error) => setError(error));

    return () => abortController.abort();
  }, [deckId]);

  useEffect(() => {
    const abortController = new AbortController();
    cardId &&
      readCard(cardId, abortController.signal)
        .then((card) => {
          return setCard(card);
        })
        .catch((error) => setError(error));

    return () => abortController.abort();
  }, [cardId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }
  async function handleSave() {
    const front = document.getElementById("cardFront").value;
    const back = document.getElementById("cardBack").value;
    const editedCard = {
      id: cardId,
      front: front,
      back: back,
      deckId: deckId,
    };
    updateCard(editedCard);
    history.push(`/decks/${deckId}`);
  }
  if (card && Object.keys(card).length > 0) {
    return (
      <main>
        <nav aria-label="breadcrumb">
          {" "}
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/decks/${deck.id}`}>{deck.name}</a>
            </li>
            <li className="breadcrumb-item">
              <p>Edit Card {cardId}</p>
            </li>
          </ol>
        </nav>
        <section key="editCard">
          <h2 className="card-title">{`${deck.name}: Edit Card`}</h2>
          <form key={card.id} className="form-group">
            <div className="form-group">
              <label htmlFor="cardFront">Front</label>
              <textarea
                className="form-control"
                id="cardFront"
                rows="3"
                placeholder={`${card.front}`}
              ></textarea>
              <label htmlFor="cardBack">Back</label>
              <textarea
                className="form-control"
                id="cardBack"
                rows="3"
                placeholder={`${card.back}`}
              ></textarea>
            </div>

            <button
              className="btn btn-secondary"
              type="button"
              value="Reset"
              onClick={() => history.push(`/decks/${deckId}`)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="button"
              value="Submit"
              onClick={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              Save
            </button>
          </form>
        </section>
      </main>
    );
  } else {
    return null;
  }
}
export default EditCard;
