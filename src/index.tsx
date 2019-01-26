import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'materialize-css/dist/css/materialize.min.css';
import { createStore, applyMiddleware, Store } from 'redux';
import { Provider } from 'react-redux';
import { RootReducer, AppState } from './store/reducers/rootReducer';
import thunk from 'redux-thunk';

const store: Store<AppState> = createStore(RootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
