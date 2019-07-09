const remote = require("electron").remote;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

export default class ButtonClose extends React.Component {
  onClose = () => {
    const windowHandle = remote.getCurrentWindow()
    windowHandle.close();
  };

  render() {
    return <FontAwesomeIcon id={"app-button-close"} className={"app-button"} icon={faWindowClose} onClick={this.onClose} />
  }
}
