import React from "react";
import { computed } from "mobx";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { Context } from "store";
import {default as TimeAgoBase} from 'timeago-react';
import {register as localeRegister} from 'timeago.js';

@observer
export default class TimeAgo extends React.Component {
  static contextType = Context;
  static propTypes = {
      date: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.instanceOf(Date)
      ]).isRequired
  };

  registered = false;

  @computed get lang() {
    if (!this.registered) {
      localeRegister(this.context.options.lang, require('timeago.js/lib/lang/'+this.context.options.lang));
      this.registered = true;
    }
    return this.context.options.lang;
  }

  render() {
    return this.props.date ? <TimeAgoBase datetime={this.props.date} locale={this.lang}/> : null;
  }
}
