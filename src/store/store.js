import React from "react";
import { observable } from "mobx";

export class Store {
  @observable errorLog = {};

  constructor() {
    // Init node feeder
    ipcRenderer.send("initFeeder");

    // Node error catcher
    ipcRenderer.on("error", (event, errorMsg) => {
      console.error("Main process error: ", errorMsg);
    });
  }
  /**
   * THEMING
   */
  get theme() {
    return {
      background: "red"
    };
  }

  /**
   * RSS FEEDS
   */
  fetchFeed = url => {
    return fetch(url)
      .then(result => {
        result.text().then(htmlText => {
          let domParser = DOMParser();
          let document = domParser.parseFromString(htmlText, "text/html");
          let feedUrl = document.querySelector(
            'link[type="application/rss+xml"]'
          );
          debugger;
        });
      })
      .catch(error => {
        console.error("Fetch error: ", error);
      });
  };
}

const store = new Store();
export const { Provider, Consumer } = React.createContext(store);
