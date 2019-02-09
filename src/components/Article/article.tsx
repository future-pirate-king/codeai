import * as React from 'react';
import VideoContainer from '../Video Container/video-container';
import NavBar from '../Nav Bar/navbar';
import { ScrollSpy } from 'materialize-css';
import TableOfContents from '../Table of contents/table-of-contents';
import { highlightAll } from 'prismjs';
import 'prismjs/components/prism-python.min';
import './article.css';
import ArticleContent from '../Article Content/article-content';
import {
  ArticleContentsModel,
  ArticleStateModel
} from '../../store/reducers/articleReducer';
import { getArticle } from '../../store/actions/articleActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppState } from '../../store/reducers/rootReducer';
export interface ArticleProps {
  match: {
    params: {
      id: String;
    };
  };
  getArticle(id: String): void;
  articleState: ArticleStateModel;
}

export interface ArticleState {
  article: ArticleContentsModel;
}

class Article extends React.Component<ArticleProps, ArticleState> {
  state: ArticleState = {
    article: {
      id: '',
      title: '',
      contents: [],
      tableOfContents: []
    }
  };

  componentDidMount = () => {
    highlightAll();
    this.initScrollspy();
  };

  componentWillMount = () => {
    const { id } = this.props.match.params;
    this.props.getArticle(id);
  };

  componentDidUpdate = () => {
    highlightAll();
    this.initScrollspy();
  };

  initScrollspy = () => {
    const scrollspy = document.querySelectorAll('.scrollspy');
    ScrollSpy.init(scrollspy, {
      activeClass: 'scroll-active',
      scrollOffset: 200
    });
  };

  render() {
    const {
      contents,
      tableOfContents,
      title
    } = this.props.articleState.article;

    return !this.props.articleState.loading ? (
      <React.Fragment>
        <NavBar />

        <div id="article-container">
          <div className="hide-on-med-and-down">
            <TableOfContents tableOfContents={tableOfContents} />
          </div>
          <div id="article-contents">
            <h4>{title}</h4>
            <div className="scrollspy" id="article-video">
              <VideoContainer
                videoId={this.props.match.params.id}
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
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    articleState: state.article
  };
};

export default compose(
  connect(
    mapStateToProps,
    { getArticle }
  )
)(Article);
