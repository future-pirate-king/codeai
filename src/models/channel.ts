import { Action, action, thunk, Thunk } from 'easy-peasy';
import { YOUTUBE_API_KEY, channelId } from '../environment';

export interface ChannelModel {
  id: string;
  contentDetails: {
    relatedPlaylists: {
      uploads: string;
    };
  };
  statistics: StatisticsModel;
  loading?: boolean;
}

export interface StatisticsModel {
  subscriberCount: string;
  videoCount: string;
}

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
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&id=${channelId}&part=contentDetails,statistics`
    );
    const data = await response.json();
    action.getChannel(filterResponse(data));
  }),
  getChannel: action((state, payload: ChannelModel) => {
    state.channel = { ...payload, loading: false };
  })
};

const filterResponse = (response: any): ChannelModel => {
  const channel = response.items[0];
  return {
    id: channel.id,
    contentDetails: {
      relatedPlaylists: {
        uploads: channel.contentDetails.relatedPlaylists.uploads
      }
    },
    statistics: {
      subscriberCount: channel.statistics.subscriberCount,
      videoCount: channel.statistics.videoCount
    }
  };
};

export default channel;
