import * as React from 'react';
import VideoContainer from '../Video Container/video-container';
import NavBar from '../Nav Bar/navbar';
import TableOfContents from '../Table of contents/table-of-contents';
import './article.css';
import ArticleContent from '../Article Content/article-content';
import { ScrollSpy } from 'materialize-css';
import { highlightAll } from 'prismjs';
import 'prismjs/components/prism-python.min';
import { useStoreState, useStoreActions } from '../../store';
export interface ArticleProps {
  match: {
    params: {
      id: string;
    };
  };
}

const initScrollspy = () => {
  const scrollspy = document.querySelectorAll('.scrollspy');

  ScrollSpy.init(scrollspy, {
    activeClass: 'scroll-active'
  });
};

const Article: React.FunctionComponent<ArticleProps> = ({ match }) => {
  const { id, title, tableOfContents, contents } = useStoreState(
    state => state.article.article
  );

  const { loading, isArticlePresent } = useStoreState(state => state.article);

  const { fetchArticle, setArticlePresence } = useStoreActions(
    action => action.article
  );

  React.useEffect(() => {
    const urlId = match.params.id;

    if (id !== urlId) {
      fetchArticle(urlId);

      highlightAll();
      initScrollspy();
    }

    return () => {
      // resetting article presence
      setArticlePresence(true);
    };
  }, []);

  if (!isArticlePresent) {
    return (
      <React.Fragment>
        <NavBar />
        <p>No article present</p>
      </React.Fragment>
    );
  }

  return !loading ? (
    <React.Fragment>
      <NavBar />

      <div id="article-container">
        <div>
          {tableOfContents &&
            (tableOfContents.length > 0 ? (
              <TableOfContents tableOfContents={tableOfContents} />
            ) : null)}
        </div>
        <div id="article-contents">
          <h4>{title}</h4>
          <div className="scrollspy article-video" id="video">
            <VideoContainer
              videoId={match.params.id}
              width={800}
              height={450}
            />
          </div>
          {contents && <ArticleContent contents={contents} />}
        </div>
      </div>
    </React.Fragment>
  ) : (
    <p>loading....</p>
  );
};

export default Article;
