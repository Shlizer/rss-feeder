import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Context } from "../../store";

import "./css/element.scss";
import { computed } from "mobx";

@observer
export default class FeedElement extends React.Component {
  static contextType = Context;
  static propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
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

  @computed get date() {
    return this.props.date.toLocaleString();
  }

  render() {
    return (
      <li className={"feed-element"}>
        {this.icon}
        <div className={"content"}>
          <span className={"date"}>{this.date}</span>
          <a target="blank" href={this.props.link} className={"title"}>
            {this.props.title}
          </a>
        </div>
      </li>
    );
  }
}
