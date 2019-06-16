import * as React from 'react';
import './video-list.css';
// @ts-ignore
import TimeAgo from 'timeago-react';
import { Redirect } from 'react-router';
import { VideoModel } from '../../@types/video.types';

export interface VideoListProps {
  videoList: VideoModel[];
}

const VideoList: React.FunctionComponent<VideoListProps> = ({ videoList }) => {
  const [redirect, setRedirect] = React.useState(false);
  const [id, setId] = React.useState('');

  if (redirect) {
    return <Redirect push to={`/videos/${id}`} />;
  }

  return (
    <div className="video-list-container">
      <table className="centered highlight">
        <thead className="hide-on-med-for-list">
          <tr>
            {['Title', 'views', 'Published', 'like/dislike'].map(item => (
              <th className="grey-text text-darken-3" key={item}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {videoList &&
            (videoList.length > 0
              ? videoList.map((video, index) => (
                  <tr
                    style={{ cursor: 'pointer' }}
                    key={video.videoId as string}
                    onClick={() => {
                      setId(video.videoId);
                      setRedirect(true);
                    }}
                  >
                    <td>
                      <div className="video-details">
                        <img
                          width="120"
                          height="80"
                          className="z-depth-2"
                          src={video.thumbnail!.url}
                        />
                        <div className="content">
                          <span
                            id="video-details-heading"
                            className="truncate"
                            style={{ marginBottom: 10 }}
                          >
                            {video.title}
                          </span>
                          <span
                            className="grey-text"
                            style={{ display: 'inline-flex' }}
                          >
                            Episode: {videoList.length - index}
                            <TimeAgo
                              style={{ display: 'none', marginLeft: 15 }}
                              className="grey-text show-on-med-for-list"
                              datetime={new Date(video.publishedAt as string)}
                            />
                          </span>
                          <div
                            style={{
                              display: 'none',
                              width: 160,
                              marginTop: 8
                            }}
                            className="show-on-med-for-list"
                          >
                            <Views views={video.statistics.views} />
                            <Reactions
                              likes={video.statistics.likes}
                              disLikes={video.statistics.disLikes}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hide-on-med-for-list">
                      <Views views={video.statistics.views} />
                    </td>
                    <td className="hide-on-med-for-list">
                      <TimeAgo
                        className="grey-text"
                        datetime={new Date(video.publishedAt as string)}
                      />
                    </td>
                    <td className="hide-on-med-for-list">
                      <Reactions
                        likes={video.statistics.likes}
                        disLikes={video.statistics.disLikes}
                      />
                    </td>
                  </tr>
                ))
              : null)}
        </tbody>
      </table>
    </div>
  );
};

const Views = (props: { views: string }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'baseline' }}>
      <i className="fas fa-eye grey-text" />
      <span className="grey-text text-darken-1" style={{ marginLeft: 10 }}>
        {props.views}
      </span>
    </div>
  );
};

const Reactions = (props: { likes: string; disLikes: string }) => {
  return (
    <React.Fragment>
      <div style={{ display: 'inline-flex', alignItems: 'baseline' }}>
        <i style={{ color: '#2196F3' }} className="far fa-thumbs-up" />
        <span className="grey-text" style={{ marginLeft: 10 }}>
          {props.likes}
        </span>
      </div>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          marginLeft: 10
        }}
      >
        <i style={{ color: '#D50000' }} className="far fa-thumbs-down" />
        <span className="grey-text" style={{ marginLeft: 10 }}>
          {props.disLikes}
        </span>
      </div>
    </React.Fragment>
  );
};

export default VideoList;
