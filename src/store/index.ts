import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import eventsReducer from './slices/events.slice';
import playerReducer from './slices/player.slice';
import timestampReducer from './slices/timestamps.slice';
import timestampSaga from './sagas/timestampsSaga';

function* rootSaga() {
  yield all([timestampSaga()]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    eventsReducer,
    playerReducer,
    timestampReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
