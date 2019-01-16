import * as React from 'react';
import { VideoModel } from '../../store/reducers/channelReducer';
import './carousel.css';

export interface CarouselProps {
  video: VideoModel[];
}

const Carousel: React.SFC<CarouselProps> = props => {
  console.log(props.video);
  return (
    <div className="videoContainer">
      {props.video.length > 0 ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${props.video[0].videoId}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          allowFullScreen
        />
      ) : null}
    </div>
  );
};

export default Carousel;
