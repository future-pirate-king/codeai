import { Reducer } from 'redux';
import { articleActionTypes } from '../actions/types';

export interface ArticleContentsModel {
  id: String;
  title: String;
  tableOfContents: String[];
  contents: ContentsModel[];
}

export interface ContentsModel {
  heading?: String;
  code?: {
    body: String;
  } | null;
  body?: String | '';
  img?: String | null;
  highlight?: {
    type: 'note' | 'danger' | 'warn' | String;
    body: String;
  };
}

export interface ArticleStateModel {
  article: ArticleContentsModel;
  loading?: boolean;
  isUpdating?: boolean;
  imgUploadProgress: number;
}

const initialState: ArticleStateModel = {
  article: {
    id: '',
    title: '',
    contents: [],
    tableOfContents: []
  },
  loading: true,
  isUpdating: false,
  imgUploadProgress: 0
};

export const ArticleReducer: Reducer = (
  state: ArticleStateModel = initialState,
  action: any
) => {
  switch (action.type) {
    case articleActionTypes.GET_ARTICLE:
      return {
        ...state,
        article: {
          ...action.payload
        },
        loading: false
      };

    case articleActionTypes.UPDATE_ARTICLE:
      return { ...state, isUpdating: false };

    case articleActionTypes.ARTICLE_UPDATING:
      return { ...state, isUpdating: true };

    case articleActionTypes.IMAGE_UPLOAD_STATUS:
      return { ...state, imgUploadProgress: action.payload };

    default:
      return state;
  }
};
