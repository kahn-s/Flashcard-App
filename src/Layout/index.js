import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./Header";
import Decks from "./Decks";
import ViewDeck from "./ViewDeck";
import NotFound from "./NotFound";
import { deleteDeck, listDecks } from "../utils/api/index.js";
import EditDeck from "./EditDeck";
import CreateDeck from "./CreateDeck";
import Study from "./Study";
import AddCards from "./AddCards";
import EditCard from "./EditCard";

function Layout() {
  const [decks, setDecks] = useState([]);
  //const prevDecks = usePrevious(decks);
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({});
  const [error, setError] = useState(null);
  const history = useHistory();

  //Get all decks

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal)
      .then((_decks) => {
        return setDecks(_decks);
      })
      .catch((error) => {
        setError(error);
      });

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    console.log("this should change every time decks is updated.", decks);
  }, [decks]);

  async function handleDelete({ deck }) {
    const toRemove = deck.id;
    console.log(toRemove);
    if (window.confirm("Delete this deck? You won't be able to recover it.")) {
      await deleteDeck(toRemove);
      history.push("/");
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
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck
              deck={deck}
              setDeck={setDeck}
              error={error}
              setError={setError}
            />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study
              decks={decks}
              setDecks={setDecks}
              deck={deck}
              setDeck={setDeck}
              cards={cards}
              setCards={setCards}
              error={error}
              setError={setError}
            />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard
              deck={deck}
              setDeck={setDeck}
              card={card}
              setCard={setCard}
              error={error}
              setError={setError}
            />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCards
              deck={deck}
              setDeck={setDeck}
              cards={cards}
              setCards={setCards}
              card={card}
              setCard={setCard}
            />
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
