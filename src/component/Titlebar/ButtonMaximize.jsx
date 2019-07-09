const remote = require("electron").remote;

import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMaximize, faWindowRestore } from "@fortawesome/free-regular-svg-icons";

export default class ButtonClose extends React.Component {
  static propTypes = {
    maximized: PropTypes.bool.isRequired
  };

  onMaximize = () => {
    const windowHandle = remote.getCurrentWindow()
    this.props.maximized ? windowHandle.unmaximize() : windowHandle.maximize();
  };

  render() {
    return this.props.maximized ?
      <FontAwesomeIcon id={"app-button-maximize"} className={"app-button"} icon={faWindowRestore} onClick={this.onMaximize} />
      :
      <FontAwesomeIcon id={"app-button-maximize"} className={"app-button"} icon={faWindowMaximize} onClick={this.onMaximize} />

  }
}
