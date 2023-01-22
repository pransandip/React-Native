import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
import reducer from '../reducer';

// const sagaMiddleware = createSagaMiddleware();

const Store = configureStore({
  reducer,
});

// sagaMiddleware.run(watcherSaga);

export default Store;
