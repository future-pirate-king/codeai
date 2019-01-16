import * as React from 'react';
import { VideoModel } from '../../store/reducers/channelReducer';
import './video-list.css';

export interface VideoListProps {
  video: VideoModel[];
}

const VideoList: React.SFC<VideoListProps> = props => {
  return (
    <div className="video-list-container">
      <ul>
        {props.video.length > 0
          ? props.video.map(video => (
              <li key={video.videoId as string} className="video-list">
                <img
                  width="150"
                  height="100"
                  className="z-depth-2"
                  src={video.thumbnail!.url as string}
                />
                <div className="details">
                  <h5 color="grey">{video.title}</h5>
                  <span>
                    Published on,{' '}
                    {new Date(video.publishedAt as string).toDateString()}
                  </span>
                </div>
                <a>
                  <i
                    style={{ color: '#323545' }}
                    className="fas fa-arrow-right fa-lg"
                  />
                </a>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default VideoList;
