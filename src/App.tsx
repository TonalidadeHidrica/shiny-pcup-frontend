import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { TopHistory } from "./TopHistory";
import { UserHistoryRoot } from "./UserHistory";
import { EventTop } from "./EventTop";

class RootPage extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            2.5周年Pカップ(どっかにデータは残ってると思うんですが今は復元してません)
          </li>
          <li>3周年Pカップ(どっかにデーry)</li>
          <li>
            <a href="/40007/">3.5周年Pカップ</a>
          </li>
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
        <Route path="/:eventId/" component={EventTop} />
        <Route component={RootPage} />
      </Switch>
    </Router>
  );
}

export default App;
