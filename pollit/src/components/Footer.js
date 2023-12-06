import React from 'react';
import './Footer.css';
import { Nav } from 'react-bootstrap';

const socialMediaLinks = [
  {
    icon: 'mdi_instagram.png',
    url: 'https://www.instagram.com/lsacbucuresti/',
    style: {width:'6vw'},
  },
  {
    icon: 'uil_facebook.png',
    url: 'https://www.facebook.com/LsacBucuresti',
    style: {width:'6vw', marginLeft: '80px', marginRight: '80px'},
  },
  {
    icon: 'mdi_twitch.png',
    url: 'https://www.twitch.tv/lsac_bucuresti',
    style: {width:'6vw'},
  },
];

const Footer = () => {
  return (
    <Nav className="justify-content-center">
      {socialMediaLinks.map((link, index) => (
        <Nav.Item as="li" key={index}>
          <Nav.Link href={link.url}>
            <img src={link.icon} alt="" style={link.style}/>
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default Footer;
