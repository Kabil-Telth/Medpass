
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Award,
  Briefcase,
  Globe,
  Users,
  Stethoscope,
  Brain,
  Heart,
  Target,
  TrendingUp,
  Clock
} from 'lucide-react';
import homeImage from '../assest/Picture3.jpg';
import '../Program.css';
import '../Animation.css';
import studyImg from '../assest/Picture4.jpg';
import learnImg from '../assest/Picture5.jpg';
import MarqueeContainer from './MarqueeContainer';

// Animation variants
const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container className="hero-content">
          <Row className="align-items-center">
            {/* Left side: Text */}
            <Col lg={8}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                variants={slideInLeft}
              >
                <h1 className="display-4 fw-bold mb-4 text-primary-blue">
                  Telth U Postgraduate Skill Upgrade Program
                </h1>
                <h2 className="h4 mb-4 opacity-90">
                  Building the Future of Healthcare & Global Talent Development
                </h2>
                <p className="lead mb-4">
                  A strategic initiative connecting international medical graduates and healthcare professionals to UK employment
                  and advanced training. Developed by Med Lab in collaboration with top UK institutions, the program provides postgraduate
                  education and guarantees job placement, creating a direct pathway to career advancement within the UK healthcare system.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <Button as={Link} to="/explore" className="btn-primary-custom btn-lg">
                    Explore
                  </Button>
                  <Button as={Link} to="/program" className="btn-outline-primary-custom btn-lg">
                    Learn More
                  </Button>
                </div>
              </motion.div>
            </Col>

            {/* Right side: Image */}
            <Col lg={4} className="text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
                variants={slideInRight}
              >
                <img
                  src={homeImage}
                  alt="Telth UK Program"
                  className="img-fluid hero-image"
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Key Benefits Section */}
      <section className="section-padding bg-light">
        <Container>
          <Row className="text-center mb-3">
            <Col lg={8} className="mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                variants={fadeIn}
              >
                <h2 className="display-5 fw-bold text-primary-blue mb-2">
                  Why Choose This Program ?
                </h2>
                <p className="lead">
                  More than education — it's a direct pathway to career advancement,
                  global opportunities, and cutting-edge clinical practice.
                </p>
              </motion.div>
            </Col>
          </Row>

          <Row className="g-4">
            {[
              { icon: <Award />, title: "Postgraduate Certification", text: "Earn a recognized postgraduate credential through our KTP partnership with prestigious UK universities." },
              { icon: <Briefcase />, title: "Guaranteed UK Employment", text: "Secure a 2-year paid position at Telth AI Care Hubs in the UK immediately upon program completion." },
              { icon: <Users />, title: "End-to-End Support", text: "Visa assistance, accommodation guidance, and professional onboarding included in the program." },
              { icon: <Globe />, title: "Global Career Pathway", text: "Build a foundation for an international healthcare career with globally recognized credentials." }
            ].map((item, index) => (
              <Col lg={3} md={6} key={index}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  variants={fadeIn}
                >
                  <Card className="feature-card text-center border-0 h-100">
                    <Card.Body className="p-4">
                      <div className="benefit-icon">
                        {item.icon}
                      </div>
                      <h5 className="fw-bold mb-3">{item.title}</h5>
                      <p className="text-muted">{item.text}</p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* What You'll Learn Section */}
      <section className="section-padding">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                variants={slideInLeft}
              >
                <h2 className="display-6 fw-bold text-primary-blue mb-4">
                  What You'll Learn
                </h2>
                <p className="lead mb-4">
                  Our integrated curriculum blends clinical practice with future-ready technologies:
                </p>

                {[
                  { icon: <Brain />, title: "Advanced Diagnostics and AI-Driven Healthcare", text: "Master cutting-edge diagnostic tools and AI applications" },
                  { icon: <Heart />, title: "Personalized Medicine & Genomic Profiling", text: "Learn individualized treatment approaches" },
                  { icon: <Target />, title: "IoMT Integration & Real-Time Monitoring", text: "Internet of Medical Things and patient dashboards" },
                  { icon: <Stethoscope />, title: "Evidence-Based Community Care Models", text: "Modern approaches to community and home care" }
                ].map((item, index) => (
                  <div key={index} className="d-flex align-items-start mb-3">
                    {React.cloneElement(item.icon, { className: "text-secondary-teal me-3 mt-1 flex-shrink-0", size: 24 })}
                    <div>
                      <h6 className="fw-bold mb-1">{item.title}</h6>
                      <p className="text-muted mb-0">{item.text}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </Col>

            <Col lg={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                variants={slideInRight}
              >
                <img
                  src={learnImg}
                  alt="Healthcare Technology"
                  className="img-fluid rounded shadow-lg"
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="mt-4 bg-gradient-primary text-white">
        <Container>
          <MarqueeContainer />
        </Container>
      </section>
      {/* Who Is This For Section */}
      <section className="section-padding bg-light">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center mb-5">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                variants={slideInLeft}
              >
                <h2 className="display-6 fw-bold text-primary-blue mb-3">
                  Who Is This For?
                </h2>
                <p className="lead">
                  This program is ideal for ambitious healthcare professionals seeking advancement
                  in the UK's elite medical system.
                </p>
              </motion.div>
            </Col>
          </Row>

          <Row className="g-4">
            <Col lg={6}>
              <Card className="feature-card h-100 border-0">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <div className="benefit-icon">
                      <Users />
                    </div>
                    <h5 className="fw-bold mb-0 d-flex justify-content-center">Target Candidates</h5>
                  </div>
                  <ul className="list-unstyled">
                    <li className="mb-2">✓ Foreign Medical Graduates (FMGs)</li>
                    <li className="mb-2">✓ Junior Doctors</li>
                    <li className="mb-2">✓ Physician Assistants & Nursing Practitioners</li>
                    <li className="mb-2">✓ Ambitious healthcare workers</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="feature-card h-100 border-0">
                <Card.Body className="p-4">
                  <div className=" mb-3">
                    <div className="benefit-icon">
                      <TrendingUp />
                    </div>
                    <h5 className="fw-bold mb-0 d-flex justify-content-center">Career Goals</h5>
                  </div>
                  <ul className="list-unstyled">
                    <li className="mb-2">✓ Career advancement in healthcare</li>
                    <li className="mb-2">✓ UK clinical practice experience</li>
                    <li className="mb-2">✓ International career opportunities</li>
                    <li className="mb-2">✓ Advanced medical technology training</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Program Timeline Section */}
      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center mb-5">
              <h2 className="display-6 fw-bold text-primary-blue mb-3">
                Program Timeline
              </h2>
              <p className="lead">
                Your journey from application to UK employment
              </p>
            </Col>
          </Row>

          <Row className="align-items-center g-5">
            <Col lg={7} className="mx-auto">
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-content card1">
                    <h5 className="fw-bold text-primary-blue">Next 30 Days</h5>
                    <p className="mb-2">Application Portal Launch</p>
                    <ul className="list-unstyled text-muted small">
                      <li>• Website & application portal launch</li>
                      <li>• Marketing assets finalization</li>
                      <li>• Stakeholder briefing</li>
                    </ul>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-content card1">
                    <h5 className="fw-bold text-primary-blue">Next 60-90 Days</h5>
                    <p className="mb-2">Application Review Process</p>
                    <ul className="list-unstyled text-muted small">
                      <li>• First round applicant review</li>
                      <li>• Marketing optimization</li>
                      <li>• Target recalibration</li>
                    </ul>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-content card1">
                    <h5 className="fw-bold text-primary-blue">Next 6-12 Months</h5>
                    <p className="mb-2">Program Commencement</p>
                    <ul className="list-unstyled text-muted small">
                      <li>• First cohort onboarding</li>
                      <li>• 80% recruitment goal achievement</li>
                      <li>• Quality benchmarks establishment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={5}>
              <img
                src={studyImg}
                alt="Telth UK Program"
                className="img-fluid rounded shadow-lg programme-image"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="section-padding bg-gradient-secondary text-white py-5 position-relative">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="display-5 fw-bold mb-3">
                Ready to Transform Your Healthcare Career?
              </h2>
              <p className="lead mb-4 text-light opacity-90">
                Join the next generation of healthcare professionals and secure your future
                with guaranteed UK employment and world-class training.
              </p>
              <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
                <Button
                  as={Link}
                  to="/apply"
                  className="btn btn-light btn-lg px-5 py-3 shadow-sm rounded-pill d-flex align-items-center"
                >
                  <Clock className="me-2" size={20} />
                  Apply Now
                </Button>
                <Button
                  as={Link}
                  to="/contact"
                  className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill border-2"
                >
                  Get Information
                </Button>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Optional decorative overlay for better gradient depth */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.4))",
            zIndex: 0,
          }}
        ></div>
      </section>

    </>
  );
};

export default Home;