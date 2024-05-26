import { call, put, takeLatest } from 'redux-saga/effects';
import type { TTimestamp } from '../types/timestamp';
import { putTimestamps } from '../slices/timestamps.slice';

const API_PATH = 'https://run.mocky.io/v3/86ba5ad4-c45e-4f3d-9a07-83ce9a345833';

const baseResponseHandler = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const fetchTimestamps = () =>
  fetch(API_PATH, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => baseResponseHandler<TTimestamp>(res));

function* timestampSaga() {
  yield takeLatest('timestamps/fetchTimestamps', getTimestampData);
}

export function* getTimestampData(): Generator {
  const timestamps = yield call(() => fetchTimestamps());
  yield put(putTimestamps(timestamps as TTimestamp[]));
}

export default timestampSaga;
