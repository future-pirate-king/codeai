import { combineReducers, Reducer } from 'redux';
import { ChannelReducer, ChannelModel } from './channelReducer';
import { LoginReducer, User } from './loginReducer';
import { firestoreReducer } from 'redux-firestore';
import { ArticleContentsModel, ArticleReducer } from './articleReducer';

export interface AppState {
  channel: ChannelModel;
  login: User;
  firestore: any;
  article: ArticleContentsModel;
}

export const RootReducer: Reducer<AppState, any> = combineReducers({
  channel: ChannelReducer,
  login: LoginReducer,
  firestore: firestoreReducer,
  article: ArticleReducer
});
