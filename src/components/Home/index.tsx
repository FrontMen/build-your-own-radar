import React from 'react';
import { Link } from 'react-router-dom';
import { MainContentSlot } from '../shared/PageSlots';
import styled from 'styled-components';
import { MediaQueries } from 'src/Theme/Helpers';
import { ContentTitle } from 'src/components/shared/ContentTitle';
import { d3Config } from 'src/utils/d3-config';
import { Typography } from 'src/Theme/Typography';

const Intro = styled.div`
  margin: auto;
  margin-bottom: ${props => props.theme.space[5]}px;
  max-width: 48em;
`;

const Quads = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr);
  grid-gap: ${props => props.theme.space[4]}px;

  @media ${MediaQueries.tablet} {
    grid-template-columns: repeat(auto-fit, minmax(21em, 1fr));
  }
`;

const Quadrant = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${props => props.theme.space[2]}px;

  @media ${MediaQueries.tablet} {
    width: 100%%;
    margin-bottom: ${props => props.theme.space[4]}px;
  }
`;

const Content = styled.p`
  ${Typography.body}
  margin: 0;
  margin-bottom: ${props => props.theme.space[3]}px;
`;

const StyledLinks = styled(Link)`
  margin-top: auto;
  text-decoration: none;
  font-weight: 700;
  color: ${props => props.theme.pallet.primary};
`;

export const Home: React.FC = () => {
  const QuadNames = d3Config.quadrants.map(quad => quad.name);

  return (
    <MainContentSlot data-testid="home-title">
      <Intro>
        <ContentTitle>Whats this all about?</ContentTitle>
        <Content>
          Consequat incididunt in occaecat reprehenderit culpa elit. Est
          cupidatat ex dolore duis do aliquip magna ullamco anim. Fugiat non eu
          laboris ut ea aute.
        </Content>
      </Intro>
      <Quads>
        <Quadrant>
          <ContentTitle>{QuadNames[0]}</ContentTitle>
          <Content>
            Ex tempor nulla est nostrud non consectetur enim commodo. Elit aute
            ex pariatur commodo aute. Adipisicing eu dolore fugiat culpa
            deserunt id reprehenderit. Reprehenderit eiusmod exercitation labore
            sint enim.
          </Content>
          <StyledLinks to={`/${QuadNames[0]}`}>
            look at {QuadNames[0]}
          </StyledLinks>
        </Quadrant>
        <Quadrant>
          <ContentTitle>{QuadNames[1]}</ContentTitle>
          <Content>
            Consectetur irure ad eu minim occaecat aute nulla officia labore
            labore. Est commodo exercitation cupidatat adipisicing. Exercitation
            consectetur cupidatat occaecat magna ea commodo aliqua nostrud quis
            incididunt in minim excepteur occaecat. Id ea id enim pariatur.
            Exercitation eiusmod Lorem reprehenderit laboris mollit.
          </Content>
          <StyledLinks to={`/${QuadNames[1]}`}>
            look at {QuadNames[1]}
          </StyledLinks>
        </Quadrant>
        <Quadrant>
          <ContentTitle>{QuadNames[2]}</ContentTitle>
          <Content>
            Eu minim mollit laborum in est elit sint ut. Lorem sit aliqua eu eu
            consectetur aute sint. Id eu anim magna commodo sit id do aliquip.
            Ea aliquip culpa eiusmod ea cillum non quis nisi culpa ut in sunt.
            Non consequat elit proident laborum. Amet laboris consectetur mollit
            aliqua quis aliquip tempor et ipsum. Adipisicing qui dolor amet
            cillum cupidatat aute veniam anim sit magna mollit aliqua cupidatat
            et.
          </Content>
          <StyledLinks to={`/${QuadNames[2]}`}>
            look at {QuadNames[2]}
          </StyledLinks>
        </Quadrant>
        <Quadrant>
          <ContentTitle>{d3Config.quadrants[3].name}</ContentTitle>
          <Content>
            Id nisi fugiat occaecat duis nisi enim cupidatat nisi veniam aliquip
            labore. Ut ea esse do incididunt fugiat ex incididunt culpa magna
            incididunt enim sunt elit aliqua. Cupidatat do nulla quis
            reprehenderit non mollit nisi dolor non. Aliqua pariatur amet ea qui
            amet ipsum aliquip sunt magna consequat deserunt. Enim voluptate
            anim Lorem voluptate dolor proident duis cillum laboris aute irure.
          </Content>
          <StyledLinks to={`/${QuadNames[3]}`}>
            look at {QuadNames[3]}
          </StyledLinks>
        </Quadrant>
      </Quads>
    </MainContentSlot>
  );
};
