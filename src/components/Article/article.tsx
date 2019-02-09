import * as React from 'react';
import VideoContainer from '../Video Container/video-container';
import NavBar from '../Nav Bar/navbar';
import { ScrollSpy } from 'materialize-css';
import TableOfContents from '../Table of contents/table-of-contents';
import { highlightAll } from 'prismjs';
import 'prismjs/components/prism-python.min';
import './article.css';
import FormModal from '../Form Modal/form-modal';
import ArticleContent from '../Article Content/article-content';
import {
  ArticleContentsModel,
  ArticleStateModel
} from '../../store/reducers/articleReducer';
import {
  getArticle,
  updateArticle,
  addImage
} from '../../store/actions/articleActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppState } from '../../store/reducers/rootReducer';
import LoadingSpinner from '../Loading Spinner/loading-spinner';
export interface ArticleProps {
  match: {
    params: {
      id: String;
    };
  };
  getArticle(id: String): void;
  updateArticle(article: ArticleContentsModel): void;
  addImage(article: ArticleContentsModel, file: File): void;
  articleState: ArticleStateModel;
}

export interface ArticleState {
  type: String;
  body: String | File;
  mode: String;
  article: ArticleContentsModel;
}

class Article extends React.Component<ArticleProps, ArticleState> {
  state: ArticleState = {
    mode: 'READ',
    type: 'heading',
    body: '',
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

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'type') {
      this.setState({ type: value });
    } else if (name === 'body') {
      this.setState({ body: value });
    }
    if (name === 'image') {
      const { files } = e.target;
      if (files) {
        this.setState({ body: files[0] });
      }
    }
  };

  addContent = () => {
    const { type, body, article } = this.state;
    const { contents, tableOfContents } = this.state.article;

    switch (type) {
      case 'heading':
        this.setState({
          article: {
            ...article,
            contents: [...contents, { heading: body as string }],
            tableOfContents: [...tableOfContents, body as string]
          }
        });
        break;

      case 'paragraph':
        this.setState({
          article: {
            ...article,
            contents: [...contents, { body: body as string }]
          }
        });
        break;

      case 'note':
        this.setState({
          article: {
            ...article,
            contents: [
              ...contents,
              { highlight: { type: type.toLowerCase(), body: body as string } }
            ]
          }
        });
        break;

      case 'code':
        this.setState({
          article: {
            ...article,
            contents: [...contents, { code: { body: body as string } }]
          }
        });
        break;

      case 'image':
        this.props.addImage(article, body as File);
        this.setState({ mode: 'READ' });
        break;
    }

    this.setState({ body: '' });
  };

  render() {
    const { type, body } = this.state;
    const { contents, tableOfContents, title } =
      this.state.mode === 'READ'
        ? this.props.articleState.article
        : this.state.article;

    return !this.props.articleState.loading ? (
      <React.Fragment>
        <NavBar />
        {this.props.articleState.imgUploadProgress > 0 && (
          <div
            style={{
              position: 'fixed',
              minWidth: 200,
              minHeight: 50,
              bottom: 10,
              left: 10,
              padding: '5px 15px',
              borderRadius: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}
            className="z-depth-5"
          >
            <strong>
              <span className="purple-text">{`${
                this.props.articleState.imgUploadProgress
              }% `}</span>
              Uploaded
            </strong>
          </div>
        )}
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
          {this.state.mode === 'EDIT' ? (
            <FormModal
              type={type as string}
              body={body as string}
              addContent={this.addContent}
              handleChange={this.handleChange}
            />
          ) : null}
          {this.props.articleState.imgUploadProgress === 0 && (
            <div
              style={{
                position: 'fixed',
                minWidth: 200,
                minHeight: 50,
                bottom: 10,
                left: 10,
                padding: '5px 15px',
                borderRadius: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                background: '#ffffff'
              }}
              className="z-depth-5"
            >
              {!this.props.articleState.isUpdating ? (
                this.state.mode === 'READ' ? (
                  <button
                    className="btn btn-flat"
                    onClick={() =>
                      this.setState({
                        mode: 'EDIT',
                        article: {
                          ...this.props.articleState.article,
                          id: this.props.match.params.id
                        }
                      })
                    }
                  >
                    Edit Article
                  </button>
                ) : (
                  <React.Fragment>
                    <button
                      className="btn btn-flat"
                      onClick={() => {
                        this.props.updateArticle(this.state.article);
                        this.setState({ mode: 'READ' });
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-flat"
                      onClick={() => this.setState({ mode: 'READ' })}
                    >
                      Cancel
                    </button>
                  </React.Fragment>
                )
              ) : (
                <React.Fragment>
                  <LoadingSpinner type="Single" size={25} color="#03dac5" />
                  <strong>Updating article...</strong>
                </React.Fragment>
              )}
            </div>
          )}
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
    { getArticle, updateArticle, addImage }
  )
)(Article);
