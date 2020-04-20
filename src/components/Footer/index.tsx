import React from 'react';
import styled from 'styled-components';
import { FooterSlot } from '../shared/PageSlots';
import { MediaQueries } from 'Theme/Helpers';
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
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 106'%3E%3Cpath fill='%23201E33' d='M0 0h80v60H0z'/%3E%3Cpath fill='%231F1D32' d='M40.07 0L0 23.16v59.674L39.97 106 80 82.676V23.16z'/%3E%3Cpath fill='%23FFF' d='M10 29v48.49L19.333 83V65.44L38 76.462v-11.02L19.333 54.42v-8.919L38 56.551v-11.02z'/%3E%3Cpath fill='%23FF5900' d='M42 45.53v11.021l18.667-11.02V83L70 77.49V29z'/%3E%3Cpath fill='%230CC' d='M14 26.473L23.464 32 40.5 22.053 57.536 32 67 26.473 40.5 11z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: right;
  color: ${props => props.theme.pallet.dark};
  text-decoration: none;
  opacity: 0.8;
  margin-top: 10px;

  &::before {
    content: 'In Collaboration with Frontmen';
    margin-right: 20px;
  }

  &:hover {
    opacity: 1;
  }

  @media (${MediaQueries.phablet}) {
    margin-top: 0;
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
      <FrontmenLink
        href="https://www.frontmen.nl/"
        data-testid="footer-Frontmen-link"
        target="_blank"
      />
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
        data-testid="footer-Intracto-link"
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
