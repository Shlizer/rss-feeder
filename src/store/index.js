import React from "react";
import { observable, computed, action } from "mobx";

const { ipcRenderer } = require("electron");

export class Store {
  @observable _options = { current: {} };
  @observable feeds = [];

  constructor() {
    this.initOptions();
    this.initFeedCatcher();
    this.initFeeder();
    this.initErrorCatcher();
  }

  /**
   *
   */
  initOptions() {
    this._options.current = ipcRenderer.sendSync("getOptions");
  }

  @computed get options() {
    return this._options.current || {};
  }

  /**
   * Init node feeder catcher
   */
  initFeedCatcher() {
    ipcRenderer.on("feedData", (event, result) => this.getFeed(result));
  }

  @action getFeed(result) {
    for (let f in result.items) {
      let feed = result.items[f];
      this.feeds.push({
        category: result.title,
        icon: result.icon || null,
        title: feed.title,
        date: feed.isoDate || feed.pubDate,
        content: feed.content
      });
    }
  }

  /**
   * Init node feeder
   */
  initFeeder() {
    ipcRenderer.send("initFeeder", this.options.sources || []);
  }

  /**
   * Node error catcher
   */
  initErrorCatcher() {
    ipcRenderer.on("error", (event, errorMsg) => {
      console.error("Main process error: ", errorMsg);
    });
  }

  @computed get elements() {
    return this.feeds.concat().sort((a, b) => {
      return a.date > b.date ? -1 : 1;
    });
  }
}

export const Context = React.createContext();
