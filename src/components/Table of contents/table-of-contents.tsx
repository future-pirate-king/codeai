import * as React from 'react';
import './table-of-contents.css';
import { Transition, animated } from 'react-spring/renderprops';

export interface TableOfContentsProps {
  tableOfContents: string[];
}

const socialIcons = [
  { icon: 'twitter', link: '', action: null },
  { icon: 'facebook', link: '', action: null },
  { icon: 'quora', link: '', action: null }
];

const TableOfContents: React.FunctionComponent<TableOfContentsProps> = ({
  tableOfContents
}) => {
  const [showTableOfContents, setShowTableOfContents] = React.useState(false);
  return (
    <Transition
      native
      items={showTableOfContents as any}
      from={{
        right: 0,
        position: 'fixed' as React.CSSProperties,
        zIndex: 1
      }}
      enter={{ right: 170 }}
      leave={{ right: 0 }}
    >
      {show =>
        show &&
        (props => (
          <animated.div style={props}>
            <div id="table-of-contents">
              <ContentBtn
                toggleContent={() =>
                  setShowTableOfContents(!showTableOfContents)
                }
              />
              <h5>Table of contents</h5>
              <ul>
                <li>
                  <a href="#video">Video</a>
                </li>
                {tableOfContents.map(content => (
                  <li key={content as string}>
                    <a
                      className="truncate"
                      href={`#${content
                        .toLowerCase()
                        .split(' ')
                        .join('-')}`}
                    >
                      {content}
                    </a>
                  </li>
                ))}
              </ul>
              <div>
                <strong className="grey-text text-darken-3">Share on:</strong>
                <ul className="share">
                  {socialIcons.map(social => (
                    <li key={social.icon}>
                      <i
                        className={`fab fa-${
                          social.icon
                        } fa-lg grey-text text-darken-3`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </animated.div>
        ))
      }
    </Transition>
  );
};

const ContentBtn = (props: { toggleContent(): void }) => (
  <a
    style={{
      position: 'absolute',
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      borderRadius: '36px 0 0 36px',
      boxShadow: '8px 12px 50px rgba(0, 0, 0, 0.15)',

      padding: '0 10px 0 20px'
    }}
    className="btn btn-flat btn-large white grey lighten-4 waves-effect"
    onClick={props.toggleContent}
  >
    <i className="fas fa-bars grey-text text-darken-3" />
  </a>
);

export default TableOfContents;
