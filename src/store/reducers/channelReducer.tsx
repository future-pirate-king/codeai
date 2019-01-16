import { Reducer } from 'redux';
import { channelActionTypes } from '../actions/channelActions';

export interface ChannelModel {
  id: String;
  contentDetails: {
    relatedPlaylists: {
      uploads: String;
    };
  };
  snippet: {
    description: String;
  };
  statistics: StatisticsModel;
  video?: VideoModel[];
}

export interface StatisticsModel {
  subscriberCount: String;
  videoCount: String;
}

export interface VideoModel {
  videoId: String;
  title?: String;
  publishedAt: String;
  thumbnail?: {
    height?: String;
    width?: String;
    url?: String;
  };
}

const initialState: ChannelModel = {
  id: '',
  contentDetails: {
    relatedPlaylists: {
      uploads: ''
    }
  },
  snippet: {
    description: ''
  },
  statistics: {
    subscriberCount: '',
    videoCount: ''
  },
  video: []
};

export const ChannelReducer: Reducer<ChannelModel, any> = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case channelActionTypes.GET_CHANNEL_DETAILS:
      return {
        ...state,
        ...action.payload
      };

    case channelActionTypes.GET_VIDEO_DETAILS:
      return {
        ...state,
        video: action.payload
      };
  }
  return state;
};
