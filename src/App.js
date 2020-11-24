import React from "react";
import "./style.scss";

import { auth } from "./firebase/firebase.utils";

import BackgroundHero from "./background-hero/background-hero.component";
import Header from "./header/header.component";
import Time from "./time/time.component";
import Journal from "./journal/journal.component";

class App extends React.Component {
  // TODO
  // Change months
  // Finish the weather icons hook-up
  // Weather refresh on window focus after 30 mins timeout
  // To-do list functionality
  // New background image per day

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
    return (
      <div className="app">
        <BackgroundHero />
        <Header currentUser={this.state.currentUser} />
        <Time />
        <h1>{this.state.currentUser ? "Welcome back" : "Welcome"}</h1>
        {this.state.currentUser && (
          <Journal currentUser={this.state.currentUser} />
        )}
      </div>
    );
  }
}

export default App;
