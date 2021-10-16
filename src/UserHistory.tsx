import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { apiEndpoint } from "./common";
import { characters } from "./characters";
import { FormattedDate } from "./CommonComponents";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

interface RankingEntryApi {
  retrieve_id: string;
  retrieve_start: string;
  retrieve_end: string;
  nickname: string;
  rank: number;
  score: string;
}

// noinspection JSUnusedLocalSymbols
interface RankingEntry {
  retrieveId: number;
  retrieveStart: Date;
  retrieveEnd: Date;
  nickname: string;
  rank: number;
  score: number;
}

interface RouteProps {
  eventId: string;
  characterId: string;
  earthUserId: string;
}

export const UserHistoryRoot: React.FC<RouteComponentProps<RouteProps>> = (
  props
) => {
  const [history, setHistory] = useState<null | RankingEntryApi[]>(null);
  // const [chartExtremes, setChartExtremes] = useState({min: null, max: null});

  useEffect(() => {
    (async () => {
      const { characterId, eventId, earthUserId } = props.match.params;
      const response = await fetch(
        `${apiEndpoint}/v1/${eventId}/getUserHistory/${earthUserId}/${characterId}`
      );
      const { body } = await response.json();
      setHistory(body[earthUserId]);
    })();
  }, []);

  const nickname = (history || []).slice(-1)[0]?.nickname || "???";
  const scoreData = history?.map((e) => [+new Date(e.retrieve_start), e.score]);
  const rankData = history?.map((e) => [+new Date(e.retrieve_start), e.rank]);
  // const afterSetExtremes: Highcharts.AxisSetExtremesEventCallbackFunction = (
  //   event
  // ) => {
  //   console.log(event);
  //   setChartExtremes({ min: event.min, max: event.max });
  // };

  return (
    <>
      <h3>
        {nickname} さんの {characters[props.match.params.characterId]} の履歴
      </h3>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          title: {
            text: "ファン人数の推移",
          },
          series: [{ data: scoreData, name: nickname }],
          xAxis: {
            type: "datetime",
            gridLineWidth: 1,
            // ...chartExtremes,
            // events: { afterSetExtremes },
          },
          yAxis: { title: { text: "ファン人数" } },
          chart: { zoomType: "x" },
        }}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          title: {
            text: "順位の推移",
          },
          series: [{ data: rankData, name: nickname }],
          xAxis: {
            type: "datetime",
            gridLineWidth: 1,
            // ...chartExtremes,
            // events: { afterSetExtremes },
          },
          yAxis: {
            title: { text: "順位" },
            reversed: true,
          },
          chart: { zoomType: "x" },
        }}
      />
      {history ? (
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
            {history.map((e) => (
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
};
