import { Dispatch } from 'redux';
import { channelId, YOUTUBE_API_KEY } from '../../environment';
import { ChannelModel, VideoModel } from '../reducers/channelReducer';

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
  fetch(
    `https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&id=${channelId}&part=contentDetails,statistics`
  )
    .then(res => res.json())
    .then(data => {
      const channel: ChannelModel = filterResponse(data);
      dispatch({
        type: channelActionTypes.GET_CHANNEL_DETAILS,
        payload: channel
      });
    });
};

export const getVideoDetails = (playlistId: String) => (
  dispatch: Dispatch<get_Video_Details>
) => {
  fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&key=${YOUTUBE_API_KEY}&part=snippet&maxResults=10`
  )
    .then(res => res.json())
    .then(data => {
      const playlistItems = data.items;
      let videoList: VideoModel[] = [];

      if (playlistItems) {
        let videoIdList: String = '';
        playlistItems.map((item: any) => {
          videoIdList += item.snippet.resourceId.videoId + ',';
        });

        fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoIdList.slice(
            0,
            videoIdList.length - 1
          )}&key=${YOUTUBE_API_KEY}&part=snippet,statistics`
        )
          .then(res => res.json())
          .then(data => {
            const itemList = data.items;

            itemList.map((item: any) => {
              videoList.push({
                videoId: item.id,
                thumbnail: item.snippet.thumbnails.default,
                title: item.snippet.title,
                publishedAt: item.snippet.publishedAt,
                statistics: {
                  likes: item.statistics.likeCount,
                  disLikes: item.statistics.dislikeCount,
                  views: item.statistics.viewCount
                }
              });

              dispatch({
                type: channelActionTypes.GET_VIDEO_DETAILS,
                payload: videoList
              });
            });
          });
      } else {
        // Todo
      }
    });
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
