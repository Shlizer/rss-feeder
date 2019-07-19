const fs = require("fs");
const { errorDefaultPath, handleException } = require("./error");

const optionsDefault = {
  lang: "en",
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
  logDir: errorDefaultPath,
  sources: [],
  feed: {
    auto: true,
    time: 15000
  }
};

const getOptions = (wndHandle) => {
  try {
    return Object.assign({}, optionsDefault, JSON.parse(fs.readFileSync("conf.json")));
  } catch (error) {
    handleException(error, 'optionsLoad', errorDefaultPath, wndHandle);
    setOptions(optionsDefault);
  }
};

const setOptions = (data, wndHandle) => {
  try {
    fs.writeFileSync("conf.json", JSON.stringify(Object.assign({}, optionsDefault, data)));
  } catch (error) {
    handleException(error, 'optionsSave', errorDefaultPath, wndHandle);
  }
};

module.exports = { setOptions, getOptions };
