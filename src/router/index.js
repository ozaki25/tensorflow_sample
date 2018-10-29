import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Off from '../components/Off';
import On from '../components/On';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/off-the-main-thread" exact component={Off} />
      <Route path="/on-the-main-thread" exact component={On} />
    </Switch>
  </BrowserRouter>
);
