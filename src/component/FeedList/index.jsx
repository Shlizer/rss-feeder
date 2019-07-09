import React from "react";
import { observer } from "mobx-react";
import { computed } from "mobx";
import { Context } from "store";
import FeedElement from "./FeedElement";
import "scss/FeedList/list.scss";

@observer
export default class FeedList extends React.Component {
  static contextType = Context;

  @computed get list() {
    return this.context.elements.map(feed => {
      return (
        <FeedElement
          key={feed.date}
          title={feed.title}
          date={new Date(feed.date)}
          icon={feed.icon ? feed.icon.url : ""}
          link={feed.link}
        />
      );
    });
  }

  render() {
    return <div className={"feed-list"}>{this.list}</div>;
  }
}
