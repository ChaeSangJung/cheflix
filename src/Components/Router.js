import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Home from "Routes/Home";
import TV from "Routes/TV";
import Header from "Components/Header";
import Search from "Routes/Search";
import Detail from "Routes/Detail";
import More from "Routes/More";
import Season from "Routes/Season";
import Person from "Routes/Person";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/show/:id" exact component={Detail} />
        <Route path="/now_more" component={More} />
        <Route path="/show/:id/season_number/:season_number" exact component={Season} />
        <Route path="/person/:id" component={Person} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
