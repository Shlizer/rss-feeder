import React, { Fragment } from "react";
import { observer } from "mobx-react";
import { computed } from "mobx";
import { Context } from "store";
import FeedElement from "./FeedElement";
import "scss/FeedList/list.scss";
import TimeAgo from "./TimeAgo";

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

  @computed get feedTimer() {
    return this.context.lastFeedTime ? <TimeAgo date={this.context.lastFeedTime} /> : '-' + this.context.lastFeedTime;
  }

  render() {
    return <Fragment>
      <div className={"feed-info"}>{this.feedTimer}</div>
      <div className={"feed-list"}>{this.list}</div>
    </Fragment>;
  }
}
