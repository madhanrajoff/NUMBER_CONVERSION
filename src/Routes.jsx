import { Component, Fragment } from "react";
import { Router, Switch, Route } from "react-router-dom";

import { History } from "../src/utils";
import { Conversion } from "./components";

class Routes extends Component {
  render() {
    return (
      <Fragment>
        <Router history={History}>
          <Switch>
            <Route exact path="/" component={Conversion} />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default Routes;
