import React, { useEffect, useState } from "react";
import { useParams, Switch, Route, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";
import ErrorMessage from "./ErrorMessage";
import Cards from "./Cards";

// TODos  Routes to Edit Card, Add Card

function Study() {
  const [deck, setDeck] = useState([]);
  const [error, setError] = useState(undefined);
  const { deckId } = useParams();
  const { url } = useRouteMatch();
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((deck) => setDeck(deck))

      .catch((error) => setError(error));

    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }
  function renderStudy() {
    if (Object.keys(deck).length > 0) {
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
            <h1>Study</h1>
          </div>
          <div>
            <Cards deck={deck} key={deck.id} />
          </div>
        </section>
      );
    }
  }
  return (
    <main>
      <Switch>
        <Route path={`${url}/`}>{renderStudy()}</Route>
        {/*<Route path={`${url}/edit`}>
            <Edit Card />
          </Route>
          <Route path={`${url}/add`}>
            <Add Card />
          </Route>*/}
      </Switch>
    </main>
  );
}

export default Study;
