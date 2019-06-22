import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import SignInPage from './page/auth/SignInPage'
import SignInWithEmailPage from './page/auth/SignInWithEmailPage'
import SignUpWithEmailPage from './page/auth/SignUpWithEmailPage'
import Header from './component/header/Header'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route path="/" exact component={() => <div>Main</div>} />
          <Route path="/sign-in" exact component={SignInPage} />
          <Route path="/sign-in/email" component={SignInWithEmailPage} />
          <Route path="/sign-up/email" component={SignUpWithEmailPage} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
