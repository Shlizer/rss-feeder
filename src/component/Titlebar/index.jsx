const remote = require("electron").remote;
const { ipcRenderer } = require("electron");

import React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { Context } from "store";
import ButtonClose from "./ButtonClose";
import ButtonMaximize from "./ButtonMaximize";
import ButtonMinimize from "./ButtonMinimize";
import ButtonOptions from "./ButtonOptions";
import ButtonPin from "./ButtonPin";
import "scss/Titlebar/titlebar.scss";

@observer
export default class Titlebar extends React.Component {
  static contextType = Context;

  @observable windowData = {
    handle: null,
    active: true,
    maximized: false,
    pinned: false
  };

  constructor(props) {
    super(props);
    this.windowData.handle = remote.getCurrentWindow();
    this.windowData.maximized = this.windowData.handle.isMaximized();
    this.windowData.pinned = this.windowData.handle.isAlwaysOnTop();

    let windowData = this.windowData;
    ipcRenderer.on("windowActive", (event, result) => windowData.active = result);
    ipcRenderer.on("windowMaximize", (event, result) => windowData.maximized = !!result);
    ipcRenderer.on("windowAlwaysOnTop", (event, result) => windowData.pinned = !!result);
  }

  render() {
    return (
      <div id={"app-titlebar"} className={(this.windowData.active ? 'active' : 'inactive')}>
        <div id={"app-icon"} />
        <div id={"app-title"}>RSS Feeder</div>
        <ButtonOptions />
        <ButtonPin pinned={this.windowData.pinned} />
        <ButtonMinimize />
        <ButtonMaximize maximized={this.windowData.maximized} />
        <ButtonClose />
      </div>
    );
  }
}
