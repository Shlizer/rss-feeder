import React from "react";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faCogs } from "@fortawesome/free-solid-svg-icons";
import { Context } from "store";

@observer
export default class ButtonClose extends React.Component {
  static contextType = Context;

  onOptions = () => {
    this.context.toggle();
  };

  render() {
    return this.context.isOpened ?
      <FontAwesomeIcon id={"app-button-options"} className={"app-button"} icon={faCogs} onClick={this.onOptions} />
      :
      <FontAwesomeIcon id={"app-button-options"} className={"app-button"} icon={faCog} onClick={this.onOptions} />
  }
}
