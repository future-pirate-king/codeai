import { Action, action, thunk, Thunk } from 'easy-peasy';
import { ChannelModel } from '../@types/channel.types';
import { fetchChannel } from '../services/channel.service';

export interface ChannelReduxModel {
  channel: ChannelModel;
  fetchChannel: Thunk<ChannelReduxModel>;
  getChannel: Action<ChannelReduxModel, ChannelModel>;
}

const initialState: ChannelModel = {
  id: '',
  contentDetails: {
    relatedPlaylists: {
      uploads: ''
    }
  },
  statistics: {
    subscriberCount: '',
    videoCount: ''
  },
  loading: true
};

const channel: ChannelReduxModel = {
  channel: initialState,
  fetchChannel: thunk(async action => {
    action.getChannel(await fetchChannel());
  }),
  getChannel: action((state, payload: ChannelModel) => {
    state.channel = { ...payload, loading: false };
  })
};

export default channel;
