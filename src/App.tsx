import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Article from './components/Article/article';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path={['/', '/home']} component={Home} exact />
          <Route path="/videos/:id" component={Article} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
