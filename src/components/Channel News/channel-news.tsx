import * as React from 'react';
import './channel-news.css';

export interface ChannelNewsProps {}

const ChannelNews: React.SFC<ChannelNewsProps> = () => {
  return (
    <div className="news-container">
      <a className="action-btn z-depth-2" style={{ left: '-1.5rem' }}>
        <i className="fas fa-chevron-left" />
      </a>
      <a className="action-btn z-depth-2" style={{ right: '-1.5rem' }}>
        <i className="fas fa-chevron-right" />
      </a>
    </div>
  );
};

export default ChannelNews;
