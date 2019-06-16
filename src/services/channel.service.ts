import { YOUTUBE_API_KEY, channelId } from '../environment';
import { fetchData } from './fetch.service';
import { ChannelModel } from '../@types/channel.types';

const CHANNEL_URL = `https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&id=${channelId}&part=contentDetails,statistics`;

export const fetchChannel = async (): Promise<ChannelModel> => {
  const channel = await fetchData(CHANNEL_URL);
  return Promise.resolve(filterResponse(channel));
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
