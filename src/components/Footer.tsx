import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer-custom">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <h5 className="mb-3">Telth UK Program</h5>
            <p className="mb-3">
              Transforming healthcare careers through advanced training and guaranteed UK employment opportunities.
            </p>
            <div className="d-flex">
              <a href="#" className="me-3"><Facebook size={24} /></a>
              <a href="#" className="me-3"><Twitter size={24} /></a>
              <a href="#" className="me-3"><Linkedin size={24} /></a>
              <a href="#"><Instagram size={24} /></a>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/">Home</a></li>
              <li className="mb-2"><a href="/about">About</a></li>
              <li className="mb-2"><a href="/program">Program</a></li>
              {/* <li className="mb-2"><a href="/apply">Apply</a></li> */}
              <li className="mb-2"><a href="/contact">Contact</a></li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <h6 className="mb-3">Program</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#">Eligibility</a></li>
              <li className="mb-2"><a href="#">Curriculum</a></li>
              <li className="mb-2"><a href="#">Employment</a></li>
              <li className="mb-2"><a href="#">Certification</a></li>
              <li className="mb-2"><a href="#">Support</a></li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <h6 className="mb-3">Contact Info</h6>
            <div className="d-flex align-items-center mb-2">
              <Mail size={16} className="me-2" />
              <span>info@telthprogram.com</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <Phone size={16} className="me-2" />
              <span>+44 20 7946 0958</span>
            </div>
            <div className="d-flex align-items-start">
              <MapPin size={16} className="me-2 mt-1" />
              <span>University of Warwick<br />Coventry, UK</span>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row>
          <Col md={6}>
            <p className="mb-0">&copy; 2024 Telth Tech. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <a href="#" className="me-3">Privacy Policy</a>
            <a href="#" className="me-3">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;