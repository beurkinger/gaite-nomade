import { h, FunctionComponent } from 'preact';
import { useRef, useState } from 'preact/hooks';

import {eventsData} from '../../example-data';

import style from './App.css';

const App: FunctionComponent = () => {
  const [events, setEvents] = useState(eventsData);
  const selectedIdRef = useRef(-1);
  const mousePositionRef = useRef({ x: -1, y: -1 });

  const handleMove = (e: MouseEvent) => {
    const eventId = selectedIdRef.current;
    const event = events.find(event => event.id === eventId);
    if (!event || event?.isFull) return;

    const x = event.x + (e.screenX - mousePositionRef.current.x);
    const y = event.y + (e.screenY - mousePositionRef.current.y);
    mousePositionRef.current = {x: e.screenX, y:  e.screenY};
    setEvents(events => events.map(event => {
      return event.id === eventId
        ? { ...event, x, y }
        : event;
    }));
  }

  const handleMouseDown = (id: number, e: MouseEvent) => {
    selectedIdRef.current = id;
    mousePositionRef.current = {x: e.screenX, y:  e.screenY};
    setFocus(id);
  }

  const handleMouseUp = () => {
    selectedIdRef.current = -1;
  }

  const handleClose = (id: number) => {
    setEvents(events => events.map(event => {
      return event.id === id
        ? { ...event, isOpen: false }
        : event;
    }));
  }

  const handleGrow = (id: number) => {
    setEvents(events => events.map(event => {
      return event.id === id
        ? { ...event, isFull: true }
        : event;
    }));
  }

  const handleShrink = (id: number) =>{
    setEvents(events => events.map(event => {
      return event.id === id
        ? { ...event, isFull: false }
        : event;
    }));
  }

  const setFocus = (id: number)  => {
    const zIndex = events.find(event => event.id === selectedIdRef.current)?.zIndex;
    const biggestZindex = findBiggestZindex(events);
    if (zIndex ===  undefined || zIndex === biggestZindex) return;

    setEvents(events => events.map(event => {
      return event.id === id
        ? { ...event, zIndex: biggestZindex + 1 }
        : event;
    }));
  }

  const findBiggestZindex = (events: typeof eventsData) => events.reduce((acc, event) => {
    return event.zIndex >= acc ? event.zIndex : acc;
  }, 0);

  const handleOpen = (id: number) => {
    const biggestZindex = findBiggestZindex(events);

    setEvents(events => events.map(event => {
      return event.id === id
        ? { ...event, isOpen: true, zIndex: biggestZindex + 1 }
        : event;
    }));
  }

  return (
    <div className={style.app} onMouseMove={handleMove}>
     <img className={style.logo} src='./build/img/logo.svg' />
      {/* <Windows events={events}
              mouseDownHandler={handleMouseDown}
              mouseUpHandler={handleMouseUp}
              closeHandler={handleClose}
              growHandler={handleGrow}
              shrinkHandler={handleShrink} />
    <Map  events={events} openHandler={handleOpen}/> */}
  </div>
  );
}

export default App;
