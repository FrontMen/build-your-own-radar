import * as d3 from 'd3';
import { random_between, polar, cartesian, bounded_interval } from 'utils';

const quadrants = [
  { radial_min: 0, radial_max: 0.5, factor_x: 1, factor_y: 1 },
  { radial_min: 0.5, radial_max: 1, factor_x: -1, factor_y: 1 },
  { radial_min: -1, radial_max: -0.5, factor_x: -1, factor_y: -1 },
  { radial_min: -0.5, radial_max: 0, factor_x: 1, factor_y: -1 },
];
const rings = [
  { radius: 175 },
  { radius: 250 },
  { radius: 325 },
  { radius: 400 },
];
const AXIS_STROKE_WIDTH = 16;
const CIRCLE_SIZE = 170;
const TRIANGLE_SIZE = 150;

const getSymbolSize = (item: Blip) =>
  item.isNew ? TRIANGLE_SIZE : CIRCLE_SIZE;
const getSymbol = (item: Blip) =>
  item.isNew ? d3.symbolTriangle : d3.symbolCircle;

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

export const segment = (quadrant: number, ring: number) => {
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
        r: random_between(polar_min.r, polar_max.r),
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

export const showBubble = (blip: Blip, quadrant: number) => {
  const { factor_x } = quadrants[quadrant];

  const tooltip = d3
    .select<SVGTextElement, SVGTextElement>('#bubble text')
    .text(blip.name)
    .style('font-size', '0.6em')
    .node();
  if (tooltip) {
    const bbox = tooltip.getBBox?.() || { width: 0, height: 0 }; // default value for testing env
    const dx = blip.x < factor_x * 250 ? 5 : bbox.width;

    d3.select('#bubble')
      .attr('transform', translate(blip.x - dx, blip.y - 22))
      .style('opacity', 1);
    d3.select('#bubble rect')
      .attr('x', -5)
      .attr('y', -bbox.height + 1)
      .attr('width', bbox.width + 12)
      .attr('height', bbox.height + 6);
    d3.select('#bubble path').attr('transform', translate(dx - 5, 5));
  }
};

export const hideBubble = () => {
  d3.select('#bubble')
    .attr('transform', translate(0, 0))
    .style('opacity', 0);
};

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

let simulation: d3.Simulation<any, any>;

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
    .attr('transform', translate(X, Y));

  legendContainer
    .append('text')
    .attr('x', X + 10)
    .attr('y', Y + 3)
    .attr('font-size', '0.6em')
    .text('New or Moved');

  legendContainer
    .append('circle')
    .attr('r', '6')
    .attr('transform', translate(X, Y + 15));

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
  data: Blip[],
  changed: Technology[],
  config: any,
  setHighlighted: (a: string | null) => void,
  setSelected: (a: string | null) => void,
  setHoveredQuadrant: (a: number) => void,
  { quadrantNum, isNotMobile }: RadarVisualizationParams,
  redirect: (index: number) => void,
) => {
  const maxRadius = rings[rings.length - 1].radius;
  const isFullSize = typeof quadrantNum === 'undefined';
  const ringsNames = Object.keys(config.rings);

  const svg = d3
    .select(container)
    .style('background-color', config.colors.background);

  if (!data.length) {
    svg.html(null);
    return null;
  }

  const isFirstRender = !svg.html();
  const radar = isFirstRender ? svg.append('g') : svg.select('g');

  if (typeof quadrantNum !== 'undefined') {
    svg
      .transition()
      .duration(500)
      .attr('viewBox', viewbox(quadrantNum, maxRadius).join(' '));

    drawLegend(radar, quadrantNum, maxRadius);
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
    for (let ringName of ringsNames) {
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
        const prevRadius = i > 0 ? rings[i - 1].radius : 0;
        const currentRadius = rings[i].radius;
        const position = prevRadius + (currentRadius - prevRadius) / 2;
        grid
          .append('text')
          .text(ringName)
          .attr('x', position)
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
          .attr('x', position * -1)
          .attr('text-anchor', 'middle')
          .style('fill', '#000')
          .style('transform', 'translateY(4px)')
          .style('font-family', 'Arial, Helvetica')
          .style('font-size', 12)
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
            // Order of quadrants in config is 2 3 0 1, so rotating twice
            redirect((2 + i) % 4);
          });

        if (isNotMobile) {
          polygons
            .on('mouseover', function() {
              svg.selectAll('.quadrant-hover').attr('opacity', '0.3');
              this.setAttribute('opacity', '0');
              setHoveredQuadrant((2 + i) % 4);
            })
            .on('mouseout', function() {
              svg.selectAll('.quadrant-hover').attr('opacity', '0');
              setHoveredQuadrant(-1);
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

  // layer for entries
  const rink: d3.Selection<
    SVGGElement,
    unknown,
    null,
    undefined
  > = isFirstRender
    ? radar.append('g').attr('id', 'rink')
    : radar.select('#rink');

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

  const mouseOverListener = (blip: Blip) => {
    showBubble(blip, quadrantNum!);
    setHighlighted(blip.positionId!);
  };

  const onClick = (blip: Blip) => {
    setSelected(`?tech=${blip.positionId}`);
  };

  const mouseOutListener = () => {
    hideBubble();
    setHighlighted(null);
  };

  // draw blips on radar
  function setBlips() {
    rink
      .selectAll<SVGGElement, Blip>('.blip')
      .data(data, blip => blip.name)
      .join(
        //lib typings are outdated
        //@ts-ignore
        function(enter) {
          enter
            .append('g')
            .attr('class', 'blip')
            .attr('data-testid', d => d.name)
            .style('cursor', 'pointer')
            .on('mouseover', mouseOverListener)
            .on('mouseout', mouseOutListener)
            .on('click', onClick)
            .each(function(blip) {
              const g: d3.Selection<
                SVGGElement,
                Blip,
                null,
                undefined
              > = d3.select(this);
              g.append('path')
                .attr(
                  'd',
                  d3
                    .symbol()
                    .type(getSymbol)
                    .size(getSymbolSize),
                )
                .attr('fill', d => d.color);

              if (!isFullSize) {
                g.append('text')
                  .text(`${blip.id}`)
                  .attr('y', 3)
                  .attr('text-anchor', 'middle')
                  .style('fill', '#fff')
                  .style('font-family', 'Arial, Helvetica')
                  .style('font-size', '8px')
                  .style('pointer-events', 'none')
                  .style('user-select', 'none');
              }
            });

          if (enter.size() > 0) {
            simulation = simulateCollision();
          }
        },
        up => {
          const changedSelection = up.select<SVGGElement>(function(d) {
            return changed.findIndex(({ name }) => name === d.name) >= 0
              ? this
              : ((null as unknown) as SVGGElement);
          });

          if (changedSelection.size() > 0) {
            simulation?.stop();
            changedSelection.select('path').attr(
              'd',
              d3
                .symbol()
                .type(getSymbol)
                .size(getSymbolSize),
            );
            const trans = d3
              .transition()
              .duration(600)
              .on('end', function() {
                if (changedSelection.size() > 0) {
                  simulation = simulateCollision();
                }
              });
            changedSelection
              //lib typings are incorrect
              //@ts-ignore
              .transition(trans)
              .attr('transform', (d: Blip) => translate(d.x, d.y));
          }
          return up.selectAll('g');
        },
        exit => {
          exit
            .transition()
            .duration(600)
            .attr('transform', d => {
              const { factor_x, factor_y } = quadrants[d.quadrant];
              return translate(d.x + factor_x * 400, d.y + factor_y * 400);
            })
            .remove();
        },
      );
    // make sure that blips stay inside their segment
    function ticked() {
      rink
        .selectAll('.blip')
        .attr('transform', d =>
          translate(
            (d as Blip).segment.clipx(d as Point),
            (d as Blip).segment.clipy(d as Point),
          ),
        );
    }

    // distribute blips, while avoiding collisions
    function simulateCollision() {
      return d3
        .forceSimulation()
        .nodes(data)
        .velocityDecay(0.19) // magic number (found by experimentation)
        .force(
          'collision',
          d3
            .forceCollide()
            .radius(12)
            .strength(0.15),
        )
        .on('tick', ticked);
    }
  }
  setBlips();
};
