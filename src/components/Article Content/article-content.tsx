import * as React from 'react';

export interface ArticleContentsModel {
  title: String;
  tableOfContents: String[];
  contents?: ContentsModel[];
}

export interface ContentsModel {
  heading?: String;
  code?: {
    body: String;
  } | null;
  body?: String | '';
  img?: String | null;
  highlight?: {
    type: 'note' | 'danger' | 'warn' | String;
    body: String;
  };
}

export interface ArticleContentProps {
  contents: ContentsModel[];
}

const ArticleContent: React.SFC<ArticleContentProps> = props => {
  return (
    <React.Fragment>
      {props.contents.map((obj, index) => (
        <React.Fragment key={index}>
          {obj.heading && (
            <h4
              className="scrollspy"
              id={obj.heading
                .toLowerCase()
                .split(' ')
                .join('-')}
            >
              {obj.heading}
            </h4>
          )}

          {obj.body && (
            <div className="para">
              <p>{obj.body}</p>
            </div>
          )}

          {obj.highlight && (
            <div className={obj.highlight.type as string}>
              <i className="fas" />
              <span>{obj.highlight.body}</span>
            </div>
          )}

          {obj.code && (
            <pre id="code">
              <code className="language-python">{`${obj.code.body}`}</code>
            </pre>
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default ArticleContent;
