import * as React from 'react';
import './table-of-contents.css';

export interface TableOfContentsProps {
  tableOfContents: String[];
}

const socialIcons = [
  { icon: 'twitter', link: '', action: null },
  { icon: 'facebook', link: '', action: null },
  { icon: 'quora', link: '', action: null }
];

const TableOfContents: React.SFC<TableOfContentsProps> = props => {
  return (
    <div id="table-of-contents">
      <h5>Table of contents</h5>
      <ul>
        <li>
          <a href="#video">Video</a>
        </li>
        {props.tableOfContents.map(content => (
          <li>
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
  );
};

export default TableOfContents;
