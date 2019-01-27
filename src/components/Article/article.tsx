import * as React from 'react';
import VideoContainer from '../Video Container/video-container';
import NavBar from '../Nav Bar/navbar';
import { ScrollSpy } from 'materialize-css';
import TableOfContents from '../Table of contents/table-of-contents';
import { highlightAll } from 'prismjs';
import 'prismjs/components/prism-python.min';
import './article.css';
export interface ArticleProps {
  match: {
    params: {
      id: String;
    };
  };
}

export interface ArticleContentsModel {
  title: String;
  tableOfContents: String[];
  contents: ContentsModel[];
}

export interface ContentsModel {
  code?: {
    body: String;
  };
  body?: String | '';
  img?: String | null;
  highlight?: {
    type: 'note' | 'danger' | 'warn';
    body: String;
  };
}

export interface ArticleState {}

const articleContents: ArticleContentsModel = {
  title: 'Create a Dataset using Web scraping',
  tableOfContents: [
    'Introduction',
    'Website to be scraped',
    'Internal Structure of Website',
    'Data storage',
    'Web Scraping Implementation',
    'Conclusion'
  ],
  contents: [
    {
      body:
        "In today's data driven world, data is key for survival of any bussiness. having right data at the right time can be a game changer  .so how can we get this data ? one way is web scraping. Web scraping or Web data extraction is extracting specific data from websites. The extracted data is stored in databases or spreadsheets for analysis.",
      highlight: {
        type: 'note',
        body:
          'Please make sure you have basic knowledge of python before you read this Article.'
      }
    }
  ]
};

class Article extends React.Component<ArticleProps, ArticleState> {
  componentDidMount = () => {
    highlightAll();
    const elems = document.querySelectorAll('.scrollspy');
    ScrollSpy.init(elems, { activeClass: 'scroll-active', scrollOffset: 200 });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div id="article-container">
          <TableOfContents tableOfContents={articleContents.tableOfContents} />
          <div id="article-contents">
            <h4>{articleContents.title}</h4>
            <div className="scrollspy" id="video">
              <VideoContainer
                videoId={this.props.match.params.id}
                width={800}
                height={450}
              />
            </div>
            {articleContents.contents.map((obj, index) => (
              <div
                style={{ width: '100%', padding: 10, boxSizing: 'border-box' }}
                className="scrollspy"
                id={articleContents.tableOfContents[index]
                  .toLowerCase()
                  .split(' ')
                  .join('-')}
              >
                {obj.body && (
                  <React.Fragment>
                    <h4>{articleContents.tableOfContents[index]}</h4>
                    <div className="para">
                      <p>{obj.body}</p>
                    </div>
                  </React.Fragment>
                )}

                {obj.highlight && (
                  <div className={obj.highlight.type as string}>
                    <i className="fas" />
                    <span>{obj.highlight.body}</span>
                  </div>
                )}

                <pre id="code">
                  <code className="language-python">
                    {`
  import numpy as np # import numpy library
  import time
  import sys
  
  # Memory occupied by arrays
  pyArr = range(1000)
  # print('Memory occupied by Python List:', sys.getsizeof(1) * len(pyArr))
  
  npArr = np.arange(1000)
  # print('Memory occupied by NumPy Array:', npArr.size * npArr.itemsize)
  
`}
                  </code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Article;
