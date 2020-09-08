export type Event = {
  id: number;
  coords: {
    x: number;
    y: number;
  };
  type: string;
  desc: [string, string];
  address: [string, string];
  month: string;
  date: string[];
  link: {
    src: string;
    text: string;
  };
  imgUrl: string;
  color: string;
  geoCoords: {
    lat: number;
    lng: number;
  };
  isOpen: boolean;
  isFull: boolean;
  size: {
    width: number;
    height: number;
  };
  zIndex: number;
};
