import { createStore } from 'easy-peasy';
import model from './models';

const store = createStore(model);

export const { useStoreActions, useStoreDispatch, useStoreState } = store;

export default store;
