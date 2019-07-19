const { ipcRenderer } = require("electron");

import React from "react";
import { observable, computed, action } from "mobx";

export class Store {
  @observable opened = false;
  @observable _options = { current: {} };
  @observable feeds = [];

  constructor() {
    this.initOptions();
    this.initFeedCatcher();
    this.initErrorCatcher();
  }

  toggle() {
    this.opened = !this.opened;
  }

  @computed get isOpened() {
    return this.opened;
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
    ipcRenderer.on("newFeeds", (event, result) => this.getFeeds(result));
  }

  @action getFeeds(feeds) {
    if (!feeds || !feeds.length) return;
    this.feeds.splice(0, this.feeds.length);

    for (let i = 0; i < feeds.length; ++i) {
      for (let j = 0; j < feeds[i].items.length; ++j) {
        if (feeds[i].items[j])
          this.getFeed(feeds[i].title, feeds[i].icon || null, feeds[i].items[j]);
      }
    }
  }

  @action getFeed(category, icon, feed) {
    this.feeds.push({
      category: category,
      icon: icon,
      title: feed.title,
      date: feed.isoDate || feed.pubDate,
      link: feed.link,
      content: feed.content
    });
  }

  /**
   * Node error catcher
   */
  initErrorCatcher() {
    ipcRenderer.on("error", (event, errorData) => {
      console.error(`Main process error of type ${errorData.type}: \n`, errorData.message);
    });
  }

  @computed get elements() {
    return this.feeds.concat().sort((a, b) => {
      return a.date > b.date ? -1 : 1;
    });
  }
}

export const Context = React.createContext();
