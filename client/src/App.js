import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// local imports
import "./styles.scss";
import Login from "./components/Login.js";
import BubblePage from "./components/BubblePage.js";
import PrivateRoute from "./utils/PrivateRoute.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute path="/bubbles" component={BubblePage} />
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
