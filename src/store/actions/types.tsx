import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ArticleContentsModel } from '../reducers/articleReducer';

export enum articleActionTypes {
  GET_ARTICLE,
  UPDATE_ARTICLE,
  ARTICLE_UPDATING,
  IMAGE_UPLOAD_STATUS
}

export type Thunk = ActionCreator<
  ThunkAction<void, RootState, Services, RootAction>
>;

export type Services = {
  getFirebase(): firebase.app.App;
  getFirestore(): firebase.firestore.Firestore;
};

export type RootState = ArticleContentsModel;

export type RootAction = ArticleAction;

export interface ArticleAction {
  type: articleActionTypes;
  payload?: any;
}
