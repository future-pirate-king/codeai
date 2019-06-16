import * as React from 'react';
import './footer.css';

const social = [
  { icon: 'twitter', link: '' },
  { icon: 'instagram', link: '' },
  { icon: 'github', link: '' },
  { icon: 'quora', link: '' }
];

const Footer: React.FunctionComponent<{}> = () => {
  return (
    <div className="footer-container">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
          flexWrap: 'wrap'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <a
            href=""
            style={{
              color: '#e0e0e0',
              textDecoration: 'none',
              fontSize: 24,
              marginBottom: 10
            }}
          >
            <span>
              Visit <i className="fab fa-youtube fa-lg primary" /> channel
            </span>
          </a>
          <ul
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: 200
            }}
          >
            {social.map(val => (
              <li key={val.icon}>
                <a href={val.link}>
                  <i className={`fab fa-${val.icon} primary`} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          className="footer-contact"
        >
          <span style={{ color: '#e0e0e0', marginBottom: 10 }}>Contacts</span>
          <a href="" className="bordered-btn">
            <i className="fas fa-envelope" /> samd948@gmail.com
          </a>
        </div>
        <div className="footer-content">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: 10
            }}
            className="footer-source-code"
          >
            <span style={{ marginRight: 10, color: '#e0e0e0' }}>
              Find the complete project source code at
            </span>
            <a href="" className="bordered-btn">
              GITHUB
            </a>
          </div>
          {['Privacy policy', 'Terms and Condition'].map(val => (
            <a
              key={val}
              style={{ color: '#e0e0e0', textDecoration: 'none', margin: 10 }}
              href=""
            >
              {val}
            </a>
          ))}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          width: '90%',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: 10,
          borderTop: '1px solid #bdbdbd'
        }}
      >
        <span style={{ color: '#bdbdbd', fontSize: 14, fontWeight: 300 }}>
          &copy; 2019 codeAi.io All Rights Reserved
        </span>
      </div>
    </div>
  );
};

export default Footer;
