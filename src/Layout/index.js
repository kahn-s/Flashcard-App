import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Decks from "./Decks";
function Layout() {
  return (
    <section>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Decks />
          </Route>
          <Route No Match>
            <h1> 404 NotFound </h1>
          </Route>
        </Switch>
      </div>
    </section>
  );
}

export default Layout;
