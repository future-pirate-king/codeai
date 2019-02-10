import * as React from 'react';
import VideoContainer from '../Video Container/video-container';
import NavBar from '../Nav Bar/navbar';
import TableOfContents from '../Table of contents/table-of-contents';
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
import { ScrollSpy } from 'materialize-css';
import { highlightAll } from 'prismjs';
import 'prismjs/components/prism-python.min';
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

  componentWillMount = () => {
    const { id } = this.props.match.params;
    this.props.getArticle(id);
  };

  componentDidUpdate = () => {
    highlightAll();
    this.initScrollspy();
  };

  componentDidMount = () => {
    highlightAll();
    this.initScrollspy();
  };

  initScrollspy = () => {
    const scrollspy = document.querySelectorAll('.scrollspy');

    ScrollSpy.init(scrollspy, {
      activeClass: 'scroll-active'
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
