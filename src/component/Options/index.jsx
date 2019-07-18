import React from "react";
import { observer } from "mobx-react";
import { Context } from "store";
import "scss/Options/options.scss";

@observer
export default class Options extends React.Component {
  static contextType = Context;

  render() {
    return <div id={'app-options'} className={this.context.isOpened ? 'opened' : 'closed'}>
      <div className={'sources-options'}>
        <div>Źródła RSS:</div>
        {this.context.options.sources.map((source) => {
          return <div id={source}><input type='text' value={source} /></div>
        })}
      </div>
      <div className={'refresh-options'}>
        <span className={'option autorefresh'}>
          <input type='checkbox' /><label>Automatyczne odświeżanie </label>
        </span>
        <span className={'option refreshTime'}>
          <input type='number' min='0' max='99' /><label>Interwał odświeżania [s] </label>
        </span>
      </div>
    </div>
  }
}
