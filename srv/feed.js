let Parser = require("rss-parser");
let parser = new Parser();

const parseUrl = (url) => {
  return new Promise((resolve, reject) => {
    return parser.parseURL(url).then(feed => {
      resolve({
        status:'resolved',
        data: 
          {
          title: feed.title,
          items: feed.items,
          icon: feed.image,
          feed: feed
        }
      });
    }).catch(error => {
      resolve({status:'rejected', url: url});
    });
  })
};

module.exports = { parseUrl };
