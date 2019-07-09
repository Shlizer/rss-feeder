const remote = require("electron").remote;

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
    maximized: false,
    pinned: false
  };

  constructor(props) {
    super(props);
    this.windowData.handle = remote.getCurrentWindow();
    this.windowData.maximized = this.windowData.handle.isMaximized();
    this.windowData.pinned = this.windowData.handle.isAlwaysOnTop();
  }

  render() {
    return (
      <div id={"app-titlebar"}>
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
