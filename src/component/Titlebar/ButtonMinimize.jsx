const remote = require("electron").remote;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMinimize } from "@fortawesome/free-regular-svg-icons";

export default class ButtonClose extends React.Component {
  onMinimize = () => {
    const windowHandle = remote.getCurrentWindow()
    windowHandle.minimize();
  };

  render() {
    return <FontAwesomeIcon id={"app-button-minimize"} className={"app-button"} icon={faWindowMinimize} onClick={this.onMinimize} />
  }
}
