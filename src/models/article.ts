import { Thunk, Action, thunk, action } from 'easy-peasy';

export interface ArticleModel {
  id: string;
  title: string;
  tableOfContents: string[];
  contents: ContentsModel[];
  loading?: boolean;
}

export interface ContentsModel {
  heading?: string;
  code?: {
    body: string;
  } | null;
  body?: string | '';
  img?: string | null;
  highlight?: {
    type: 'note' | 'danger' | 'warn' | string;
    body: string;
  };
}

export interface ArticleReduxModel {
  article: ArticleModel;
  fetchArticle: Thunk<ArticleReduxModel, string>;
  getArticle: Action<ArticleReduxModel, ArticleModel>;
}

const initialState: ArticleModel = {
  id: '',
  title: '',
  contents: [],
  tableOfContents: [],
  loading: true
};

const article: ArticleReduxModel = {
  article: initialState,
  fetchArticle: thunk(async (action, id, { injections: { getFirestore } }) => {
    const firestore = getFirestore();
    firestore
      .collection('articles')
      .doc(id)
      .onSnapshot((doc: any) => {
        if (doc.exists) {
          action.getArticle(doc.data() as ArticleModel);
        } else {
          console.log('No such article found');
        }
      });
  }),
  getArticle: action((state, article) => {
    state.article = { ...article, loading: false };
  })
};

export default article;
