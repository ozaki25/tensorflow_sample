import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Off from '../components/Off';
import On from '../components/On';
import Video from '../components/Video';

export default () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/only-video" exact component={Video} />
      <Route path="/off-the-main-thread" exact component={Off} />
      <Route path="/on-the-main-thread" exact component={On} />
    </Switch>
  </BrowserRouter>
);
