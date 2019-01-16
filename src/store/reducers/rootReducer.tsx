import { combineReducers, Reducer } from 'redux';
import { ChannelReducer, ChannelModel } from './channelReducer';
import { LoginReducer, User } from './loginReducer';

export interface AppState {
  channel: ChannelModel;
  login: User;
}

export const RootReducer: Reducer<AppState, any> = combineReducers({
  channel: ChannelReducer,
  login: LoginReducer
});
