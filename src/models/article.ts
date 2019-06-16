import { Thunk, Action, thunk, action } from 'easy-peasy';
import { FirebaseFirestore } from '@firebase/firestore-types';
import { ArticleModel } from '../@types/article.types';

export interface ArticleReduxModel {
  article: ArticleModel;
  isArticlePresent: boolean;
  loading: boolean;
  fetchArticle: Thunk<
    ArticleReduxModel,
    string,
    { getFirestore(): FirebaseFirestore }
  >;
  getArticle: Action<ArticleReduxModel, ArticleModel>;
  setArticlePresence: Action<ArticleReduxModel, boolean>;
  setLoading: Action<ArticleReduxModel, boolean>;
}

const initialState: ArticleModel = {
  id: '',
  title: '',
  contents: [],
  tableOfContents: []
};

const article: ArticleReduxModel = {
  article: initialState,
  isArticlePresent: true,
  loading: true,
  fetchArticle: thunk(
    async (action, id, { getState, injections: { getFirestore } }) => {
      if (!getState().loading) {
        action.setLoading(true);
      }

      const firestore = getFirestore();
      firestore
        .collection('articles')
        .doc(id)
        .onSnapshot(doc => {
          if (doc.exists) {
            action.getArticle(doc.data() as ArticleModel);
          } else {
            action.setArticlePresence(false);
          }

          action.setLoading(false);
        });
    }
  ),
  getArticle: action((state, article) => {
    state.article = article;
  }),
  setArticlePresence: action((state, flag) => {
    state.isArticlePresent = flag;
  }),
  setLoading: action((state, isLoading) => {
    state.loading = isLoading;
  })
};

export default article;
