import * as d3 from 'd3';
import { d3Config } from 'utils/d3-config';

const quadrants = [
  { radial_min: 0, radial_max: 0.5, factor_x: 1, factor_y: 1 },
  { radial_min: 0.5, radial_max: 1, factor_x: -1, factor_y: 1 },
  { radial_min: -1, radial_max: -0.5, factor_x: -1, factor_y: -1 },
  { radial_min: -0.5, radial_max: 0, factor_x: 1, factor_y: -1 },
];
const rings = [
  { radius: 130 },
  { radius: 220 },
  { radius: 310 },
  { radius: 400 },
];

let seed = 42;
const NUMBER_OF_RINGS = 4;
const AXIS_STROKE_WIDTH = 16;

const random = () => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};
const random_between = (min: number, max: number): number =>
  min + random() * (max - min);

const normal_between = (min: number, max: number): number =>
  min + (random() + random()) * 0.5 * (max - min);

const polar = ({ x, y }: Point): Polar => ({
  t: Math.atan2(y, x),
  r: Math.sqrt(x * x + y * y),
});

const cartesian = ({ r, t }: Polar): Point => ({
  x: r * Math.cos(t),
  y: r * Math.sin(t),
});

const bounded_interval = (value: number, min: number, max: number): number => {
  const low = Math.min(min, max);
  const high = Math.max(min, max);
  return Math.min(Math.max(value, low), high);
};

const bounded_ring = (
  { t, r }: Polar,
  r_min: number,
  r_max: number,
): Polar => ({
  t: t,
  r: bounded_interval(r, r_min, r_max),
});

const bounded_box = (point: Point, min: Point, max: Point): Point => ({
  x: bounded_interval(point.x, min.x, max.x),
  y: bounded_interval(point.y, min.y, max.y),
});

const segment = (quadrant: number, ring: number) => {
  const polar_min = {
    t: quadrants[quadrant].radial_min * Math.PI,
    r: ring === 0 ? 30 : rings[ring - 1].radius,
  };
  const polar_max = {
    t: quadrants[quadrant].radial_max * Math.PI,
    r: rings[ring].radius,
  };
  const cartesian_min = {
    x: 20 * quadrants[quadrant].factor_x,
    y: 25 * quadrants[quadrant].factor_y,
  };
  const cartesian_max = {
    x: rings[3].radius * quadrants[quadrant].factor_x,
    y: rings[3].radius * quadrants[quadrant].factor_y,
  };
  return {
    clipx(d: Point) {
      const c = bounded_box(d, cartesian_min, cartesian_max);
      const p = bounded_ring(polar(c), polar_min.r + 15, polar_max.r - 15);
      d.x = cartesian(p).x; // adjust data too!
      return d.x;
    },
    clipy(d: Point) {
      const c = bounded_box(d, cartesian_min, cartesian_max);
      const p = bounded_ring(polar(c), polar_min.r + 15, polar_max.r - 15);
      d.y = cartesian(p).y; // adjust data too!
      return d.y;
    },
    random() {
      return cartesian({
        t: random_between(polar_min.t, polar_max.t),
        r: normal_between(polar_min.r, polar_max.r),
      });
    },
  };
};

const translate = (x: number, y: number) => `translate(${x},${y})`;

const viewbox = (quadrant: number, maxRadius: number) => [
  Math.max(0, quadrants[quadrant].factor_x * maxRadius) -
    maxRadius -
    AXIS_STROKE_WIDTH / 2,
  Math.max(0, quadrants[quadrant].factor_y * maxRadius) -
    maxRadius -
    AXIS_STROKE_WIDTH / 2,
  maxRadius + AXIS_STROKE_WIDTH,
  maxRadius + AXIS_STROKE_WIDTH,
];

export const showBubble = (technology: Technology) => {
  const tooltip = d3
    .select<SVGTextElement, SVGTextElement>('#bubble text')
    .text(technology.name)
    .node();
  if (tooltip) {
    const bbox = tooltip.getBBox?.() || { width: 0, height: 0 }; // default value for testing env
    d3.select('#bubble')
      .attr(
        'transform',
        translate(technology.x! - bbox.width / 2, technology.y! - 16),
      )
      .style('opacity', 1);
    d3.select('#bubble rect')
      .attr('x', -5)
      .attr('y', -bbox.height + 1)
      .attr('width', bbox.width + 10)
      .attr('height', bbox.height + 6);
    d3.select('#bubble path').attr(
      'transform',
      translate(bbox.width / 2 - 5, 3),
    );
  }
};

export const hideBubble = () => {
  d3.select('#bubble')
    .attr('transform', translate(0, 0))
    .style('opacity', 0);
};

const sortTechnologyByName = (a: Technology, b: Technology) =>
  a.name.localeCompare(b.name);

const getHoverPolygons = (maxRadius: number) => [
  [
    { x: 0, y: maxRadius - AXIS_STROKE_WIDTH / 2 },
    { x: 0, y: 0 },
    { x: maxRadius - AXIS_STROKE_WIDTH / 2, y: 0 },
    {
      x: maxRadius - AXIS_STROKE_WIDTH / 2,
      y: maxRadius - AXIS_STROKE_WIDTH / 2,
    },
  ],
  [
    {
      x: maxRadius + AXIS_STROKE_WIDTH / 2,
      y: maxRadius - AXIS_STROKE_WIDTH / 2,
    },
    { x: maxRadius + AXIS_STROKE_WIDTH / 2, y: 0 },
    { x: maxRadius * 2, y: 0 },
    { x: maxRadius * 2, y: maxRadius - AXIS_STROKE_WIDTH / 2 },
  ],
  [
    { x: maxRadius + AXIS_STROKE_WIDTH / 2, y: maxRadius * 2 },
    {
      x: maxRadius + AXIS_STROKE_WIDTH / 2,
      y: maxRadius + AXIS_STROKE_WIDTH / 2,
    },
    { x: maxRadius * 2, y: maxRadius + AXIS_STROKE_WIDTH / 2 },
    { x: maxRadius * 2, y: maxRadius * 2 },
  ],
  [
    { x: 0, y: maxRadius * 2 },
    { x: 0, y: maxRadius + AXIS_STROKE_WIDTH / 2 },
    {
      x: maxRadius - AXIS_STROKE_WIDTH / 2,
      y: maxRadius + AXIS_STROKE_WIDTH / 2,
    },
    { x: maxRadius - AXIS_STROKE_WIDTH / 2, y: maxRadius * 2 },
  ],
];

//order of quadrants in config is 2 3 0 1, so rotating twice
const getQuadrantRoute = (quadrant: number) =>
  d3Config.quadrants[(2 + quadrant) % 4].route;

const drawLegend = (radar: any, quadrant: number, maxRadius: number) => {
  removeLegend();
  const [x, y] = viewbox(quadrant, maxRadius).slice(0, 2);
  const [dx, dy] = translateLegend(quadrant);
  const X = x + dx;
  const Y = y + dy;

  const legendContainer = radar.append('g').attr('id', 'radar-legend');

  legendContainer
    .append('path')
    .attr('d', 'M -6,5 6,5 0,-7 z')
    .attr('transform', `translate(${X},${Y})`);

  legendContainer
    .append('text')
    .attr('x', X + 10)
    .attr('y', Y + 3)
    .attr('font-size', '0.6em')
    .text('New or Moved');

  legendContainer
    .append('circle')
    .attr('r', '6')
    .attr('transform', `translate(${X},${Y + 15})`);

  legendContainer
    .append('text')
    .attr('x', X + 10)
    .attr('y', Y + 19)
    .attr('font-size', '0.6em')
    .text('No Change');
};

const removeLegend = () => {
  d3.select('#radar-legend').remove();
};

const translateLegend = (quadrant: number) => {
  const { factor_x, factor_y } = quadrants[quadrant];
  const translationFactor = 260;
  const paddingX = 40;
  const paddingY = 70;
  const dx = factor_x > 0 ? translationFactor + paddingX : paddingX;
  const dy = factor_y > 0 ? translationFactor + paddingY : paddingY;

  return [dx, dy];
};

export interface RadarVisualizationParams {
  quadrantNum?: number;
  isNotMobile: boolean;
}

export const radar_visualization = (
  container: any,
  data: Technology[],
  config: any,
  setHighlighted: (a: string | null) => void,
  setSelected: (a: string | null) => void,
  { quadrantNum: quadrantProp, isNotMobile }: RadarVisualizationParams,
  redirect: (path: string) => void,
) => {
  const maxRadius = rings[rings.length - 1].radius;
  const isFullSize = typeof quadrantProp === 'undefined';
  const ringsNames = Object.keys(config.rings);

  const svg = d3
    .select(container)
    .style('background-color', config.colors.background);

  // partition entries according to segments
  const segmented: Segmented = [...Array(NUMBER_OF_RINGS)].map(() =>
    [...Array(NUMBER_OF_RINGS)].map(() => []),
  );

  // position each entry randomly in its segment
  data.forEach(technology => {
    const quadNum: number = technology.quadrant;
    const ringNum: number = config.rings[technology.ring].num;

    technology.segment = segment(quadNum, ringNum);
    const { x, y } = technology.segment.random();
    technology.x = x;
    technology.y = y;
    technology.color = config.quadrants[quadNum].color;
    segmented[quadNum][ringNum].push(technology);
  });

  // assign unique sequential id to each entry
  let tempId = 1;
  let currentQuadrant = data.length > 0 ? data[0].quadrant : 0;
  const setId = (technology: Technology) => (technology.id = '' + tempId++);

  for (let ring = 0; ring < NUMBER_OF_RINGS; ring++) {
    const entries = segmented[currentQuadrant][ring];
    entries.sort(sortTechnologyByName).forEach(setId);
  }

  const isFirstRender = !svg.html();
  const radar = isFirstRender ? svg.append('g') : svg.select('g');

  if (typeof quadrantProp !== 'undefined') {
    svg
      .transition()
      .duration(500)
      .attr('viewBox', viewbox(quadrantProp, maxRadius).join(' '));

    drawLegend(radar, quadrantProp, maxRadius);
  } else {
    svg.attr('viewBox', `0 0 ${maxRadius * 2} ${maxRadius * 2}`);
    radar.attr('transform', translate(maxRadius, maxRadius));
  }

  const grid = isFirstRender ? radar.append('g') : radar.select('g');

  // background color. Usage `.attr("filter", "url(#solid)")`
  // SOURCE: https://stackoverflow.com/a/31013492/2609980
  const defs = isFirstRender ? grid.append('defs') : grid.select('defs');

  // animate rings
  if (isFirstRender) {
    const filter = defs
      .append('filter')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 1)
      .attr('height', 1)
      .attr('id', 'solid');
    filter.append('feFlood').attr('flood-color', 'rgb(0, 0, 0, 0.8)');
    filter.append('feComposite').attr('in', 'SourceGraphic');

    // draw rings
    for (let ringName of ringsNames.reverse()) {
      grid
        .append('circle')
        .attr('class', 'ring')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 0)
        .style('fill', config.rings[ringName].backgroundColor)
        .style('stroke-width', 1);
    }

    //cover lines for ring names
    grid
      .append('line')
      .attr('x1', -maxRadius)
      .attr('y1', 0)
      .attr('x2', maxRadius)
      .attr('y2', 0)
      .style('stroke', '#fff')
      .style('stroke-width', AXIS_STROKE_WIDTH)
      .style('opacity', 0.3);

    grid
      .append('line')
      .attr('x1', 0)
      .attr('y1', -maxRadius)
      .attr('x2', 0)
      .attr('y2', -AXIS_STROKE_WIDTH / 2)
      .style('stroke', '#fff')
      .style('stroke-width', AXIS_STROKE_WIDTH)
      .style('opacity', 0.3);

    grid
      .append('line')
      .attr('x1', 0)
      .attr('y1', AXIS_STROKE_WIDTH / 2)
      .attr('x2', 0)
      .attr('y2', maxRadius)
      .style('stroke', '#fff')
      .style('stroke-width', AXIS_STROKE_WIDTH)
      .style('opacity', 0.3);

    //ring names displaying
    if (!isFullSize) {
      ringsNames.forEach((ringName, i) => {
        grid
          .append('text')
          .text(ringName)
          .attr('x', rings[i].radius - 62)
          .attr('text-anchor', 'middle')
          .style('fill', '#000')
          .style('transform', 'translateY(4px)')
          .style('font-family', 'Arial, Helvetica')
          .style('font-size', 12)
          .style('font-weight', 'bold')
          .style('pointer-events', 'none')
          .style('user-select', 'none');
        grid
          .append('text')
          .text(ringName)
          .attr('x', -rings[i].radius + 62)
          .attr('text-anchor', 'middle')
          .style('fill', '#000')
          .style('transform', 'translateY(4px)')
          .style('font-family', 'Arial, Helvetica')
          .style('font-size', '12px')
          .style('font-weight', 'bold')
          .style('pointer-events', 'none')
          .style('user-select', 'none');
      });
    } else {
      // in full size draw boxes on top for hover effect
      getHoverPolygons(maxRadius).forEach((p, i) => {
        const polygons = svg
          .append('polygon')
          .attr('data-testid', `quadrant-${i}`)
          .attr('cursor', 'pointer')
          .attr('class', 'quadrant-hover')
          .attr('fill', '#fff')
          .attr('opacity', 0)
          .attr('points', p.map(({ x, y }) => `${x}, ${y}`).join(' '))
          .on('click', function() {
            redirect(getQuadrantRoute(i));
          });

        if (isNotMobile) {
          polygons
            .on('mouseover', function() {
              svg.selectAll('.quadrant-hover').attr('opacity', '0.3');
              this.setAttribute('opacity', '0');
            })
            .on('mouseout', function() {
              svg.selectAll('.quadrant-hover').attr('opacity', '0');
            });
        }
      });
    }

    d3.selectAll('.ring')
      .transition()
      .duration(400)
      .delay(function(d, i) {
        return i * 40;
      }) // <-- delay as a function of i
      .attr('r', function(d, i) {
        return rings[3 - i].radius;
      });
  }

  // // layer for entries
  const rink: d3.Selection<
    SVGGElement,
    unknown,
    null,
    undefined
  > = isFirstRender
    ? radar.append('g').attr('id', 'rink')
    : radar.select('#rink');

  rink.selectAll('.blip').remove();

  if (isFirstRender) {
    // rollover bubble (on top of everything else)
    const bubble = radar
      .append('g')
      .attr('id', 'bubble')
      .attr('data-testid', 'radar-bubble')
      .attr('x', 0)
      .attr('y', 0)
      .style('opacity', 0)
      .style('pointer-events', 'none')
      .style('user-select', 'none');
    bubble
      .append('rect')
      .attr('rx', 4)
      .attr('ry', 4)
      .style('fill', '#333');
    bubble
      .append('text')
      .style('font-family', 'sans-serif')
      .style('font-size', '14px')
      .style('fill', '#fff');
    bubble
      .append('path')
      .attr('d', 'M 0,0 10,0 5,8 z')
      .style('fill', '#333');
  }

  const mouseOverListener = (technology: Technology) => {
    showBubble(technology);
    setHighlighted(technology.name);
  };

  const onClick = (technology: Technology) => {
    setSelected(`?tech=${technology.name}`);
  };

  const mouseOutListener = () => {
    hideBubble();
    setHighlighted(null);
  };

  const setBlips = () => {
    // draw blips on radar
    const blips = rink
      .selectAll('.blip')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'blip')
      .on('mouseover', mouseOverListener)
      .on('mouseout', mouseOutListener)
      .on('click', onClick);

    // configure each blip
    blips.each(function(technology) {
      //
      let blip = d3.select(this);

      blip.attr('data-testid', technology.name);
      blip.style('cursor', 'pointer');

      // blip shape
      if (technology.moved > 0) {
        blip
          .append('path')
          .attr('d', 'M -11,5 11,5 0,-13 z') // triangle pointing up
          .style('fill', technology.color!);
      } else if (technology.moved < 0) {
        blip
          .append('path')
          .attr('d', 'M -11,-5 11,-5 0,13 z') // triangle pointing down
          .style('fill', technology.color!);
      } else {
        blip
          .append('circle')
          .attr('r', isFullSize ? 7 : 9)
          .attr('fill', technology.color!);
      }

      if (!isFullSize) {
        // blip text
        const blip_text = technology.id || '';
        blip
          .append('text')
          .text(blip_text)
          .attr('y', 3)
          .attr('text-anchor', 'middle')
          .style('fill', '#fff')
          .style('font-family', 'Arial, Helvetica')
          .style('font-size', () => (blip_text.length > 2 ? '8px' : '9px'))
          .style('pointer-events', 'none')
          .style('user-select', 'none');
      }
    });

    // make sure that blips stay inside their segment
    const ticked = () =>
      blips.attr('transform', d =>
        translate(d.segment!.clipx(d as Point), d.segment!.clipy(d as Point)),
      );

    // distribute blips, while avoiding collisions
    d3.forceSimulation()
      .nodes(data)
      .velocityDecay(0.19) // magic number (found by experimentation)
      .force(
        'collision',
        d3
          .forceCollide()
          .radius(12)
          .strength(0.85),
      )
      .on('tick', ticked);
  };
  setTimeout(() => {
    setBlips();
  }, 400);
};
