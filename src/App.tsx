import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Article from './components/Article/article';
import VideoList from './components/Video List/video-list';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/videos" component={VideoList} exact />
        <Route path="/videos/:id" component={Article} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
