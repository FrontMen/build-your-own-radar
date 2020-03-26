import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    opacity: .3;
  }
  100% {
    opacity: 1;
  }
`;

export const RadarSkeleton = styled.div`
  width: 500px;
  height: 500px;
  margin: 0px auto 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.pallet.light};
  align-self: flex-end;
  animation: ${pulse} 0.65s infinite alternate;
`;

export const TitleSkeleton = styled.div`
  width: 50%;
  height: 20px;
  margin-bottom: 20px;
  background-color: ${props => props.theme.pallet.light};
  border-radius: 7px;
  animation: ${pulse} 0.65s infinite alternate;
`;

export const ContentSkeleton = styled.span`
  display: inline-block;
  width: 75%;
  height: 110px;
  border-radius: 6px;
  background-color: ${props => props.theme.pallet.light};
  animation: ${pulse} 0.65s infinite alternate;
`;

export const NavSkeleton = styled.div`
  width: 100%;
  height: 100px;
  margin-bottom: 50px;
  border-radius: 6px;
  background-color: ${props => props.theme.pallet.light};
  animation: ${pulse} 0.65s infinite alternate;
`;
