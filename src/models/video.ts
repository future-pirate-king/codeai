import { Action, Thunk, action, thunk } from 'easy-peasy';
import { YOUTUBE_API_KEY } from '../environment';

export interface VideoModel {
  videoId: string;
  title?: string;
  publishedAt: string;
  thumbnail?: {
    height?: string;
    width?: string;
    url?: string;
  };
  statistics: VideoStatisticsModel;
  loading?: boolean;
}

export interface VideoStatisticsModel {
  likes: string;
  disLikes: string;
  views: string;
}

export interface VideoReduxModel {
  videos: VideoModel[];
  fetchVideos: Thunk<VideoReduxModel, string>;
  getVideos: Action<VideoReduxModel, VideoModel[]>;
}

const video: VideoReduxModel = {
  videos: [],
  fetchVideos: thunk(async (action, playlistId: string) => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&key=${YOUTUBE_API_KEY}&part=snippet&maxResults=10`
    );
    const data = await res.json();
    const playlistItems = data.items;
    const videoList: VideoModel[] = [];

    if (playlistItems) {
      let videoIdList: String = '';
      playlistItems.map((item: any) => {
        videoIdList += item.snippet.resourceId.videoId + ',';
      });

      const r = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoIdList.slice(
          0,
          videoIdList.length - 1
        )}&key=${YOUTUBE_API_KEY}&part=snippet,statistics`
      );
      const d = await r.json();
      const itemList = d.items;

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
      });
      action.getVideos(videoList);
    }
  }),
  getVideos: action((state, payload: VideoModel[]) => {
    state.videos = payload;
  })
};

export default video;
