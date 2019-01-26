import * as React from 'react';
import './navbar.css';
import { StatisticsModel } from '../../store/reducers/channelReducer';

export interface NavBarProps {
  statistics: StatisticsModel;
}

const NavBar: React.SFC<NavBarProps> = props => {
  const { statistics } = props;
  return (
    <React.Fragment>
      <div className="navbar-container">
        <h5>codeAi</h5>
        <ul>
          <li>
            <div className="search-container">
              <div className="search">
                <i className="fa fa-search grey-text text-lighten-1" />
                <input type="search" placeholder="Enter topics to search" />
                {/* <a className="valign-wrapper">
            <i className="fa fa-times-circle grey-text" />
          </a> */}
              </div>
            </div>
          </li>
          <li className="subs">
            Subscribers{' '}
            <span className="badge z-depth-1">
              {statistics.subscriberCount}
            </span>
            <span style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>
              |
            </span>
          </li>
          <li>
            <i style={{ color: '#FF0000' }} className="fab fa-youtube fa-2x" />
          </li>
        </ul>
      </div>
      <div className="divider" />
    </React.Fragment>
  );
};

export default NavBar;
