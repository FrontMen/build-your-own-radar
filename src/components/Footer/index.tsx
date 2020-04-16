import React from 'react';
import { FooterSlot } from '../shared/PageSlots';
import styled from 'styled-components';
import facebookLogo from 'res/svg/facebook.svg';
import instagramLogo from 'res/svg/instagram.svg';
import youtubeLogo from 'res/svg/youtube.svg';
import linkedinLogo from 'res/svg/linkedin.svg';

const Slot = styled(FooterSlot)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Links = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 1px solid ${props => props.theme.pallet.grayLight};
  padding-bottom: 12px;
`;

const IntractoLinks = styled.div`
  a {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 15px;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
`;

const FrontmenLink = styled.a`
  align-self: center;
  font-family: Montserrat, san-serif;
  font-weight: 700;
  background-image: url(https://avatars.slack-edge.com/2018-08-22/421227378482_388f1e04f09059c1f486_88.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: right;
  color: ${props => props.theme.pallet.dark};
  text-decoration: none;
  opacity: 0.8;

  &::before {
    content: 'In Collaboration with Frontmen';
    margin-right: 25px;
  }

  &:hover {
    opacity: 1;
  }
`;

const PrivacyLinks = styled.div`
  margin-top: 12px;

  a {
    margin-right: 10px;
    font-size: 13px;
    text-decoration: none;
    opacity: 0.7;
    color: ${props => props.theme.pallet.grayDark};

    &:hover {
      opacity: 1;
    }
  }
`;

export const Footer = () => (
  <Slot>
    <Links>
      <IntractoLinks>
        <a
          href="https://www.facebook.com/Intracto"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={facebookLogo} alt="facebook-logo" />
        </a>
        <a
          href="https://www.linkedin.com/company/intracto/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedinLogo} alt="linkedin-logo" />
        </a>
        <a
          href="https://www.youtube.com/channel/UCxdOVsGyzWkQ2zxx8ojSxHQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={youtubeLogo} alt="youtube-logo" />
        </a>
        <a
          href="https://www.instagram.com/intracto_agency/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instagramLogo} alt="instagram-logo" />
        </a>
      </IntractoLinks>
      <FrontmenLink href="https://www.frontmen.nl/" target="_blank" />
    </Links>
    <PrivacyLinks>
      <a
        href="https://www.intracto.com/en-be/cookie-policy"
        target="_blank"
        rel="noopener noreferrer"
      >
        cookie policy
      </a>
      <a
        href="https://www.intracto.com/en-be/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
      >
        privacy policy
      </a>
      <a
        href="https://www.intracto.com/en-be/conditions"
        target="_blank"
        rel="noopener noreferrer"
      >
        terms & conditions
      </a>
    </PrivacyLinks>
  </Slot>
);
