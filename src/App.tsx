import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import { Login } from './components/Login/login';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/home" component={Home} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
