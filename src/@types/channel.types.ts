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
