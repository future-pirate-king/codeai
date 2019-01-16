import * as React from 'react';
import './home.css';
import { connect } from 'react-redux';
import { ChannelModel } from '../../store/reducers/channelReducer';
import { getChannelDetails } from '../../store/actions/channelActions';
import Wrapper from './wrapper';
import NavBar from '../Nav Bar/navbar';

class Home extends React.Component<HomeProps, HomeState> {
  componentWillMount = () => {
    this.props.getChannelDetails();
  };

  render() {
    const { channel } = this.props;

    return (
      channel.id && (
        <React.Fragment>
          <NavBar statistics={channel.statistics} />
          <Wrapper channel={channel} />
        </React.Fragment>
      )
    );
  }
}

export interface HomeProps {
  channel: ChannelModel;
  getChannelDetails(): void;
}

export interface HomeState {
  channel: ChannelModel;
}

const mapStateToProps = (state: HomeState) => {
  return {
    channel: state.channel
  };
};

export default connect(
  mapStateToProps,
  { getChannelDetails }
)(Home);
