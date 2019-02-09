import { Dispatch } from 'redux';
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
    .onSnapshot(doc => {
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
