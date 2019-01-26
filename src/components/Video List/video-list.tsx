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
          <thead>
            <tr>
              {['Title', 'views', 'Published', 'like/dislike'].map(item => (
                <th className="grey-text text-darken-3" key={item}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.video.length > 0
              ? this.props.video.map((video, index) => (
                  <tr
                    style={{ cursor: 'pointer' }}
                    key={video.videoId as string}
                    onClick={() => this.handleClick(video.videoId)}
                  >
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
                          <span className="grey-text" style={{ fontSize: 14 }}>
                            Episode: {this.props.video.length - index}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        style={{ display: 'inline-flex', alignItems: 'center' }}
                      >
                        <i className="fas fa-eye grey-text" />
                        <span
                          className="grey-text text-darken-1"
                          style={{ marginLeft: 10 }}
                        >
                          {video.statistics.views}
                        </span>
                      </div>
                    </td>
                    <td>
                      <TimeAgo
                        className="grey-text"
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
                        <span className="grey-text" style={{ marginLeft: 10 }}>
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
                        <span className="grey-text" style={{ marginLeft: 10 }}>
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
  }
}

export default VideoList;
