import * as React from 'react';

export interface ArticleProps {
  match: {
    params: {
      id: String;
    };
  };
}

const Article: React.SFC<ArticleProps> = props => {
  return <p>Article {props.match.params.id}</p>;
};

export default Article;
