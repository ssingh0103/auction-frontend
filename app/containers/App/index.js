/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage';
import NotFoundPage from 'containers/NotFoundPage';
import Header from '../../components/Header';

import GlobalStyle from '../../global-styles';

export default function App() {
  const [timer, setTimer] = useState(0);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
