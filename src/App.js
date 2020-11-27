import React from "react";
import "./style.scss";

import { auth } from "./firebase/firebase.utils";

import BackgroundHero from "./background-hero/background-hero.component";
import Header from "./header/header.component";
import Time from "./time/time.component";
import Journal from "./journal/journal.component";

class App extends React.Component {
  // TODO
  // Entry isn't updating on month change, when toggling between a day with an entry, and a prev month
  // Weather refresh on window focus after 30 mins timeout
  // To-do list functionality

  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="app">
        {currentUser && <BackgroundHero />}
        <Header currentUser={currentUser} />
        <Time />
        <h1>{currentUser ? "Welcome back" : "Welcome"}</h1>
        {currentUser && <Journal currentUser={currentUser} />}
      </div>
    );
  }
}

export default App;
