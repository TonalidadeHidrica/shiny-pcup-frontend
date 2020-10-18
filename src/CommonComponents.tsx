import dateFormat from "dateformat";
import React from "react";

export class FormattedDate extends React.Component<any, any> {
  render() {
    return dateFormat(this.props.date, "dd日 HH:MM:ss");
  }
}
