import { h, FunctionComponent } from 'preact';
import { Event } from '../../types/types';

import Cross from '../../assets/svg/cross.svg';

import style from './WindowLayout.css';

interface Props {
  event: Event;
  onClose: (eventId: number) => void;
  onGrow: (eventId: number) => void;
  onShrink: (eventId: number) => void;
}

const WindowLayout: FunctionComponent<Props> = ({
  event,
  onClose,
  onGrow,
  onShrink,
}: Props) => {
  const handleOnClose = (e: MouseEvent) => {
    e.preventDefault();
    onClose(event.id);
  };

  const handleOnGrow = (e: MouseEvent) => {
    e.preventDefault();
    onGrow(event.id);
  };

  const handleOnShrink = (e: MouseEvent) => {
    e.preventDefault();
    onShrink(event.id);
  };

  if (event.isFull)
    return (
      <div
        className={`${style.windowLayout} ${style.large}`}
        style={{ background: event.color }}
      >
        <div className={`${style.row} ${style.row20}`}>
          <div className={`${style.cell} ${style.col25} ${style.white}`}>
            <span className={`${style.address}`}>
              {event.address[0]} <br />
              {event.address[1]}
            </span>
          </div>
          <div className={`${style.cell} ${style.col20} ${style.white}`}>
            <div className={`${style.date}`}>
              <span className={`${style.month}`}>
                {event.month.slice(0, 4)}
              </span>
              <br />
              {event.date[2]}._{event.date[1]}
            </div>
          </div>
          <div className={`${style.cell} ${style.col20} ${style.white}`}>
            <div className={`${style.year}`}>{event.date[0]}</div>
          </div>
          <div
            className={`${style.cell} ${style.col35} ${style.textCenter} ${style.clickable}`}
            onClick={handleOnShrink}
          >
            <img className={`${style.exit}`} src={Cross} />
          </div>
        </div>
        <div className={`${style.row} ${style.row65}`}>
          <div className={`${style.cell} ${style.col45} ${style.naked}`}>
            <div className={`${style.row} ${style.row60}`}>
              <div
                className={`${style.cell} ${style.col100} ${style.textCenter}`}
              >
                <h3 className={`${style.eventType}`}>{event.type}</h3>
              </div>
            </div>
            <div className={`${style.row} ${style.row40}`}>
              <div className={`${style.cell} ${style.col100} ${style.white}`}>
                <span className={`${style.desc}`}>
                  {event.desc[0]}
                  <br />
                  {event.desc[1]}
                </span>
              </div>
            </div>
          </div>
          <div className={`${style.cell} ${style.col20} ${style.white}`}></div>
          <div className={`${style.cell} ${style.col35} ${style.white}`}>
            <div
              className={`${style.pic}`}
              style={{
                background: `url("${event.imgUrl}") no-repeat center center/cover`,
              }}
            ></div>
          </div>
        </div>
        <div className={`${style.row} ${style.row15}`}>
          <div className={`${style.cell} ${style.col100} ${style.textCenter}`}>
            <a
              className={`${style.link}`}
              href={event.link.src}
              rel="noreferrer"
              target="_blank"
            >
              {event.link.text}
            </a>
          </div>
        </div>
      </div>
    );

  return (
    <div className={style.windowLayout} style={{ background: event.color }}>
      <div className={`${style.row} ${style.row20}`}>
        <div className={`${style.cell} ${style.col75} ${style.white}`}>
          <span className={`${style.address}`}>
            {event.address[0]} <br />
            {event.address[1]}
          </span>
        </div>
        <div
          className={`${style.cell} ${style.col25} ${style.white} ${style.textCenter} ${style.clickable}`}
          onClick={handleOnClose}
        >
          <img className={`${style.exit}`} src={Cross} />
        </div>
      </div>
      <div className={`${style.row} ${style.row40}`}>
        <div className={`${style.cell} ${style.col100} ${style.textCenter}`}>
          <h3 className={`${style.eventType}`} onClick={handleOnGrow}>
            {event.type}
          </h3>
        </div>
      </div>
      <div className={`${style.row} ${style.row25}`}>
        <div className={`${style.cell} ${style.col60} ${style.white}`}>
          <span className={`${style.month}`}>{event.month}</span>
          <div className={`${style.date}`}>
            {event.date[2]}._{event.date[1]}
          </div>
        </div>
        <div className={`${style.cell} ${style.col40} ${style.white}`}>
          <div className={`${style.year}`}>{event.date[0]}</div>
        </div>
      </div>
      <div className={`${style.row} ${style.row15}`}>
        <div className={`${style.cell} ${style.col100} ${style.textCenter}`}>
          <a
            className={`${style.link}`}
            href={event.link.src}
            rel="noreferrer"
            target="_blank"
          >
            {event.link.text}
          </a>
        </div>
      </div>
    </div>
  );
};

export default WindowLayout;
