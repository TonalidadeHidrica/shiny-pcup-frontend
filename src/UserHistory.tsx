import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { apiEndpoint } from "./common";
import { characters } from "./characters";
import { FormattedDate } from "./CommonComponents";

interface RankingEntryApi {
  retrieve_id: string;
  retrieve_start: string;
  retrieve_end: string;
  nickname: string;
  rank: number;
  score: string;
}

interface RankingEntry {
  retrieveId: number;
  retrieveStart: Date;
  retrieveEnd: Date;
  nickname: string;
  rank: number;
  score: number;
}

export class UserHistoryRoot extends React.Component<
  RouteComponentProps<{
    eventId: string;
    characterId: string;
    earthUserId: string;
  }>,
  {
    history: null | RankingEntryApi[];
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      history: null,
    };
  }

  async componentDidMount() {
    const { characterId, eventId, earthUserId } = this.props.match.params;
    const response = await fetch(
      `${apiEndpoint}/v1/${eventId}/getUserHistory/${earthUserId}/${characterId}`
    );
    const { body: history } = await response.json();
    this.setState({ history });
  }

  render() {
    const nicknamme =
      (this.state.history || []).slice(-1)[0]?.nickname || "???";
    return (
      <>
        <h3>
          {nicknamme} さんの {characters[this.props.match.params.characterId]}{" "}
          の履歴
        </h3>
        {this.state.history ? (
          <table>
            <thead>
              <tr>
                <th>時刻</th>
                <th>ニックネーム</th>
                <th>順位</th>
                <th>スコア</th>
              </tr>
            </thead>
            <tbody>
              {this.state.history.map((e) => (
                <tr key={e.retrieve_id}>
                  <th>
                    <FormattedDate date={e.retrieve_start} />
                  </th>
                  <td>{e.nickname}</td>
                  <td>{e.rank}</td>
                  <td>{e.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>
            このウェブサイトのウワサ：アクセスするたびに開発者の財布が削れているらしい。
            (アクセスを控えろというわけでは全然ないです)
          </p>
        )}
      </>
    );
  }
}
