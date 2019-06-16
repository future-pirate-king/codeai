import { createStore, EasyPeasyConfig } from 'easy-peasy';
import { firebase } from '@firebase/app';
import 'firebase/firestore';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import { firebaseConfig } from './environment';
import model from './models';

firebase.initializeApp(firebaseConfig);

const StoreConfig: EasyPeasyConfig = {
  injections: {
    getFirebase,
    getFirestore
  },
  compose: reduxFirestore(firebase)
};

const store = createStore(model, StoreConfig);

export const { useStoreActions, useStoreDispatch, useStoreState } = store;

export default store;
