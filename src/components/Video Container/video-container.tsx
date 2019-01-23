import * as React from 'react';
import { VideoModel } from '../../store/reducers/channelReducer';
import './video-container.css';

export interface CarouselProps {
  video: VideoModel;
}

const VideoContainer: React.SFC<CarouselProps> = props => {
  return (
    <div className="videoContainer">
      {props.video ? (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${props.video.videoId}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          allowFullScreen
        />
      ) : null}
    </div>
  );
};

export default VideoContainer;
