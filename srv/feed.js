let Parser = require("rss-parser");
let parser = new Parser();

const parseUrl = (url) => {
  return new Promise((resolve, reject) => {
    parser.parseURL(url).then(feed => {
      resolve({
        title: feed.title,
        items: feed.items,
        icon: feed.image,
        feed: feed
      });
    }).catch(error => {
      throw "Error in fetching data: " + error;
    });
  })
};

module.exports = { parseUrl };
