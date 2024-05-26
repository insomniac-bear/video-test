import { useRef, useEffect, useMemo } from 'react';

import { Canvas } from '../canvas/canvas';
import { getTimestamps } from '../../store/slices/timestamps.slice';
import { useDispatch, useSelector } from '../../store/hooks';
import { getPlayerStatus, getPlayFrom } from '../../store/slices/player.slice';

import type { FC } from 'react';
import styles from './video.module.scss';
import { EventsEngine } from '../../utils/events-engine';
import { addEvents, addRemoved } from '../../store/slices/events.slice';

export const Video: FC = () => {
  const dispatch = useDispatch();
  const timestamps = useSelector(getTimestamps);
  const isPlay = useSelector(getPlayerStatus);
  const playFrom = useSelector(getPlayFrom);

  const activeEvents = useMemo(() => {
    if (timestamps) {
      return new EventsEngine(timestamps);
    }
  }, [timestamps]);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      isPlay ? videoRef.current.play() : videoRef.current.pause();
    }
  }, [isPlay]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = playFrom;
    }
  }, [playFrom]);

  function updateCurrentTimestamp() {
    if (videoRef.current && activeEvents) {
      const countOfAdded = activeEvents.addEvents(videoRef.current.currentTime);
      const countOfRemoved = activeEvents.removeEvent(
        videoRef.current.currentTime
      );

      if (countOfAdded + countOfRemoved > 0) {
        dispatch(addEvents(activeEvents.getActiveEvents()));
      }

      if (countOfRemoved > 0) {
        dispatch(addRemoved(activeEvents.getRemovedEvents()));
        activeEvents.clearRemovedEvents();
      }
    }
  }

  return (
    <div className={styles.videoContainer}>
      <video
        ref={videoRef}
        className={styles.video}
        poster='https://www.htmlgoodies.com/wp-content/uploads/2021/04/poster.jpg'
        onTimeUpdate={updateCurrentTimestamp}
      >
        <source
          src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          type='video/mp4'
        />
      </video>
      <Canvas
        width={videoRef.current?.videoWidth}
        height={videoRef.current?.videoHeight}
      />
    </div>
  );
};
