import { h, FunctionComponent } from 'preact';
import { Event } from '../../types/types';

import WindowLayout from '../WindowLayout/WindowLayout';

import style from './Window.css';

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
        left: event.isFull ? 0 : event.coords.x,
        top: event.isFull ? 0 : event.coords.y,
        width: event.isFull ? '100%' : `${event.size.width}px`,
        height: event.isFull ? '100%' : `${event.size.height}px`,
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
