import React from "react";
import { observer } from "mobx-react";
import { Context } from "../../store";
import { computed, set } from "mobx";

@observer
export default class FeedList extends React.Component {
  static contextType = Context;

  @computed get list() {
    console.log(this.context.elements);
    return this.context.elements.map(feed => {
      return (
        <li key={feed.date}>
          {feed.icon ? <img src={feed.icon.url} /> : null}
          {feed.date} -- {feed.title}
        </li>
      );
    });
  }

  render() {
    return <div>{this.list}</div>;
  }
}
