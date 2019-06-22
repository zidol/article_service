import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={() => <div>Main</div>} />
        <Route path="/sign-in" exact component={() => <div>Sign in</div>} />
        <Route path="/sign-in/email" component={() => <div>Sign in with email</div>} />
        <Route path="/sign-up/email" component={() => <div>Sign up with email</div>} />
      </Switch>
    );
  }
}

export default App;
