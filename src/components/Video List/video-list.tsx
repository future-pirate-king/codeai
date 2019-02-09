import * as React from 'react';
import { VideoModel } from '../../store/reducers/channelReducer';
import './video-list.css';
// @ts-ignore
import TimeAgo from 'timeago-react';
import { Redirect } from 'react-router';

export interface VideoListProps {
  video: VideoModel[];
}

export interface VideoListState {
  redirect: boolean;
  id: String;
}

class VideoList extends React.Component<VideoListProps, VideoListState> {
  state = { redirect: false, id: '' };

  handleClick = (id: String) => {
    this.setState({ redirect: true, id });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect push to={`/videos/${this.state.id}`} />;
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
            {this.props.video &&
              (this.props.video.length > 0
                ? this.props.video.map((video, index) => (
                    <tr
                      style={{ cursor: 'pointer' }}
                      key={video.videoId as string}
                      onClick={() => this.handleClick(video.videoId)}
                    >
                      <td>
                        <div className="video-details">
                          <img
                            width="120"
                            height="80"
                            className="z-depth-2"
                            src={video.thumbnail!.url as string}
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
                              Episode: {this.props.video.length - index}
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
  }
}

const Views = (props: { views: String }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'baseline' }}>
      <i className="fas fa-eye grey-text" />
      <span className="grey-text text-darken-1" style={{ marginLeft: 10 }}>
        {props.views}
      </span>
    </div>
  );
};

const Reactions = (props: { likes: String; disLikes: String }) => {
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
