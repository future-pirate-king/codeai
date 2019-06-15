import { createStore, EasyPeasyConfig } from 'easy-peasy';
import * as firebase from 'firebase';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { firebaseConfig } from './environment';
import model from './models';

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const StoreConfig: EasyPeasyConfig = {
  injections: {
    getFirebase,
    getFirestore
  }
};

const store = createStore(model, StoreConfig);

export const { useStoreActions, useStoreDispatch, useStoreState } = store;

export default store;
