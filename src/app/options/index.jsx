import React from "react";
import { observer } from "mobx-react";
import { Context } from "../../store";

@observer
export default class Options extends React.Component {
  static contextType = Context;

  render() {
    return <div />;
  }
}
