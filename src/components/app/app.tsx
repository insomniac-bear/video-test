import { useEffect } from 'react';
import { Video } from '../video/video';
import { useDispatch, useSelector } from '../../store/hooks';

import { EventsList } from '../events-list/events-list';
import {
  fetchTimestamps,
  getFetchedTimestampStatus,
  getTimestamps,
} from '../../store/slices/timestamps.slice';

import type { FC } from 'react';
import styles from './app.module.scss';

export const App: FC = () => {
  const dispatch = useDispatch();
  const fetchedTimestampStatus = useSelector(getFetchedTimestampStatus);
  const timestamps = useSelector(getTimestamps);

  useEffect(() => {
    if (fetchedTimestampStatus === 'idle') {
      dispatch(fetchTimestamps());
    }
  }, [fetchedTimestampStatus, dispatch]);

  return (
    <main className={styles.main}>
      <Video />
      {fetchedTimestampStatus === 'success' && timestamps !== null && (
        <EventsList events={timestamps} />
      )}
    </main>
  );
};
