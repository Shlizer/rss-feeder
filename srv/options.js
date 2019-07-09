const fs = require("fs");

const optionsDefault = {
  window: {
    position: {
      top: 0,
      left: 0
    },
    size: {
      width: 800,
      height: 600
    },
    pinned: false,
    maximized: false
  },
  sources: [],
  feed: {
    auto: true,
    time: 5000
  }
};

const getOptions = () => {
  try {
    let rawData = fs.readFileSync("conf.json");
    return Object.assign({}, optionsDefault, JSON.parse(rawData));
  } catch (error) {
    setOptions(optionsDefault);
  }
};

const setOptions = data => {
  try {
    fs.writeFileSync("conf.json", JSON.stringify(Object.assign({}, optionsDefault, data)));
  } catch (error) {
    console.error("Error while saving options data");
    event.reply("error", "Error while saving options data");
  }
};

module.exports = { setOptions, getOptions };
