import * as React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { StatisticsModel } from '../../@types/channel.types';

export interface NavBarProps {
  className?: string;
  statistics?: StatisticsModel;
}

const NavBar: React.FunctionComponent<NavBarProps> = props => {
  const { statistics } = props;
  return (
    <React.Fragment>
      <div id="navbar-container">
        <div className="navbar">
          <h5>codeAi</h5>
          <ul>
            <li>
              <NavLink className="links" to={'/home'} activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="links" to={'/videos'}>
                Videos
              </NavLink>
            </li>
            <li className="hide-searchbar">
              <SearchBar />
            </li>
            <li style={{ display: 'none' }} className="show-searchbar-med">
              <a
                style={{ background: 'transparent' }}
                className="btn btn-floating z-depth-0 waves-effect"
              >
                <i className="fa fa-search grey-text text-darken-2" />
              </a>
            </li>
            {statistics && (
              <li>
                <p className="subs">
                  Subscribers
                  <span className="badge z-depth-1">
                    {statistics.subscriberCount}
                  </span>
                </p>
                <span style={{ display: 'none' }} className="badge show-badge">
                  {statistics.subscriberCount}
                </span>
              </li>
            )}
            <li>
              <span style={{ fontSize: 20, fontWeight: 'bold' }}>|</span>
            </li>
            <li>
              <i
                style={{ color: '#FF0000' }}
                className="fab fa-youtube fa-2x"
              />
            </li>
          </ul>
        </div>
      </div>
      <div id="nav-offset" />
    </React.Fragment>
  );
};

export const SearchBar = () => {
  return (
    <div className="search-container">
      <div className="search">
        <i className="fa fa-search grey-text text-lighten-1" />
        <input type="search" placeholder="Enter topics to search" />
        {/* <a className="valign-wrapper">
            <i className="fa fa-times-circle grey-text" />
          </a> */}
      </div>
    </div>
  );
};

export default NavBar;
