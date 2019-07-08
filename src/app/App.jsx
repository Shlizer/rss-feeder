import React from "react";
import { Context, Store } from "../store";
import FeedList from "./feedList";
import Options from "./options";

import "./reset.scss";
import "./app.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.store = new Store();
  }
  render() {
    return (
      <Context.Provider value={this.store}>
        <Options />
        <FeedList />
      </Context.Provider>
    );
  }
}

export default App;
