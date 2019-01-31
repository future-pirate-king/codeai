import { Dispatch } from 'redux';
import { ArticleContentsModel } from '../reducers/articleReducer';
import { Thunk, articleActionTypes } from './types';

export const getArticle: Thunk = (id: String) => (
  dispatch: Dispatch<{
    type: articleActionTypes;
    payload: any;
  }>,
  _,
  { getFirestore }
) => {
  const firestore = getFirestore();
  firestore
    .collection('articles')
    .doc(id as string)
    .get()
    .then(doc => {
      if (doc.exists) {
        dispatch({
          type: articleActionTypes.GET_ARTICLE,
          payload: doc.data()
        });
      } else {
        console.log('No such article found');
      }
    });
};

export const updateArticle: Thunk = (article: ArticleContentsModel) => (
  dispatch: Dispatch<{ type: articleActionTypes; payload?: any }>,
  _,
  { getFirestore }
) => {
  const firestore = getFirestore();
  firestore
    .collection('articles')
    .doc(article.id as string)
    .update(article)
    .then(() => dispatch({ type: articleActionTypes.UPDATE_ARTICLE }))
    .catch(err => console.log(err));
};
