import React from 'react';
import { MainContentSlot } from '../shared/PageSlots';
import { lightTheme } from 'Theme';
import ContentLoader from 'react-content-loader';
import { config } from './homeSkeletonConfig';

export const HomePageSkeleton: React.FC = () => {
  return (
    <MainContentSlot data-testid="home-skeleton">
      <ContentLoader
        speed={1.5}
        width="100%"
        viewBox={`0 0 ${config.containerWidth} 1500`}
        foregroundColor={lightTheme.pallet.white}
        backgroundColor={lightTheme.pallet.light}
        data-testid="details-skeleton"
      >
        <rect
          x={config.titleX}
          y="10"
          rx="4"
          ry="4"
          width={config.titleWidth}
          height="20"
        />
        {[...Array(config.descriptionLinesNumber)].map((_, i) => (
          <rect
            key={i}
            x={config.titleX}
            y={i * 18 + 50}
            rx="4"
            ry="4"
            width={config.getDescriptionLineWidth(i)}
            height="8"
          />
        ))}
        <circle
          cx={config.circleX}
          cy={config.circleY}
          r={config.circleRadius}
        />
        {!!config.quadTitleWidth && (
          <>
            <rect
              x="0"
              y={config.circleY + config.circleRadius + 70}
              rx="4"
              ry="4"
              width={config.quadTitleWidth}
              height="24"
            />
            {[...Array(4)].map((_, i) => (
              <rect
                key={i}
                x="0"
                y={i * 18 + config.circleY + config.circleRadius + 110}
                rx="4"
                ry="4"
                width={config.getDescriptionLineWidth(i)}
                height="8"
              />
            ))}
          </>
        )}
      </ContentLoader>
    </MainContentSlot>
  );
};
