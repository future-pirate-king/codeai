import * as React from 'react';
import './channel-news.css';

export interface ChannelNewsProps {}

const ChannelNews: React.SFC<ChannelNewsProps> = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <div className="news-container">
        <a className="action-btn z-depth-2" style={{ left: -25 }}>
          <i className="fas fa-chevron-left" />
        </a>
        <a className="action-btn z-depth-2" style={{ right: -25 }}>
          <i className="fas fa-chevron-right" />
        </a>
      </div>
    </div>
  );
};

export default ChannelNews;
