import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../../store/hooks';
import { togglePlayerStatus } from '../../store/slices/player.slice';
import {
  clearRemoved,
  getActiveEvents,
  getRemovedEvents,
} from '../../store/slices/events.slice';

import type { FC } from 'react';
import type { ICanvasProps } from './canvas.props';
import styles from './canvas.module.scss';

export const Canvas: FC<ICanvasProps> = ({ width, height }) => {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const events = useSelector(getActiveEvents);
  const removedEvents = useSelector(getRemovedEvents);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context && events) {
        if (removedEvents.length > 0) {
          context.fillStyle = 'none';

          for (let i = 0; i < removedEvents.length; i++) {
            context.clearRect(
              removedEvents[i].zone.left - 1,
              removedEvents[i].zone.top - 1,
              removedEvents[i].zone.width + 2,
              removedEvents[i].zone.height + 2
            );
          }
          dispatch(clearRemoved());
        }

        if (events.length > 0) {
          context.fillStyle = 'green';
          for (let i = 0; i < events.length; i++) {
            context.fillRect(
              events[i].zone.left,
              events[i].zone.top,
              events[i].zone.width,
              events[i].zone.height
            );
          }
        }
      }
    }
  }, [events, removedEvents, dispatch]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      onClick={() => dispatch(togglePlayerStatus())}
      width={width}
      height={height}
    ></canvas>
  );
};
