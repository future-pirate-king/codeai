import * as React from 'react';
import './home.css';
import Wrapper from './wrapper';
import NavBar from '../Nav Bar/navbar';
import PageLoading from '../Loading Spinner/page-loading';
import { useStoreActions, useStoreState } from '../../store';

const Home: React.FunctionComponent<{}> = () => {
  const fetchChannel = useStoreActions(action => action.channel.fetchChannel);
  const channel = useStoreState(state => state.channel.channel);

  React.useEffect(() => {
    fetchChannel();
  }, []);

  return (
    <React.Fragment>
      {!channel.loading ? (
        <React.Fragment>
          <NavBar statistics={channel.statistics} />
          <Wrapper channel={channel} />
        </React.Fragment>
      ) : (
        <PageLoading nav={true} />
      )}
    </React.Fragment>
  );
};

export default Home;
