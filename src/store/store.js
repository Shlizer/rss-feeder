import React from "react";
import { observable } from "mobx";

export class Store {
  @observable rssSources = ["https://www.hongkiat.com/blog/feed/"];
  @observable feeds = [];

  constructor() {
    this.initFeedCatcher();
    this.initFeeder();
    this.initErrorCatcher();
  }

  /**
   * Init node feeder catcher
   */
  initFeeder() {
    ipcRenderer.on("feedData", (event, feed) => {
      debugger;
    });
  }

  /**
   * Init node feeder
   */
  initFeeder() {
    ipcRenderer.send("initFeeder", this.rssSources);
  }

  /**
   * Node error catcher
   */
  initErrorCatcher() {
    ipcRenderer.on("error", (event, errorMsg) => {
      console.error("Main process error: ", errorMsg);
    });
  }
}

const store = new Store();
export const { Provider, Consumer } = React.createContext(store);
