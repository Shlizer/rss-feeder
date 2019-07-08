import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Context } from "../../store";

import "./element.scss";
import { computed } from "mobx";

@observer
export default class FeedElement extends React.Component {
  static contextType = Context;
  static propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    icon: PropTypes.string
  };

  @computed get icon() {
    return this.props.icon ? (
      <img src={this.props.icon} className={"icon"} />
    ) : (
      <span className={"icon empty"} />
    );
  }

  render() {
    return (
      <li className={"feed-element"}>
        {this.icon}
        {this.props.date.toString()} -- {this.props.title}
      </li>
    );
  }
}
