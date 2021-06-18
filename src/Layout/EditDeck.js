import React from "react";
import { useHistory, withRouter } from "react-router-dom";

function EditDeck({ deck }) {
  console.log("this deck is ", deck);
  const history = useHistory();
  const handleSubmit = (e) => {
    let name = document.getElementById("deckName").value;
    console.log(`"name": "${name}"`);
    let editName = `"name": "${name}"`;
    let description = document.getElementById("deckDescr").value;
    console.log(`"description": "${description}"`);
    let editDescr = `"description": "${description}"`;
    let edits = { editName, editDescr };
    console.log(edits);
    history.push("/");
    return edits;
  };

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
            <p>Edit Deck</p>
          </li>
        </ol>
      </nav>
      <section key="deck">
        <h1 className="card-title">Edit Deck</h1>
        <form key={deck.id} className="form-group">
          <div className="form-group">
            <label htmlFor="deckName">Name</label>
            <textarea
              className="form-control"
              id="deckName"
              rows="1"
              placeholder={`${deck.name}`}
            ></textarea>
            <label htmlFor="deckDescr">Description</label>
            <textarea
              className="form-control"
              id="deckDescr"
              rows="3"
              placeholder={`${deck.description}`}
            ></textarea>
          </div>

          <button className="btn btn-secondary" type="reset" value="Reset">
            Cancel
          </button>
          <button
            className="btn btn-primary"
            type="button"
            value="Submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}
export default withRouter(EditDeck);
