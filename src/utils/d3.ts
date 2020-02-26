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
const legend_offset = [
  { x: 450, y: 90 },
  { x: -675, y: 90 },
  { x: -675, y: -310 },
  { x: 450, y: -310 },
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
    440,
    440,
  ].join(' ');

const legend_transform = (
  quadrant: number,
  ring: number,
  segmented: Segmented,
  index: number | null = null,
) => {
  const dx = ring < 2 ? 0 : 120;
  let dy = index == null ? -16 : index * 12;
  if (ring % 2 === 1) {
    dy = dy + 36 + segmented[quadrant][ring - 1].length * 12;
  }
  return translate(
    legend_offset[quadrant].x + dx,
    legend_offset[quadrant].y + dy,
  );
};

const showBubble = (technology: Technology) => {
  const tooltip = d3
    .select<SVGTextElement, SVGTextElement>('#bubble text')
    .text(technology.label)
    .node();
  if (tooltip) {
    const bbox = tooltip.getBBox();
    d3.select('#bubble')
      .attr(
        'transform',
        translate(technology.x! - bbox.width / 2, technology.y! - 16),
      )
      .style('opacity', 0.8);
    d3.select('#bubble rect')
      .attr('x', -5)
      .attr('y', -bbox.height)
      .attr('width', bbox.width + 10)
      .attr('height', bbox.height + 4);
    d3.select('#bubble path').attr(
      'transform',
      translate(bbox.width / 2 - 5, 3),
    );
  }
};

const hideBubble = () => {
  d3.select('#bubble')
    .attr('transform', translate(0, 0))
    .style('opacity', 0);
};

const highlightLegendItem = ({ id }: Technology) => {
  const legendItem = document.getElementById('legendItem' + id);
  if (legendItem) {
    legendItem.setAttribute('filter', 'url(#solid)');
    legendItem.setAttribute('fill', 'white');
  }
};

const unhighlightLegendItem = ({ id }: Technology) => {
  const legendItem = document.getElementById('legendItem' + id);
  if (legendItem) {
    legendItem.removeAttribute('filter');
    legendItem.removeAttribute('fill');
  }
};

const mouseOverListner = (technology: Technology) => {
  showBubble(technology);
  highlightLegendItem(technology);
};

const mouseOutListner = (technology: Technology) => {
  hideBubble();
  unhighlightLegendItem(technology);
};

const sortTechnologyByLabel = (a: Technology, b: Technology) =>
  a.label.localeCompare(b.label);

export const radar_visualization = (data: Technology[], config: any) => {
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
    technology.segment = segment(technology.quadrant, technology.ring);
    const { x, y } = technology.segment.random();
    technology.x = x;
    technology.y = y;
    technology.color = config.rings[technology.ring].color;
    segmented[technology.quadrant][technology.ring].push(technology);
  });

  // assign unique sequential id to each entry
  let tempId = 1;
  const setId = (technology: Technology) => (technology.id = '' + tempId++);

  for (let quadrant of [2, 3, 1, 0]) {
    for (let ring = 0; ring < NUMBER_OF_RINGS; ring++) {
      const entries = segmented[quadrant][ring];
      entries.sort(sortTechnologyByLabel).forEach(setId);
    }
  }

  const svg = d3
    .select('#' + config.svg_id)
    .style('background-color', config.colors.background)
    .attr('width', config.width)
    .attr('height', config.height);

  const radar = svg.append('g');
  if ('zoomed_quadrant' in config) {
    svg.attr('viewBox', viewbox(config.zoomed_quadrant));
  } else {
    radar.attr('transform', translate(config.width / 2, config.height / 2));
  }

  const grid = radar.append('g');

  // draw grid lines
  grid
    .append('line')
    .attr('x1', 0)
    .attr('y1', -400)
    .attr('x2', 0)
    .attr('y2', 400)
    .style('stroke', config.colors.grid)
    .style('stroke-width', 1);
  grid
    .append('line')
    .attr('x1', -400)
    .attr('y1', 0)
    .attr('x2', 400)
    .attr('y2', 0)
    .style('stroke', config.colors.grid)
    .style('stroke-width', 1);

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
  for (let i = 0; i < rings.length; i++) {
    grid
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', rings[i].radius)
      .style('fill', 'none')
      .style('stroke', config.colors.grid)
      .style('stroke-width', 1);
    grid
      .append('text')
      .text(config.rings[i].name)
      .attr('y', -rings[i].radius + 62)
      .attr('text-anchor', 'middle')
      .style('fill', '#e5e5e5')
      .style('font-family', 'Arial, Helvetica')
      .style('font-size', 42)
      .style('font-weight', 'bold')
      .style('pointer-events', 'none')
      .style('user-select', 'none');
  }

  // legend
  const legend = radar.append('g');
  for (let quadrant = 0; quadrant < 4; quadrant++) {
    legend
      .append('text')
      .attr(
        'transform',
        translate(legend_offset[quadrant].x, legend_offset[quadrant].y - 45),
      )
      .text(config.quadrants[quadrant].name)
      .style('font-family', 'Arial, Helvetica')
      .style('font-size', '18');
    for (let ring = 0; ring < 4; ring++) {
      legend
        .append('text')
        .attr('transform', legend_transform(quadrant, ring, segmented))
        .text(config.rings[ring].name)
        .style('font-family', 'Arial, Helvetica')
        .style('font-size', '12')
        .style('font-weight', 'bold');
      legend
        .selectAll('.legend' + quadrant + ring)
        .data(segmented[quadrant][ring])
        .enter()
        .append('text')
        .attr('transform', (d, i) =>
          legend_transform(quadrant, ring, segmented, i),
        )
        .attr('class', 'legend' + quadrant + ring)
        .attr('id', ({ id }) => `legendItem${id}`)
        .text(({ id, label }) => `${id}. ${label}`)
        .style('font-family', 'Arial, Helvetica')
        .style('font-size', '11')
        .on('mouseover', mouseOverListner)
        .on('mouseout', mouseOutListner);
    }
  }

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
    .style('font-size', '10px')
    .style('fill', '#fff');
  bubble
    .append('path')
    .attr('d', 'M 0,0 10,0 5,8 z')
    .style('fill', '#333');

  // draw blips on radar
  const blips = rink
    .selectAll('.blip')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'blip')
    .attr('transform', (d, i) =>
      legend_transform(d.quadrant, d.ring, segmented, i),
    )
    .on('mouseover', mouseOverListner)
    .on('mouseout', mouseOutListner);

  // configure each blip
  blips.each(function(technology) {
    //
    let blip = d3.select(this);

    // blip link
    if (technology.active && technology.hasOwnProperty('link')) {
      // blip = blip.append('a').attr('xlink:href', technology.link); ??? why assignment
      blip.append('a').attr('xlink:href', technology.link);
    }

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
      .style('font-size', () => (blip_text.length > 2 ? '8' : '9'))
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
