import React from 'react';
import './Footer.css';
import { Row, Col } from 'react-bootstrap';

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

        <footer className='text-center'>
          <div style={{ backgroundColor: '#FF1F66' }}>
            <Row>
              {socialMediaLinks.map((link, index) => (
                <Col key={index} className='col-4'>
                  <a  href={link.url}>
                    <img src={link.icon} alt={link.alt} style={{ height: '6vw' }} />
                  </a>
                </Col>
              ))}
            </Row>
          </div>
        </footer>
  );
};

export default Footer;