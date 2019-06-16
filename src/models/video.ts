import { Action, Thunk, action, thunk } from 'easy-peasy';
import { VideoModel } from '../@types/video.types';
import { fetchVideoList } from '../services/video.service';

export interface VideoReduxModel {
  videos: VideoModel[];
  fetchVideos: Thunk<VideoReduxModel, string>;
  getVideos: Action<VideoReduxModel, VideoModel[]>;
}

const video: VideoReduxModel = {
  videos: [],
  fetchVideos: thunk(async (action, playlistId: string) => {
    action.getVideos(await fetchVideoList(playlistId));
  }),
  getVideos: action((state, payload: VideoModel[]) => {
    state.videos = payload;
  })
};

export default video;
