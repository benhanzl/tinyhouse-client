import ApolloClient from "apollo-boost";
import React, { useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Affix } from "antd";
import { Viewer } from "./lib/types";
import {
  AppHeader,
  Home,
  Host,
  Listing,
  Listings,
  Login,
  NotFound,
  User
} from "./sections";
import "./styles/index.css";
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  uri: "/api"
});

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false
};

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);

  return (
    <Router>
      <Affix offsetTop={0} className="app__affix-header">
        <AppHeader viewer={viewer} setViewer={setViewer} />
      </Affix>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/host" component={Host} />
        <Route exact path="/listing/:id" component={Listing} />
        <Route exact path="/listings/:location?" component={Listings} />
        <Route
          exact
          path="/login"
          render={props => <Login {...props} setViewer={setViewer} />}
        />
        <Route exact path="/user/:id" component={User} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
