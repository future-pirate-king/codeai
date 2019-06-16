import * as React from 'react';
import { ContentsModel } from '../../@types/article.types';

export interface ArticleContentProps {
  contents: ContentsModel[];
}

export interface ArticleContentState {}

class ArticleContent extends React.Component<
  ArticleContentProps,
  ArticleContentState
> {
  state = {};

  render() {
    return (
      <React.Fragment>
        {this.props.contents.map((obj, index) => (
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
  }
}

export default ArticleContent;
