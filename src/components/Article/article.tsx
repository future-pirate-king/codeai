import * as React from 'react';
import VideoContainer from '../Video Container/video-container';
import NavBar from '../Nav Bar/navbar';
import { ScrollSpy } from 'materialize-css';
import TableOfContents from '../Table of contents/table-of-contents';
import { highlightAll } from 'prismjs';
import 'prismjs/components/prism-python.min';
import './article.css';
import FormModal from '../Form Modal/form-modal';
import ArticleContent, {
  ContentsModel
} from '../Article Content/article-content';
export interface ArticleProps {
  match: {
    params: {
      id: String;
    };
  };
}

export interface ArticleState {
  type: String;
  body: String;
  contents: ContentsModel[];
  tableOfContents: String[];
}

class Article extends React.Component<ArticleProps, ArticleState> {
  state = {
    type: 'title',
    body: '',
    contents: [] as ContentsModel[],
    tableOfContents: [] as String[]
  };

  componentDidMount = () => {
    highlightAll();
    this.initScrollspy();
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
    const { type, body, contents, tableOfContents } = this.state;

    switch (type) {
      case 'title':
        this.setState({
          contents: [...contents, { heading: body }],
          tableOfContents: [...tableOfContents, body]
        });
        break;

      case 'paragraph':
        this.setState({ contents: [...contents, { body }] });
        break;

      case 'note':
        this.setState({
          contents: [
            ...contents,
            { highlight: { type: type.toLowerCase(), body } }
          ]
        });
        break;

      case 'code':
        this.setState({ contents: [...contents, { code: { body } }] });
        break;

      case 'image':
        break;
    }

    this.setState({ body: '' });
  };

  render() {
    const { contents, tableOfContents, type, body } = this.state;
    return (
      <React.Fragment>
        <NavBar />
        <div id="article-container">
          <TableOfContents tableOfContents={tableOfContents} />
          <div id="article-contents">
            <h4>Create a dataset using Web Scraping</h4>
            <div className="scrollspy" id="video">
              <VideoContainer
                videoId={this.props.match.params.id}
                width={800}
                height={450}
              />
            </div>
            <ArticleContent contents={contents} />
          </div>
        </div>

        <FormModal
          type={type}
          body={body}
          addContent={this.addContent}
          handleChange={this.handleChange}
        />
      </React.Fragment>
    );
  }
}

export default Article;
