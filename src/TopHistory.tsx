import { RetrieveDateEntry, RetrieveDateEntryApi } from "./types";
import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface TopHistoryState {
  lastRetrieve: null | RetrieveDateEntry;
}

export class TopHistory extends React.Component<
  RouteComponentProps<{ eventId: string; characterId: string }>,
  TopHistoryState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      lastRetrieve: null,
    };
  }

  render() {
    if (this.state.lastRetrieve === null) {
      return <div>お疲れさまです、プロデューサーさん！ </div>;
    } else {
      return (
        <div>
          最終更新日時：{this.state.lastRetrieve.retrieveEnd.toString()}
        </div>
      );
    }
  }

  async componentDidMount() {
    const { eventId, characterId } = this.props.match.params;
    const response = await fetch(
      `https://kl8xmr7hlb.execute-api.ap-northeast-1.amazonaws.com/dev/v1/${eventId}/getLatestRetrieveId/${characterId}`
    );
    const json: RetrieveDateEntryApi = await response.json();
    this.setState({
      lastRetrieve: {
        id: json.id,
        eventId: json.event_id,
        characterId: json.character_id,
        retrieveStart: new Date(json.retrieve_start),
        retrieveEnd: new Date(json.retrieve_end),
      },
    });
  }
}