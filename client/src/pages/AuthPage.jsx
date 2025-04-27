import React from "react";
import "./styles.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Error from "./components/Error";
import { Route, Switch } from "react-router-dom";

function AuthPage() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={Signup} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default AuthPage;
