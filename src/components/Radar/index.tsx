import React, {  useEffect } from 'react';
import { config } from './config';
import { radar_visualization } from '../../utils/d3';

export interface RadarProps {
  data: Technology[];
}

export const Radar: React.FC<RadarProps> = ({ data }) => {
  useEffect(() => {
    radar_visualization(data, config);
  }, [data]);
  return <svg id={config.svg_id} />;
};
