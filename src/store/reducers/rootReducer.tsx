import { combineReducers, Reducer } from 'redux';
import { ChannelReducer, ChannelModel } from './channelReducer';
import { firestoreReducer } from 'redux-firestore';
import { ArticleReducer, ArticleStateModel } from './articleReducer';

export interface AppState {
  channel: ChannelModel;
  firestore: any;
  article: ArticleStateModel;
}

export const RootReducer: Reducer<AppState, any> = combineReducers({
  channel: ChannelReducer,
  firestore: firestoreReducer,
  article: ArticleReducer
});
