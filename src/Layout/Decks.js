import React from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import Study from "./Study";

function Decks({ decks }) {
  const { url } = useRouteMatch();
  const { deckId } = useParams();
  const FindDeckById = () => {
    decks.find((deck) => deck.id === { deckId });
  };
  function DeckScreen() {
    FindDeckById();
    console.log("View Deck");
    return (
      <div>
        <p>This is the Deck Screen</p>
      </div>
    );
  }

  function EditDeckScreen() {
    FindDeckById();
    console.log("Edit Deck");
    return (
      <div>
        <p>This is the Edit Deck Screen</p>
      </div>
    );
  }
  function NewDeckScreen() {
    console.log("New Deck");
    return (
      <div>
        <p>This is the New Deck Screen</p>
      </div>
    );
  }

  return (
    <section id="test-links">
      <Switch>
        <Route path={`${url}/new`}>
          <NewDeckScreen />
        </Route>
        <Route exact path={`/decks/:deckId`}>
          <DeckScreen />
        </Route>
        <Route path={`${url}/:deckId/study`}>
          <Study decks={decks} />
        </Route>
        <Route path={`${url}/:deckId/edit`}>
          <EditDeckScreen />
        </Route>
      </Switch>
    </section>
  );
}
export default Decks;
