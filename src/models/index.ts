import channel, { ChannelReduxModel } from './channel';
import video, { VideoReduxModel } from './video';

export interface StoreModel {
  channel: ChannelReduxModel;
  video: VideoReduxModel;
  firestore?: any;
  article?: any;
}

const model: StoreModel = {
  channel,
  video
};

export default model;
