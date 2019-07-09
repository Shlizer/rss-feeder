const remote = require("electron").remote;

import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";

export default class ButtonClose extends React.Component {
  static propTypes = {
    pinned: PropTypes.bool.isRequired
  };

  onPin = () => {
    const windowHandle = remote.getCurrentWindow()
    windowHandle.setAlwaysOnTop(!this.props.pinned);
  };

  render() {
    return (
      <FontAwesomeIcon id={"app-button-pin"} className={"app-button " + (this.props.pinned ? "pinned" : "")} icon={faThumbtack} onClick={this.onPin} />
    );
  }
}
