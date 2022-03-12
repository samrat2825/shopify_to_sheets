import { createStore } from 'redux';
import authReducer from '../Reducers//authReducer';

import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'auth',
  storage: storageSession,
  manualPersist: true,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
