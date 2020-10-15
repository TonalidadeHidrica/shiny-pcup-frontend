import { TopHistoryEntry, TopHistoryEntryApi } from "./types";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import dateFormat from "dateformat";
import "./TopHistory.css";
import { characters } from "./characters";

interface TopHistoryState {
  topHistory: null | TopHistoryEntry[];
}

export class TopHistory extends React.Component<
  RouteComponentProps<{ eventId: string; characterId: string }>,
  TopHistoryState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      topHistory: null,
    };
  }

  render() {
    if (this.state.topHistory === null) {
      return <div>お疲れさまです、プロデューサーさん！ </div>;
    } else {
      // <span>e.nickname</span>
      // <span>e.score</span>
      const { characterId } = this.props.match.params;
      return (
        <div>
          <h3>{characters[characterId]}のトップ10の推移</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>日時</th>
                  {[...Array(10)].map((e, i) => (
                    <th key={i}>{i + 1}位</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.state.topHistory.map((entry) => (
                  <tr key={entry.id}>
                    <td>{dateFormat(entry.retrieveEnd, "dd日 HH:MM:ss")}</td>
                    {entry.entries.map((e) => (
                      <td key={e.rank}>
                        <span className={"nickname-span"}>{e.nickname}</span>
                        {/*<br />*/}
                        <span className={"score-span"}>{e.score}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }

  async componentDidMount() {
    const { eventId, characterId } = this.props.match.params;
    const response = await fetch(
      `https://kl8xmr7hlb.execute-api.ap-northeast-1.amazonaws.com/dev/v1/${eventId}/getHistoryByRank/${characterId}/1/10`
    );
    const json: TopHistoryEntryApi[] = await response.json();
    this.setState({
      topHistory: json.map((e) => ({
        id: e.id,
        retrieveEnd: new Date(e.retrieve_end),
        entries: e.entries,
      })),
    });
  }
}