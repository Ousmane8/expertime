import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "../pages/home";

const Routes = () => {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Redirect to="/"/>
      </Switch>
    </Router>
  );
};

export default Routes;
