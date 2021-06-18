import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./Header";
import Decks from "./Decks";
import ViewDeck from "./ViewDeck";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api/index.js";
import ErrorMessage from "./ErrorMessage";
import { useRouteMatch, useParams } from "react-router-dom";
import EditDeck from "./EditDeck";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState([]);
  const [error, setError] = useState(undefined);
  const abortController = new AbortController();
  const { path } = useRouteMatch();
  const history = useHistory();

  //Get all decks

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

  function handleDelete({ deck }) {
    const toRemove = deck.id;
    if (window.confirm("Delete this deck? You won't be able to recover it.")) {
      const newDecks = decks.filter((deck) => deck.id !== toRemove);
      setDecks(newDecks);
      history.push("/");
    }
  }
  function DeckEdit(edits) {
    console.log("DeckEdit component");
    if (edits) {
      console.log(edits);
      setDeck(...deck, edits);
      console.log(deck);
    }
  }

  return (
    <section>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Decks decks={decks} handleDelete={handleDelete} />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck deck={deck} />
          </Route>
          <Route path="/decks/:deckId">
            <ViewDeck
              decks={decks}
              deck={deck}
              setDeck={setDeck}
              handleDelete={handleDelete}
              error={error}
              setError={setError}
            />
          </Route>
          <Route path="/decks"></Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </section>
  );
}

export default Layout;
