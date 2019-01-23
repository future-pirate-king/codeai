import * as React from 'react';
import { VideoModel } from '../../store/reducers/channelReducer';
import './video-list.css';
// @ts-ignore
import TimeAgo from 'timeago-react';
export interface VideoListProps {
  video: VideoModel[];
}

const VideoList: React.SFC<VideoListProps> = props => {
  return (
    <div className="video-list-container">
      <table className="centered highlight">
        <thead>
          <tr>
            {['Title', 'views', 'Published', 'like/dislike'].map(item => (
              <th className="dark-grey" key={item}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.video.length > 0
            ? props.video.map((video, index) => (
                <tr key={video.videoId as string}>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <img
                        width="120"
                        height="80"
                        className="z-depth-2"
                        src={video.thumbnail!.url as string}
                      />
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          marginLeft: 40
                        }}
                      >
                        <span style={{ marginBottom: 10, fontWeight: 500 }}>
                          {video.title}
                        </span>
                        <span className="grey" style={{ fontSize: 14 }}>
                          Episode: {props.video.length - index}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{ display: 'inline-flex', alignItems: 'center' }}
                    >
                      <i
                        style={{ color: 'rgba(0,0,0,0.54)' }}
                        className="fas fa-eye"
                      />
                      <span className="grey" style={{ marginLeft: 10 }}>
                        {video.statistics.views}
                      </span>
                    </div>
                  </td>
                  <td>
                    <TimeAgo
                      className="grey"
                      datetime={new Date(video.publishedAt as string)}
                    />
                  </td>
                  <td>
                    <div
                      style={{ display: 'inline-flex', alignItems: 'center' }}
                    >
                      <i
                        style={{ color: '#2196F3' }}
                        className="far fa-thumbs-up"
                      />
                      <span className="grey" style={{ marginLeft: 10 }}>
                        {video.statistics.likes}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        marginLeft: 10
                      }}
                    >
                      <i
                        style={{ color: '#D50000' }}
                        className="far fa-thumbs-down"
                      />
                      <span className="grey" style={{ marginLeft: 10 }}>
                        {video.statistics.disLikes}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default VideoList;
