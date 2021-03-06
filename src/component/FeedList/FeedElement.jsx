import React from "react";
import { observer } from "mobx-react";
import { computed } from "mobx";
import PropTypes from "prop-types";

import "scss/FeedList/element.scss";

@observer
export default class FeedElement extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    icon: PropTypes.string
  };

  @computed get icon() {
    return this.props.icon ? <img src={this.props.icon} className={"icon"} /> : <span className={"icon empty"} />;
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
