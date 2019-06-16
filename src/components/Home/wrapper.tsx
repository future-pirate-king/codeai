import * as React from 'react';
import VideoList from '../Video List/video-list';
import VideoContainer from '../Video Container/video-container';
import ChannelNews from '../Channel News/channel-news';
import Footer from '../footer/footer';
import PageLoading from '../Loading Spinner/page-loading';
import { useStoreActions, useStoreState } from '../../store';
import { ChannelModel } from '../../@types/channel.types';

export interface WrapperProps {
  channel: ChannelModel;
}

const Wrapper: React.FunctionComponent<WrapperProps> = ({ channel }) => {
  const fetchVideos = useStoreActions(action => action.video.fetchVideos);
  const videos = useStoreState(state => state.video.videos);

  React.useEffect(() => {
    const playlistId = channel.contentDetails.relatedPlaylists.uploads;
    fetchVideos(playlistId);
  }, []);

  return (
    <React.Fragment>
      {videos &&
        (videos.length > 0 ? (
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
                <div className="mobile-video-cont">
                  <VideoContainer videoId={videos[0].videoId} />
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                  }}
                  className="hide-on-med-and-down"
                >
                  <ChannelNews />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  overflow: 'hidden',
                  padding: '0px 10px',
                  boxSizing: 'border-box'
                }}
              >
                <h5>My Videos</h5>
                <a
                  style={{ background: 'transparent', display: 'none' }}
                  className="btn btn-floating z-depth-0 waves-effect show-searchbar-small"
                >
                  <i className="fa fa-search grey-text text-darken-3" />
                </a>
              </div>
              <VideoList videoList={videos} />
            </div>
            <Footer />
          </React.Fragment>
        ) : (
          <PageLoading nav={false} />
        ))}
    </React.Fragment>
  );
};

export default Wrapper;
