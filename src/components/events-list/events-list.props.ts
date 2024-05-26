import type { HTMLProps } from 'react';
import type { TTimestamp } from '../../store/types/timestamp';

export interface IEventsListProps extends HTMLProps<HTMLUListElement> {
  events: TTimestamp[];
}
