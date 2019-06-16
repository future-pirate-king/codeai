import * as React from 'react';
import './video-container.css';

export interface CarouselProps {
  videoId: string;
  width?: string | number;
  height?: string | number;
}

const VideoContainer: React.FunctionComponent<CarouselProps> = props => {
  return (
    <div
      style={{
        width: props.width ? props.width : '100%',
        height: props.height ? props.height : 315
      }}
      className="videoContainer"
    >
      {props.videoId ? (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${props.videoId}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          allowFullScreen
        />
      ) : null}
    </div>
  );
};

export default VideoContainer;
