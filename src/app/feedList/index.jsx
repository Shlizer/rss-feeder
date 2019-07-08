import React from "react";
import { observer } from "mobx-react";
import { Context } from "../../store";
import { computed } from "mobx";
import FeedElement from "./FeedElement";

@observer
export default class FeedList extends React.Component {
  static contextType = Context;

  @computed get list() {
    console.log(this.context.elements);
    return this.context.elements.map(feed => {
      return (
        <FeedElement
          key={feed.date}
          title={feed.title}
          date={new Date(feed.date)}
          icon={feed.icon ? feed.icon.url : ""}
        />
      );
    });
  }

  render() {
    return <div>{this.list}</div>;
  }
}
