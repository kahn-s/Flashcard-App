import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Decks from "./Decks";
import ViewDeck from "./ViewDeck";
import NotFound from "./NotFound";

function Layout() {
  return (
    <section>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Decks />
          </Route>
          <Route path="/decks/:deckId">
            <ViewDeck />
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
