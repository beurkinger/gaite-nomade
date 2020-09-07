import { h, FunctionComponent } from 'preact';
import { Event } from '../../types/types';

import WindowLayout from '../WindowLayout/WindowLayout';

import style from './Window.css';

export const WINDOW_WIDTH_SMALL = 264;
export const WINDOW_HEIGHT_SMALL = 280;

interface Props {
  onClose: (eventId: number) => void;
  onGrow: (eventId: number) => void;
  onShrink: (eventId: number) => void;
  onMouseDown: (eventId: number, e: MouseEvent) => void;
  onMouseUp: (eventId: number, e: MouseEvent) => void;
  event: Event;
}

const Window: FunctionComponent<Props> = ({
  event,
  onClose,
  onGrow,
  onMouseDown,
  onMouseUp,
  onShrink,
}: Props) => {
  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    if (!event.isFull) onMouseDown(event.id, e);
  };

  const handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    if (!event.isFull) onMouseUp(event.id, e);
  };

  return (
    <div
      className={`${style.window} ${event.isFull ? style.full : ''}`}
      style={{
        zIndex: event.zIndex,
        left: event.isFull ? 0 : event.x,
        top: event.isFull ? 0 : event.y,
        width: event.isFull ? '100%' : `${WINDOW_WIDTH_SMALL}px`,
        height: event.isFull ? '100%' : `${WINDOW_HEIGHT_SMALL}px`,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <WindowLayout
        event={event}
        onClose={onClose}
        onGrow={onGrow}
        onShrink={onShrink}
      />
    </div>
  );
};

export default Window;
