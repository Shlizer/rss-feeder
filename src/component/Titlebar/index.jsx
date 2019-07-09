const remote = require("electron").remote;

import React, { Fragment } from "react";
import { computed, observable } from "mobx";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMaximize, faWindowRestore, faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { faThumbtack, faCog, faCogs, faWindowMinimize } from "@fortawesome/free-solid-svg-icons";

import { Store } from "store";
import "scss/Titlebar/titlebar.scss";

@observer
export default class Titlebar extends React.Component {
  @observable windowData = {
    handle: null,
    options: false,
    maximized: false,
    pinned: false
  };

  constructor(props) {
    super(props);
    this.store = new Store();

    this.windowData.handle = remote.getCurrentWindow();
    this.windowData.maximized = this.windowData.handle.isMaximized();
    this.windowData.pinned = this.windowData.handle.isAlwaysOnTop();
  }

  onOptions = () => {
    this.windowData.options = !this.windowData.options;
  };

  onPin = () => {
    this.windowData.pinned = !this.windowData.pinned;
    this.windowData.handle.setAlwaysOnTop(this.windowData.pinned);
  };

  onMinimize = () => {
    this.windowData.handle.minimize();
  };

  onMaximize = () => {
    this.windowData.maximized = !this.windowData.maximized;
    this.windowData.maximized
      ? this.windowData.handle.maximize()
      : this.windowData.handle.unmaximize();
  };

  onClose = () => {
    this.windowData.handle.close();
  };

  @computed get icons() {
    const classPin = "app-button " + (this.windowData.pinned ? "pinned" : "");
    return (
      <Fragment>
        {this.windowData.options ? (
          <FontAwesomeIcon id={"app-button-options"} className={"app-button"} icon={faCogs} onClick={this.onOptions} />
        ) : (
            <FontAwesomeIcon id={"app-button-options"} className={"app-button"} icon={faCog} onClick={this.onOptions} />
          )}

        <FontAwesomeIcon id={"app-button-pin"} className={classPin} icon={faThumbtack} onClick={this.onPin} />
        <FontAwesomeIcon id={"app-button-minimize"} className={"app-button"} icon={faWindowMinimize} onClick={this.onMinimize} />

        {this.windowData.maximized ? (
          <FontAwesomeIcon id={"app-button-maximize"} className={"app-button"} icon={faWindowRestore} onClick={this.onMaximize} />
        ) : (
            <FontAwesomeIcon id={"app-button-maximize"} className={"app-button"} icon={faWindowMaximize} onClick={this.onMaximize} />
          )}
        <FontAwesomeIcon id={"app-button-close"} className={"app-button"} icon={faWindowClose} onClick={this.onClose} />
      </Fragment>
    );
  }

  render() {
    return (
      <div id={"app-titlebar"}>
        <div id={"app-icon"} />
        <div id={"app-title"}>RSS Feeder</div>
        {this.icons}
      </div>
    );
  }
}
