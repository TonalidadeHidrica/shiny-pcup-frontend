import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { characters } from "./characters";

export class EventTop extends React.Component<
  RouteComponentProps<{ eventId: string }>,
  {}
> {
  render() {
    const { eventId } = this.props.match.params;
    return (
      <div>
        お疲れさまです、プロデューサーさん！
        <ul>
          {Object.entries(characters).map(([id, name]) => (
            <li key={id}>
              <a href={`/${eventId}/topHistory/${id}`}>{name}のトップ10推移</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
