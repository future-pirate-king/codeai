import * as React from 'react';
import { ChannelModel } from '../../store/reducers/channelReducer';
import { connect } from 'react-redux';
import { getVideoDetails } from '../../store/actions/channelActions';
import VideoList from '../Video List/video-list';
import Carousel from '../Carousel/carousel';
import ChannelNews from '../Channel News/channel-news';

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
          <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <Carousel video={video} />
              <ChannelNews />
            </div>
            <VideoList video={video} />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { getVideoDetails }
)(Wrapper);
