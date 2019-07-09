import React from "react";
import { Context, Store } from "store";
import FeedList from "component/FeedList";
import Options from "component/Options";

import "scss/reset.scss";
import "scss/App/index.scss";

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
