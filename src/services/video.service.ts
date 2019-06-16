import { YOUTUBE_API_KEY } from '../environment';
import { fetchData } from './fetch.service';
import { VideoModel } from '../@types/video.types';

export const fetchVideoList = async (playlistId: string) => {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&key=${YOUTUBE_API_KEY}&part=snippet&maxResults=10`;

  const { items } = await fetchData(url);

  if (items) {
    return processAndFetchVideo(items);
  }

  return [] as VideoModel[];
};

const processAndFetchVideo = async (
  playlistItems: any
): Promise<VideoModel[]> => {
  const videoIdList: string = getVideoIdList(playlistItems);

  const videoUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoIdList.slice(
    0,
    videoIdList.length - 1
  )}&key=${YOUTUBE_API_KEY}&part=snippet,statistics`;

  const { items } = await fetchData(videoUrl);

  return mapVideoList(items);
};

const getVideoIdList = (playlistItems: any): string => {
  let videoIdList: string = '';
  playlistItems.map((item: any) => {
    videoIdList += item.snippet.resourceId.videoId + ',';
  });
  return videoIdList;
};

const mapVideoList = (itemList: any): VideoModel[] => {
  const videoList: VideoModel[] = [];

  itemList.forEach((item: any) =>
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
    })
  );

  return videoList;
};
