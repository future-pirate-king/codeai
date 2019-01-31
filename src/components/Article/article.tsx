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
  ContentsModel,
  ArticleContentsModel
} from '../../store/reducers/articleReducer';
import { getArticle, updateArticle } from '../../store/actions/articleActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
export interface ArticleProps {
  match: {
    params: {
      id: String;
    };
  };
  getArticle(id: String): void;
  updateArticle(article: ArticleContentsModel): void;
  article: ArticleContentsModel;
}

export interface ArticleState {
  type: String;
  body: String;
  mode: String;
  article: ArticleContentsModel;
}

class Article extends React.Component<ArticleProps, ArticleState> {
  state = {
    mode: 'READ',
    type: 'heading',
    body: '',
    article: {
      id: '',
      title: '',
      contents: [] as ContentsModel[],
      tableOfContents: [] as String[]
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
    } else {
      this.setState({ body: value });
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
            contents: [...contents, { heading: body }],
            tableOfContents: [...tableOfContents, body]
          }
        });
        break;

      case 'paragraph':
        this.setState({
          article: { ...article, contents: [...contents, { body }] }
        });
        break;

      case 'note':
        this.setState({
          article: {
            ...article,
            contents: [
              ...contents,
              { highlight: { type: type.toLowerCase(), body } }
            ]
          }
        });
        break;

      case 'code':
        this.setState({
          article: { ...article, contents: [...contents, { code: { body } }] }
        });
        break;

      case 'image':
        break;
    }

    this.setState({ body: '' });
  };

  render() {
    const { type, body } = this.state;
    const { contents, tableOfContents, title } =
      this.state.mode === 'READ' ? this.props.article : this.state.article;

    return (
      <React.Fragment>
        <NavBar />
        <div id="article-container">
          <TableOfContents tableOfContents={tableOfContents} />
          <div id="article-contents">
            <h4>{title}</h4>
            <div className="scrollspy" id="video">
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
              type={type}
              body={body}
              addContent={this.addContent}
              handleChange={this.handleChange}
            />
          ) : null}
          <div
            style={{
              position: 'fixed',
              bottom: 10,
              left: 10,
              padding: '5px 15px',
              borderRadius: 30,
              display: 'flex'
            }}
            className="z-depth-5"
          >
            {this.state.mode === 'READ' ? (
              <button
                className="btn btn-flat"
                onClick={() =>
                  this.setState({
                    mode: 'EDIT',
                    article: {
                      ...this.props.article,
                      id: this.props.match.params.id
                    }
                  })
                }
              >
                Edit
              </button>
            ) : (
              <React.Fragment>
                <button
                  className="btn btn-flat"
                  onClick={() => this.props.updateArticle(this.state.article)}
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
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: ArticleState) => {
  return {
    article: state.article
  };
};

export default compose(
  connect(
    mapStateToProps,
    { getArticle, updateArticle }
  )
)(Article);
