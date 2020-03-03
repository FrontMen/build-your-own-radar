import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';
import { MainContentSlot } from '../shared/PageSlots';


const data = [1,2,3,4]


export const Home: React.FC = () => {

  useEffect(() => {
    const svg = d3.select('#test');
    console.log('---> svg ', svg);

    const rink = svg.append('g').attr('id', 'rink');

    const blips = rink
      .selectAll('.blip')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'blip')

  }, [])


  return (
    <MainContentSlot data-testid="home-title">
      <p>Welcome to the FM Tech Radar! This is for testing purposes, will be replaced with actual content</p>
      <Link to="/details/someId">link to technology details with someId</Link>
      <svg width={400} height={400} id="test"/>
    </MainContentSlot>
  );

}
