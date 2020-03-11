import * as d3 from 'd3';

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
    x: 15 * quadrants[quadrant].factor_x,
    y: 15 * quadrants[quadrant].factor_y,
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

const viewbox = (quadrant: number) =>
  [
    Math.max(0, quadrants[quadrant].factor_x * 400) - 420,
    Math.max(0, quadrants[quadrant].factor_y * 400) - 420,
    435,
    435,
  ].join(' ');

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

const getQuadrantMultiplier = (quadrant: number) => {
  switch (quadrant) {
    case 0:
    case 3:
      return [1, -1];
    case 1:
    case 2:
      return [-1, 1];
    default:
      throw new Error('incorrect quadrant, it should be in range from 0 to 3');
  }
};

const getCoverLinePosition = (quadrant: number) => {
  switch (quadrant) {
    case 0:
    case 1:
      return [-400, -10, 400, -10];
    case 2:
    case 3:
      return [-400, 5, 400, 5];
    default:
      throw new Error('incorrect quadrant, it should be in range from 0 to 3');
  }
};

export interface RadarVisualizationParams {
  width: number;
  height: number;
  quadrantNum: number;
}

export const radar_visualization = (
  container: any,
  data: Technology[],
  config: any,
  setHighlighted: (a: string | null) => void,
  setSelected: (a: string | null) => void,
  { width, height, quadrantNum: quadrantProp }: RadarVisualizationParams,
) => {
  const svg = d3
    .select(container)
    .style('background-color', config.colors.background);
  // removed to make the chart responsive
  // .attr('width', width || config.width)
  // .attr('height', height || config.height);

  svg.html('');

  // partition entries according to segments
  const segmented: Segmented = new Array(4);
  for (let quadrant = 0; quadrant < 4; quadrant++) {
    segmented[quadrant] = new Array(4);
    for (let ring = 0; ring < NUMBER_OF_RINGS; ring++) {
      segmented[quadrant][ring] = [];
    }
  }

  // position each entry randomly in its segment
  data.forEach(technology => {
    const quadNum: number = technology.quadrant;

    const ringNum: number = config.rings.findIndex(
      (item: { name: string }) => item.name === technology.ring,
    );

    technology.segment = segment(quadNum, ringNum);
    const { x, y } = technology.segment.random();
    technology.x = x;
    technology.y = y;
    technology.color = config.quadrants[quadNum].color;
    segmented[quadNum][ringNum].push(technology);
  });

  // assign unique sequential id to each entry
  let tempId = 1;
  const setId = (technology: Technology) => (technology.id = '' + tempId++);

  for (let quadrant of [2, 3, 1, 0]) {
    for (let ring = 0; ring < NUMBER_OF_RINGS; ring++) {
      const entries = segmented[quadrant][ring];
      entries.sort(sortTechnologyByName).forEach(setId);
    }
  }

  const radar = svg.append('g');
  if (quadrantProp !== undefined) {
    svg.attr('viewBox', viewbox(quadrantProp));
  } else {
    radar.attr('transform', translate(width / 2, height / 2));
  }

  const grid = radar.append('g');

  // background color. Usage `.attr("filter", "url(#solid)")`
  // SOURCE: https://stackoverflow.com/a/31013492/2609980
  const defs = grid.append('defs');
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
  for (let i = 3; i >= 0; i--) {
    grid
      .append('circle')
      .attr('class', 'ring')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 0)
      .style('fill', config.rings[i].backgroundColor)
      // .style('stroke', config.colors.grid)
      .style('stroke-width', 1);
  }

  //cover line for text
  const coverLinePosition = getCoverLinePosition(quadrantProp);
  grid
    .append('line')
    .attr('x1', coverLinePosition[0])
    .attr('y1', coverLinePosition[1])
    .attr('x2', coverLinePosition[2])
    .attr('y2', coverLinePosition[3])
    .style('stroke', '#fff')
    .style('stroke-width', 20)
    .style('opacity', 0.3);

  const quadrantMultiplier = getQuadrantMultiplier(quadrantProp);
  //ring names displaying
  for (let i = 3; i >= 0; i--) {
    grid
      .append('text')
      .text(config.rings[i].name)
      .attr(
        'x',
        quadrantMultiplier[0] * rings[i].radius + 62 * quadrantMultiplier[1],
      )
      .attr('text-anchor', 'middle')
      .style('fill', '#000')
      .style('transform', `translateY(${quadrantProp > 1 ? 10 : -5}px)`)
      .style('font-family', 'Arial, Helvetica')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('pointer-events', 'none')
      .style('user-select', 'none');
  }

  // animate rings
  d3.selectAll('.ring')
    .transition()
    .duration(400)
    .delay(function(d, i) {
      return i * 40;
    }) // <-- delay as a function of i
    .attr('r', function(d, i) {
      return rings[3 - i].radius;
    });

  // layer for entries
  const rink = radar.append('g').attr('id', 'rink');

  // rollover bubble (on top of everything else)
  const bubble = radar
    .append('g')
    .attr('id', 'bubble')
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

      // blip link
      // if (technology.active && technology.hasOwnProperty('link')) {
      //   blip.append('a').attr('xlink:href', technology.link);
      // }

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
          .attr('r', 9)
          .attr('fill', technology.color!);
      }

      // blip text
      const blip_text = technology.id!.toString();
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
