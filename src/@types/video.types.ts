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
