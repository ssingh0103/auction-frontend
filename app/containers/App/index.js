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
import ItemPage from 'containers/ItemPage';
import NotFoundPage from 'containers/NotFoundPage';
import AdminPage from 'containers/AdminPage';
import Header from '../../components/Header';
import GlobalStyle from '../../global-styles';
import { admins } from '../../constants';

export default function App() {
  const [timer, setTimer] = useState(0);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const loggedIn = profile => {
    const newUser = {
      email: profile.profileObj.email,
      name: profile.profileObj.givenName,
      surname: profile.profileObj.familyName,
    };
    setUser(newUser);
    if (admins.indexOf(profile.profileObj.email) >= 0) {
      setIsAdmin(true);
    }
  };

  console.log(isAdmin);
  return (
    <div>
      <Header
        loggedIn={loggedIn}
        authenticated={user !== null}
        isAdmin={isAdmin}
      />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/details" component={ItemPage} />
        <Route
          exact
          path="/details/:guid"
          render={props => <ItemPage {...props} user={user} />}
        />
        <Route exact path="/admin" component={AdminPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
