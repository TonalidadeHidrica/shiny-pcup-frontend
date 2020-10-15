import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { TopHistory } from "./TopHistory";

class RootPage extends React.Component {
  render() {
    return <div>お疲れさまです、プロデューサーさん！</div>;
  }
}

function App() {
  return (
    <Router>
      <Switch>
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
