import channel, { ChannelReduxModel } from './channel';
import video, { VideoReduxModel } from './video';
import article, { ArticleReduxModel } from './article';

export interface StoreModel {
  channel: ChannelReduxModel;
  video: VideoReduxModel;
  firestore?: any;
  article: ArticleReduxModel;
}

const model: StoreModel = {
  channel,
  video,
  article
};

export default model;
