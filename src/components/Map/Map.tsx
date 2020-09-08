import { h, FunctionComponent } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import { select, Selection } from 'd3-selection';
import { geoPath, geoMercator, GeoProjection } from 'd3-geo';
import { feature } from 'topojson-client';
// import {mesh as topoMesh} from 'topojson-client';
import { GeometryCollection, Topology } from 'topojson-specification';

import { Event } from '../../types/types';
import parisTopoJson from '../../assets/topojson/paris.topojson';

import style from './Map.css';

export const WINDOW_WIDTH_SMALL = 264;
export const WINDOW_HEIGHT_SMALL = 280;

interface Props {
  events: Event[];
  onOpen: (eventId: number) => void;
}

const Map: FunctionComponent<Props> = ({ events, onOpen }: Props) => {
  const svgEltRef = useRef<SVGSVGElement>(null);
  const mapNodeRef = useRef<SVGSVGElement>(null);
  const iconsNodeRef = useRef<SVGSVGElement>(null);
  const linksNodeRef = useRef<SVGSVGElement>(null);

  const svgSelectionRef = useRef<
    Selection<SVGSVGElement, unknown, null, undefined>
  >(null);
  const mapSelectionRef = useRef<
    Selection<SVGSVGElement, unknown, null, undefined>
  >(null);
  const iconsSelectionRef = useRef<
    Selection<SVGSVGElement, unknown, null, undefined>
  >(null);
  const linksSelectionRef = useRef<
    Selection<SVGSVGElement, unknown, null, undefined>
  >(null);

  const sizeRef = useRef({ height: 0, width: 0 });
  const coordsRef = useRef({ x: 0, y: 0 });
  const geopathRef = useRef(geoPath());
  const projectionRef = useRef<GeoProjection>(null);
  // const scaleRef = useRef(null);

  useEffect(() => {
    svgSelectionRef.current = select(svgEltRef.current);
    mapSelectionRef.current = select(mapNodeRef.current);
    iconsSelectionRef.current = select(iconsNodeRef.current);
    linksSelectionRef.current = select(linksNodeRef.current);

    printElements();

    window.addEventListener('resize', printElements);

    return () => {
      window.removeEventListener('resize', printElements);
    };
  }, []);

  useEffect(() => {
    displayIcons();
    printLinks();
  });

  const printElements = () => {
    const {
      height,
      left: x,
      top: y,
      width,
    } = svgEltRef.current.getBoundingClientRect();
    sizeRef.current = { height, width };
    coordsRef.current = { x, y };
    getMap();
    displayIcons();
    printLinks();
  };

  const getMap = () => {
    // d3json("./build/data/paris.topojson", (topoJSON) => {

    mapSelectionRef.current.selectAll('path').remove();

    // let mesh = topoMesh(topoJSON);

    // this.projection = geoMercator().fitSize([this.width, this.height], mesh);
    // this.geopath.projection(this.projection);

    // mapNodeRef.current.append("path")
    //     .attr("d", this.geopath(mesh))
    //     .attr('class', style.mapPath);

    const geoJSON = feature(
      parisTopoJson as Topology,
      parisTopoJson.objects.collection as GeometryCollection
    );

    projectionRef.current = geoMercator().fitSize(
      [sizeRef.current.width, sizeRef.current.height],
      geoJSON
    );
    geopathRef.current.projection(projectionRef.current);

    mapSelectionRef.current
      .selectAll('path')
      .data(geoJSON.features)
      .enter()
      .append('path')
      .attr('class', style.mapPath)
      .attr('d', geopathRef.current);
    // });
  };

  const displayIcons = () => {
    if (!projectionRef.current) return;

    iconsSelectionRef.current.selectAll('circle').remove();

    const closedEvents = events.filter((event) => event.isOpen === false);

    const circles = iconsSelectionRef.current
      .selectAll('circle')
      .data(closedEvents);
    circles
      .enter()
      .append('circle')
      .attr('cx', (d) => {
        const xy = projectionRef.current([d.lng, d.lat]);
        return xy && xy[0] ? xy[0] : 0;
      })
      .attr('cy', (d) => {
        const xy = projectionRef.current([d.lng, d.lat]);
        return xy && xy[1] ? xy[1] : 0;
      })
      .attr('class', style.mapIcon)
      .style('stroke', (d) => d.color)
      .style('fill', 'transparent')
      // .style('fill', d => d.color)
      .attr('r', 20)
      .on('mouseover', function (d) {
        const icon = select(this);
        icon.attr('r', 23);
        iconsSelectionRef.current
          .append('text')
          .attr('class', style.mapText)
          .attr('text-anchor', 'middle')
          .attr('x', icon.attr('cx'))
          .attr('y', parseInt(icon.attr('cy')) + 52)
          .attr('fill', d.color)
          .text(d.type);
      })
      .on('mouseleave', function () {
        select(this).attr('r', 20);
        iconsSelectionRef.current.selectAll('text').remove();
      })
      .on('click', function (event) {
        onOpen(event.id);
        iconsSelectionRef.current.selectAll('text').remove();
      });
    circles.exit().remove();
  };

  const printLinks = () => {
    if (!projectionRef.current) return;

    const openEvents = events.filter((d) => d.isOpen === true);

    const links = (linksSelectionRef.current
      .selectAll('path')
      .data(openEvents) as unknown) as Selection<
      SVGPathElement,
      Event,
      SVGSVGElement,
      unknown
    >;

    links
      .enter()
      .append('path')
      .attr('class', style.mapLink)
      .merge(links)
      .style('stroke', (d) => d.color)
      .each(function (d) {
        const node = select(this);
        const xy = projectionRef.current([d.lng, d.lat]);
        if (!xy) return;
        const startX = xy[0];
        const startY = xy[1];
        const endX = d.x + WINDOW_WIDTH_SMALL / 2 - coordsRef.current.x;
        const endY = d.y + WINDOW_HEIGHT_SMALL / 2 - coordsRef.current.y;
        node.attr(
          'd',
          () =>
            `M${startX},${startY}C${startX},(${startY} - 150) ${endX},(${startY} - 200) ${endX},${endY}`
        );
      });
    links.exit().remove();

    const dots = (linksSelectionRef.current
      .selectAll('circle')
      .data(events) as unknown) as Selection<
      SVGCircleElement,
      Event,
      SVGSVGElement,
      unknown
    >;

    dots
      .enter()
      .append('circle')
      .attr('class', style.mapDot)
      .merge(dots)
      .style('fill', (d) => d.color)
      .attr('r', 12)
      .attr('cx', (d) => {
        const xy = projectionRef.current([d.lng, d.lat]);
        return xy && xy[0] ? xy[0] : 0;
      })
      .attr('cy', (d) => {
        const xy = projectionRef.current([d.lng, d.lat]);
        return xy && xy[1] ? xy[1] : 0;
      });
    dots.exit().remove();

    const text = (linksSelectionRef.current
      .selectAll('text')
      .data(events) as unknown) as Selection<
      SVGTextElement,
      Event,
      SVGSVGElement,
      unknown
    >;

    text
      .enter()
      .append('text')
      .attr('class', style.mapText)
      .attr('text-anchor', 'middle')
      .merge(text)
      .attr('x', (d) => {
        const xy = projectionRef.current([d.lng, d.lat]);
        return xy && xy[0] ? xy[0] : 0;
      })
      .attr('y', (d) => {
        const xy = projectionRef.current([d.lng, d.lat]);
        return xy && xy[1] ? xy[1] + 44 : 0;
      })
      .attr('fill', (d) => d.color)
      .text((d) => d.type);
    text.exit().remove();
  };

  return (
    <svg className={style.map} ref={svgEltRef}>
      <g ref={mapNodeRef} />
      <g ref={iconsNodeRef} />
      <g ref={linksNodeRef} />
    </svg>
  );
};

export default Map;
