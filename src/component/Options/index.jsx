import React from "react";
import { observer } from "mobx-react";
import { Context } from "store";
import "scss/Options/options.scss";

@observer
export default class Options extends React.Component {
  static contextType = Context;

  render() {
    return <div id={'app-options'} className={this.context.isOpened ? 'opened' : 'closed'}>
      <div className={'refresh-options'}>
        <label>Automatyczne odświeżanie: <input type='checkbox' /></label>
        <label>Interwał odświeżania [s]: <input type='number' /></label>
      </div>
      <div className={'sources-options'}>
        <div>Źródła RSS:</div>
        {this.context.options.sources.map((source) => {
          return <div>{source}</div>
        })}
      </div>
    </div>
  }
}
