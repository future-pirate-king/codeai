import * as React from 'react';
import './loading.css';

export interface PageLoadingProps {
  nav: boolean;
}

const PageLoading: React.FunctionComponent<PageLoadingProps> = props => {
  return (
    <div className="load-container">
      {props.nav && (
        <nav className="white z-depth-0">
          <span />
          <div>
            <span />
            <i className="fab fa-youtube fa-2x" />
          </div>
        </nav>
      )}
      <main>
        <section />
        <section className="hide-on-med-and-down" />
      </main>
      <div className="video-list-load">
        <ul>
          {[1, 2, 3, 4, 5].map(n => (
            <li key={n}>
              <aside />
              <div>
                <div style={{ width: '80%', height: '20%' }} />
                <div style={{ width: '50%', height: '20%' }} />
                <div style={{ width: '30%', height: '20%' }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PageLoading;
