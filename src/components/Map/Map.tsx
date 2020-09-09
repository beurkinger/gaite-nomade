import { h, FunctionComponent } from 'preact';
import { useRef, useEffect, useState } from 'preact/hooks';
import { geoPath, geoMercator, GeoProjection } from 'd3-geo';
import { feature } from 'topojson-client';
// import {mesh as topoMesh} from 'topojson-client';
import { FeatureCollection, Geometry } from 'geojson';
import { GeometryCollection, Topology } from 'topojson-specification';

import { Event } from '../../types/types';
import parisTopoJson from '../../assets/topojson/paris.topojson';

import style from './Map.css';

interface Props {
  events: Event[];
  onOpen: (eventId: number) => void;
}

const Map: FunctionComponent<Props> = ({ events, onOpen }: Props) => {
  const svgEltRef = useRef<SVGSVGElement>(null);
  const screenSizeRef = useRef({ height: 0, width: 0 });
  const screenCordsRef = useRef({ x: 0, y: 0 });
  const geopathRef = useRef(geoPath());
  const projectionRef = useRef<GeoProjection>(null);
  const [geoJson, setGeoJson] = useState<FeatureCollection<Geometry> | null>(
    null
  );

  useEffect(() => {
    setMapData();

    window.addEventListener('resize', setMapData);

    return () => {
      window.removeEventListener('resize', setMapData);
    };
  }, []);

  const setMapData = () => {
    const {
      height,
      left: x,
      top: y,
      width,
    } = svgEltRef.current.getBoundingClientRect();
    screenSizeRef.current = { height, width };
    screenCordsRef.current = { x, y };

    const geoJSON = feature(
      parisTopoJson as Topology,
      parisTopoJson.objects.collection as GeometryCollection
    );

    projectionRef.current = geoMercator().fitSize(
      [screenSizeRef.current.width, screenSizeRef.current.height],
      geoJSON
    );
    geopathRef.current.projection(projectionRef.current);

    setGeoJson(geoJSON);
  };

  return (
    <svg className={style.map} ref={svgEltRef}>
      <g>
        {geoJson?.features.map((feature) => (
          <path
            className={style.mapPath}
            key={feature.id}
            d={geopathRef.current(feature) ?? ''}
          />
        ))}
      </g>
      <g>
        {events.map((event) => {
          if (!projectionRef.current) return null;
          const xy = projectionRef.current([
            event.geoCoords.lng,
            event.geoCoords.lat,
          ]) ?? [0, 0];
          return (
            <g key={event.id} onClick={() => onOpen(event.id)}>
              <circle
                className={style.mapIcon}
                cx={xy[0]}
                cy={xy[1]}
                r={20}
                stroke={event.color}
              />
              <circle
                className={style.mapDot}
                cx={xy[0]}
                cy={xy[1]}
                fill={event.color}
                r={10}
              />
              <text
                className={style.mapText}
                x={xy[0]}
                y={xy[1] + 52}
                fill={event.color}
              >
                {event.type}
              </text>
            </g>
          );
        })}
      </g>
      <g>
        {events.map((event) => {
          if (!projectionRef.current || !event.isOpen) return null;
          const xy = projectionRef.current([
            event.geoCoords.lng,
            event.geoCoords.lat,
          ]) ?? [0, 0];
          const endX =
            event.coords.x + event.size.width / 2 - screenCordsRef.current.x;
          const endY =
            event.coords.y + event.size.height / 2 - screenCordsRef.current.y;
          return (
            <path
              className={style.mapLink}
              key={event.id}
              d={`M${xy[0]},${xy[1]}C${xy[0]},${xy[1] - 150} ${endX},${
                xy[1] - 200
              } ${endX},${endY}`}
              stroke={event.color}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default Map;
