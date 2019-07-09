const fs = require("fs");

const optionsDefault = {
  sources: []
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
    fs.writeFileSync(
      "conf.json",
      JSON.stringify(Object.assign({}, optionsDefault, data))
    );
  } catch (error) {
    console.error("Error while saving options data");
    event.reply("error", "Error while saving options data");
  }
};

module.exports = { setOptions, getOptions };
