import { Reducer } from 'redux';
import { channelActionTypes } from '../actions/channelActions';

export interface ChannelModel {
  id: String;
  contentDetails: {
    relatedPlaylists: {
      uploads: String;
    };
  };
  statistics: StatisticsModel;
  video?: VideoModel[];
  loading?: boolean;
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
  statistics: VideoStatisticsModel;
  loading?: boolean;
}

export interface VideoStatisticsModel {
  likes: String;
  disLikes: String;
  views: String;
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
  video: [],
  loading: true
};

export const ChannelReducer: Reducer<ChannelModel, any> = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case channelActionTypes.GET_CHANNEL_DETAILS:
      return {
        ...state,
        ...action.payload,
        loading: false
      };

    case channelActionTypes.GET_VIDEO_DETAILS:
      return {
        ...state,
        video: action.payload,
        loading: false
      };
  }
  return state;
};
