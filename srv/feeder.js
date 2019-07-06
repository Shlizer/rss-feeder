let Parser = require("rss-parser");
let parser = new Parser();

const parseUrl = (url, event) => {
  (async () => {
    try {
      let feed = await parser.parseURL(url);
      event.reply("feedData", {
        title: feed.title,
        items: feed.items,
        icon: feed.image,
        feed: feed
      });
    } catch (error) {
      console.error("Error in fetching the website");
      event.reply("error", "Error in fetching the website");
    }
  })();
};

module.exports = { parseUrl };
