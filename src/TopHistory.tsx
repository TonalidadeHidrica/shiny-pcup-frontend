import {
  TopHistoryEntry,
  TopHistoryEntryApi,
  TopHistoryRankEntry,
} from "./types";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import "./TopHistory.css";
import { characters } from "./characters";
import { apiEndpoint } from "./common";
import { FormattedDate } from "./CommonComponents";

interface TopHistoryState {
  topHistory: null | TopHistoryEntry[];
  hoveredUser: null | string;
}

export class TopHistory extends React.Component<
  RouteComponentProps<{ eventId: string; characterId: string }>,
  TopHistoryState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      topHistory: null,
      hoveredUser: null,
    };
  }

  render() {
    if (this.state.topHistory === null) {
      return <div>お疲れさまです、プロデューサーさん！ </div>;
    } else {
      // <span>e.nickname</span>
      // <span>e.score</span>
      const { eventId, characterId } = this.props.match.params;
      return (
        <div>
          <h3>{characters[characterId]}のトップ10の推移</h3>
          <p><em>新機能</em>：ユーザー名をクリックするとその人の過去の履歴が見られるようになりました。</p>
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
                    <td>
                      <FormattedDate date={entry.retrieveEnd} />
                    </td>
                    {entry.entries.map((e) => (
                      <td
                        key={e.rank}
                        className={
                          e.earthUserId === this.state.hoveredUser
                            ? "hovered-td"
                            : ""
                        }
                        onMouseOver={this.handleTdHover.bind(this, e, true)}
                        onMouseOut={this.handleTdHover.bind(this, e, false)}
                      >
                        <span className={"nickname-span"}>
                          <a
                            href={`/${eventId}/userHistory/${e.earthUserId}/${characterId}`}
                          >
                            {e.nickname}
                          </a>
                        </span>
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

  handleTdHover(entry: TopHistoryRankEntry, entered: boolean) {
    const hoveredUser = entered ? entry.earthUserId : null;
    this.setState({ hoveredUser });
  }

  async componentDidMount() {
    const { eventId, characterId } = this.props.match.params;
    const response = await fetch(
      `${apiEndpoint}/v1/${eventId}/getHistoryByRank/${characterId}/1/10`
    );
    const json: TopHistoryEntryApi[] = await response.json();
    this.setState({
      topHistory: json.map((e) => ({
        id: e.id,
        retrieveEnd: new Date(e.retrieve_end),
        entries: e.entries.map((e) => ({
          ...e,
          earthUserId: e.earth_user_id,
        })),
      })),
    });
  }
}
