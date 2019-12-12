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
import Header from '../../components/Header';

import GlobalStyle from '../../global-styles';

export default function App() {
  const [timer, setTimer] = useState(0);
  const [user,setUser] = useState(null);


  const loggedIn = (profile)=>{
    let newUser ={
      email: profile.profileObj.email,
      name:  profile.profileObj.givenName,
      surname: profile.profileObj.familyName
    }
    setUser(newUser);
  }
  console.log('User is',user);
  return (
    <div>
      <Header loggedIn={loggedIn} authenticated={user!==null}/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/details" component={ItemPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
