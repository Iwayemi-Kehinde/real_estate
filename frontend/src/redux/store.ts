import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // default to localStorage for web
import { persistStore, persistReducer } from 'redux-persist';
import userReducer from './user/userSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // only persist user, not loading or error
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

export const persistor = persistStore(store);
export default store;
