import React from 'react';
import './Footer.css';
import { Nav } from 'react-bootstrap';

const socialMediaLinks = [
  {
    icon: 'mdi_instagram.png',
    url: 'https://www.instagram.com/lsacbucuresti/',
  },
  {
    icon: 'uil_facebook.png',
    url: 'https://www.facebook.com/LsacBucuresti',
  },
  {
    icon: 'mdi_twitch.png',
    url: 'https://www.twitch.tv/lsac_bucuresti',
  },
];

const Footer = () => {
  return (
    <Nav className="justify-content-center">
      {socialMediaLinks.map((link, index) => (
        <Nav.Item as="li" key={index} style={{ marginInline: '5vw' }}>
          <Nav.Link href={link.url}>
            <img src={link.icon} alt="" style={{ height: '7vh' }} />
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default Footer;