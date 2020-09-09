import { Event } from './types/types';
import art from './assets/img/art.jpg';
import food from './assets/img/food.jpg';
import fashion from './assets/img/fashion.jpg';
import music from './assets/img/music.jpg';
import night from './assets/img/night.jpg';

export const eventsData: Event[] = [
  {
    id: 1,
    type: 'Music',
    desc: ['Joel', 'Macondo'],
    address: ['Le Marais', '75011'],
    month: 'septembre',
    date: ['2017', '09', '25'],
    link: { text: 'www.gaite-lyrique.net', src: 'https://gaite-lyrique.net' },
    imgUrl: music,
    color: '#84a0fb',
    geoCoords: {
      lat: 48.8566,
      lng: 2.3522,
    },
    isOpen: true,
    coords: { x: 285, y: 100 },
    zIndex: 2,
    isFull: false,
    size: {
      width: 264,
      height: 280,
    },
  },
  {
    id: 2,
    type: 'Food',
    desc: ['', ''],
    address: ['Petite Asie', '75013'],
    month: 'novembre',
    date: ['2017', '11', '03'],
    link: { text: 'www.gaite-lyrique.net', src: 'https://gaite-lyrique.net' },
    imgUrl: food,
    color: '#eaea85',
    geoCoords: {
      lat: 48.83,
      lng: 2.3652,
    },
    isOpen: false,
    coords: { x: 585, y: 400 },
    zIndex: 1,
    isFull: false,
    size: {
      width: 264,
      height: 280,
    },
  },
  {
    id: 3,
    type: 'Arts',
    desc: ['', ''],
    address: ['La Chappelle', '75010'],
    month: 'janvier',
    date: ['2018', '01', '07'],
    link: { text: 'www.gaite-lyrique.net', src: 'https://gaite-lyrique.net' },
    imgUrl: art,
    color: '#c492f7',
    geoCoords: {
      lat: 48.88,
      lng: 2.3652,
    },
    isOpen: false,
    coords: { x: 610, y: 90 },
    zIndex: 0,
    isFull: false,
    size: {
      width: 264,
      height: 280,
    },
  },
  {
    id: 4,
    type: 'Mode',
    desc: ['', ''],
    address: ['Palais de Tokyo', '75010'],
    month: 'février',
    date: ['2018', '02', '24'],
    link: { text: 'www.gaite-lyrique.net', src: 'https://gaite-lyrique.net' },
    imgUrl: fashion,
    color: '#e69eb7',
    geoCoords: {
      lat: 48.86,
      lng: 2.28,
    },
    isOpen: false,
    coords: { x: 200, y: 420 },
    zIndex: 0,
    isFull: false,
    size: {
      width: 264,
      height: 280,
    },
  },
  {
    id: 5,
    type: 'Nuit',
    desc: ['', ''],
    address: ['Place de Clichy', '75018'],
    month: 'octobre',
    date: ['2017', '10', '03'],
    link: { text: 'www.gaite-lyrique.net', src: 'https://gaite-lyrique.net' },
    imgUrl: night,
    color: '#c3a2af',
    geoCoords: {
      lat: 48.88,
      lng: 2.32,
    },
    isOpen: false,
    coords: { x: 100, y: 75 },
    zIndex: 0,
    isFull: false,
    size: {
      width: 264,
      height: 280,
    },
  },
];
