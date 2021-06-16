import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DecksList from "./DecksList";

function Layout() {
  return (
    <section>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DecksList />
          </Route>
        </Switch>
        <Route NoMatch>
          <NotFound />
        </Route>
      </div>
    </section>
  );
}

export default Layout;
