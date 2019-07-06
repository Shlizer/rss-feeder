import React from "react";

export class Store {
  constructor() {
    let a = this.fetchFeed(
      "http://crossorigin.me/http://www.hongkiat.com/blog/feed/"
    );
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
