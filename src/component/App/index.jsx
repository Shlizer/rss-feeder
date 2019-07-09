
import React from "react";
import { Context, Store } from "store";
import Titlebar from "component/Titlebar";
import FeedList from "component/FeedList";
import Options from "component/Options";

import "scss/reset.scss";
import "scss/App/index.scss";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.store = new Store();
  }

  render() {
    return (
      <div id={'app'}>
        <Context.Provider value={this.store}>
          <Titlebar />
          <div id={'app-content'}>
            <Options />
            <FeedList />
          </div>
        </Context.Provider>
      </div>
    );
  }
}
