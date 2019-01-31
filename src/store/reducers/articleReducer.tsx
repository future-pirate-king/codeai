import { Reducer } from 'redux';
import { articleActionTypes } from '../actions/types';

export interface ArticleContentsModel {
  id: String;
  title: String;
  tableOfContents: String[];
  contents?: ContentsModel[];
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

const initialState: ArticleContentsModel = {
  id: '',
  title: '',
  contents: [],
  tableOfContents: []
};

export const ArticleReducer: Reducer = (
  state: ArticleContentsModel = initialState,
  action: any
) => {
  switch (action.type) {
    case articleActionTypes.GET_ARTICLE:
      console.log(action.payload);
      return {
        ...state,
        ...action.payload
      };

    case articleActionTypes.UPDATE_ARTICLE:
      console.log('done!');
      return state;

    default:
      return state;
  }
};
