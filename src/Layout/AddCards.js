import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard } from "../utils/api/index.js";

function AddCards({ deck, setCards }) {
  const history = useHistory();
  const { deckId } = useParams();
  console.log("deckId = ", deckId);
  console.log("number of deck = ", deckId);

  async function handleSave() {
    const front = document.getElementById("cardFront").value;
    const back = document.getElementById("cardBack").value;
    const card = {
      front: front,
      back: back,
      deckId: Number(deckId),
    };
    const respNewCard = await createCard(deckId, card);
    setCards(respNewCard);
    history.push(`/decks/${deckId}`);
  }
  if (deck && Object.keys(deck).length > 0) {
    return (
      <main>
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
        <section key="addCard">
          <h2 className="card-title">{`${deck.name}: Add Card`}</h2>
          <form key={deck.id} className="form-group">
            <div className="form-group">
              <label htmlFor="cardFront">Front</label>
              <textarea
                className="form-control"
                id="cardFront"
                rows="3"
                placeholder={"Front side of card"}
              ></textarea>
              <label htmlFor="cardBack">Back</label>
              <textarea
                className="form-control"
                id="cardBack"
                rows="3"
                placeholder={"Back side of card"}
              ></textarea>
            </div>

            <button
              className="btn btn-secondary"
              type="button"
              value="Reset"
              onClick={() => history.push(`/decks/${deckId}`)}
            >
              Done
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
export default AddCards;
