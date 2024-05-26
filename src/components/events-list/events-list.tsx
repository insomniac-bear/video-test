import type { FC } from 'react';
import type { IEventsListProps } from './events-list.props';
import styles from './events-list.module.scss';
import { formateTime } from '../../utils/formate-time';
import { useDispatch } from '../../store/hooks';
import { setPlayFrom } from '../../store/slices/player.slice';

export const EventsList: FC<IEventsListProps> = ({ events }) => {
  const dispatch = useDispatch();
  const handleTimestampClick = (timestamp: number) => {
    dispatch(setPlayFrom(timestamp));
  };

  return (
    <ul className={styles.list}>
      {events?.map((event) => (
        <li
          key={event.timestamp}
          className={styles.item}
          onClick={() => handleTimestampClick(event.timestamp)}
        >
          {formateTime(event.timestamp)},
        </li>
      ))}
    </ul>
  );
};
