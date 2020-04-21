import { sizes } from 'Theme/Helpers';

const windowWidth = window.innerWidth;

interface Config {
  containerWidth: number;
  titleWidth: number;
  titleX: number;
  circleRadius: number;
  circleY: number;
  circleX: number;
  descriptionLinesNumber: number;
  getDescriptionLineWidth: (i: number) => number;
  quadTitleWidth?: number;
}

const getConfig = (): Config => {
  if (windowWidth >= sizes.desktop) {
    const containerWidth = Math.min(windowWidth - 32, 1200);
    return {
      containerWidth,
      titleWidth: 400,
      titleX: containerWidth / 2 - 400,
      circleRadius: 300,
      circleY: 430,
      circleX: containerWidth / 2,
      descriptionLinesNumber: 2,
      getDescriptionLineWidth: i => 800 - (i % 2) * 100,
    };
  } else if (windowWidth >= sizes.tablet) {
    return {
      containerWidth: windowWidth - 32,
      titleWidth: 350,
      titleX: 0,
      circleRadius: windowWidth / 2 - 90,
      circleY: windowWidth / 2 - 32 + 50,
      circleX: (windowWidth - 32) / 2,
      descriptionLinesNumber: 2,
      getDescriptionLineWidth: i => windowWidth - 32 - (i % 2) * 100,
      quadTitleWidth: windowWidth - 190,
    };
  } else {
    return {
      containerWidth: windowWidth - 32,
      titleWidth: 280,
      titleX: 0,
      circleRadius: windowWidth / 2 - 32,
      circleY: windowWidth / 2 - 32 + 140,
      circleX: (windowWidth - 32) / 2,
      descriptionLinesNumber: 4,
      getDescriptionLineWidth: i => 220 + ((i + 1) % 2) * 30,
    };
  }
};

export const config = getConfig();
