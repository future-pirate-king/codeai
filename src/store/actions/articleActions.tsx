import { Dispatch } from 'redux';
import { ArticleContentsModel } from '../reducers/articleReducer';
import { Thunk, articleActionTypes } from './types';
import { Toast } from 'materialize-css';

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

export const updateArticle: Thunk = (article: ArticleContentsModel) => (
  dispatch: Dispatch<{ type: articleActionTypes; payload?: any }>,
  _,
  { getFirestore }
) => {
  const firestore = getFirestore();
  dispatch({ type: articleActionTypes.ARTICLE_UPDATING });
  firestore
    .collection('articles')
    .doc(article.id as string)
    .update(article)
    .then(() => {
      dispatch({ type: articleActionTypes.UPDATE_ARTICLE });
      new Toast({ html: 'Update Successfull!' });
    })
    .catch(err => console.log(err));
};

export const addImage: Thunk = (article: ArticleContentsModel, file: File) => (
  dispatch: Dispatch<{ type: articleActionTypes; payload?: any }>,
  _,
  { getFirebase, getFirestore }
) => {
  dispatch({ type: articleActionTypes.ARTICLE_UPDATING });

  const firebase = getFirebase();
  const firestore = getFirestore();
  const storageRef = firebase.storage().ref();

  const imageRef = storageRef.child(`images/${article.id}/${file.name}`);

  const uploadTask = imageRef.put(file);

  uploadTask.on(
    'state_changed',
    (snapshot: any) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      dispatch({
        type: articleActionTypes.IMAGE_UPLOAD_STATUS,
        payload: progress.toFixed()
      });
      new Toast({
        html: `Image Upload Started...`
      });
      if (progress.toFixed() === '100') {
        new Toast({
          html: `Image Upload Successfull!`
        });
        dispatch({
          type: articleActionTypes.IMAGE_UPLOAD_STATUS,
          payload: 0
        });
      }
    },
    err => console.log(err),
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        console.log('File available at', downloadURL);

        firestore
          .collection('articles')
          .doc(article.id as string)
          .update({
            ...article,
            contents: [...article.contents, { img: downloadURL }]
          })
          .then(() => {
            dispatch({ type: articleActionTypes.UPDATE_ARTICLE });
            new Toast({ html: 'Update Successfull!' });
          })
          .catch(err => console.log(err));
      });
    }
  );
};
