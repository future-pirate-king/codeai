import * as React from 'react';
import { ChannelModel } from '../../store/reducers/channelReducer';
import { connect } from 'react-redux';
import { getVideoDetails } from '../../store/actions/channelActions';
import VideoList from '../Video List/video-list';
import VideoContainer from '../Video Container/video-container';
import ChannelNews from '../Channel News/channel-news';
import Footer from '../footer/footer';

export interface WrapperProps {
  channel: ChannelModel;
  getVideoDetails(playlistId: String): void;
}

export interface WrapperState {}

class Wrapper extends React.Component<WrapperProps, WrapperState> {
  state = {};

  componentWillMount = () => {
    const playlistId = this.props.channel.contentDetails.relatedPlaylists
      .uploads;
    this.props.getVideoDetails(playlistId);
  };

  render() {
    const { video } = this.props.channel;
    return (
      <React.Fragment>
        {video && (
          <React.Fragment>
            <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <VideoContainer video={video[0]} />
                <ChannelNews />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  overflow: 'hidden'
                }}
              >
                <h5>My Videos</h5>
              </div>
              <VideoList video={video} />
            </div>
            <Footer />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { getVideoDetails }
)(Wrapper);
