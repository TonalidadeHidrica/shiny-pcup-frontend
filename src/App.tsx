import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { TopHistory } from "./TopHistory";
import { characters } from "./characters";
import { UserHistoryRoot } from "./UserHistory";

class RootPage extends React.Component {
  render() {
    return (
      <div>
        お疲れさまです、プロデューサーさん！
        <ul>
          {Object.entries(characters).map(([id, name]) => (
            <li key={id}>
              <a href={`/40005/topHistory/${id}`}>{name}のトップ10推移</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/:eventId/userHistory/:earthUserId/:characterId"
          component={UserHistoryRoot}
        />
        <Route
          path="/:eventId/topHistory/:characterId"
          component={TopHistory}
        />
        <Route component={RootPage} />
      </Switch>
    </Router>
  );
}

export default App;
