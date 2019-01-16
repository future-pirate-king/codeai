import { Dispatch } from 'redux';
import { clientId, channelId } from '../../environment';
import { ChannelModel, VideoModel } from '../reducers/channelReducer';

declare var gapi: any;

const CLIENT_ID = clientId;

const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
];

const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

export enum channelActionTypes {
  GET_CHANNEL_DETAILS,
  GET_VIDEO_DETAILS
}

interface get_Channel_Details {
  type: channelActionTypes.GET_CHANNEL_DETAILS;
  payload: any;
}

interface get_Video_Details {
  type: channelActionTypes.GET_VIDEO_DETAILS;
  payload: VideoModel[];
}

export const getChannelDetails = () => (
  dispatch: Dispatch<get_Channel_Details>
) => {
  handleClientLoad(dispatch);
};

export const getVideoDetails = (playlistId: String) => (
  dispatch: Dispatch<get_Video_Details>
) => {
  const requestOptions = {
    playlistId,
    part: 'snippet',
    maxResults: 10
  };

  const request = gapi.client.youtube.playlistItems.list(requestOptions);
  request.execute((res: any) => {
    const playlistItems = res.result.items;

    if (playlistItems) {
      let videoList: VideoModel[] = [];
      playlistItems.map((item: any) => {
        videoList.push({
          videoId: item.snippet.resourceId.videoId,
          thumbnail: item.snippet.thumbnails.high,
          title: item.snippet.title,
          publishedAt: item.snippet.publishedAt
        });
      });
      dispatch({
        type: channelActionTypes.GET_VIDEO_DETAILS,
        payload: videoList
      });
    } else {
      // Todo
    }
  });
};

const handleClientLoad = (dispatch: Dispatch<get_Channel_Details>) => {
  gapi.load('client:auth2', () => {
    gapi.client
      .init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
      })
      .then(() => {
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
          getChannel(dispatch);
        } else {
          gapi.auth2.getAuthInstance().signIn();
        }
      });
  });
};

const getChannel = (dispatch: Dispatch<get_Channel_Details>) => {
  gapi.client.youtube.channels
    .list({
      part: 'snippet,contentDetails,statistics',
      id: channelId
      // forUsername: 'techguyweb'
    })
    .then((response: any) => {
      const channel: ChannelModel = filterResponse(response);
      dispatch({
        type: channelActionTypes.GET_CHANNEL_DETAILS,
        payload: channel
      });
    });
};

const filterResponse = (response: any): ChannelModel => {
  const channel = response.result.items[0];
  return {
    id: channel.id,
    contentDetails: {
      relatedPlaylists: {
        uploads: channel.contentDetails.relatedPlaylists.uploads
      }
    },
    snippet: {
      description: channel.snippet.description
    },
    statistics: {
      subscriberCount: channel.statistics.subscriberCount,
      videoCount: channel.statistics.videoCount
    }
  };
};
