import { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import { FaChevronLeft, FaChevronRight, FaBullseye, FaTrophy } from 'react-icons/fa'

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const timelineData = [
    { year: '2015', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam' },
    { year: '2016', text: 'Expanded to 3 new locations and introduced our premium clothing line. Received "Best New Retailer" award.' },
    { year: '2018', text: 'Introduced sustainable fashion line. Won "Eco-Friendly Retailer of the Year" award.' },
    { year: '2020', text: 'Adapted to pandemic with enhanced online services. Grew online sales by 300%.' },
    { year: '2021', text: 'Launched mobile app and expanded to international markets.' },
    { year: '2022', text: 'Opened flagship store in Mumbai. Received "Retail Excellence" award.' },
    { year: '2024', text: 'Reached 50+ stores nationwide. Started eco-friendly packaging initiative.' },
    { year: '2025', text: 'Launched AI-powered fashion recommendations.' },
    { year: '2026', text: 'Planning to expand to 10+ countries internationally.' }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % timelineData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + timelineData.length) % timelineData.length)
  }

  const teamMembers = [
    { name: 'Aaksh Shah', role: 'Founder, CEO', image: 'img/img_aaksh.png', imageClass: 'team-image1' },
    { name: 'Neha Patel', role: 'President', image: 'img/img_naha.png', imageClass: 'team-image2' },
    { name: 'Ankit Patel', role: 'Co-Founder', image: 'img/img_ankit.png', imageClass: 'team-image3' }
  ]

  return (
    <>
      <HeroSection
        title="About Us"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        buttonText="Shop Now"
        buttonLink="/shop"
        imageUrl="img/img_about_banner.png"
      />

      {/* 15+ Years Experience Section */}
      <section className="experience-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="experience-image-container">
                <img src="img/img_exp.png" alt="Experience" className="experience-image" />
              </div>
            </Col>
            
            <Col lg={6}>
              <div className="experience-content">
                <h2 className="experience-title">15+ Years Of Experience In This Industry</h2>
                
                <p className="experience-text">
                  Suspendisse non nisl sit amet velit hendrerit rutrum. Nulla porta dolor. Nunc interdum lacus sit amet orci. Donec quis lectus, aliquam ut, faucibus non, euismod id, nulla.
                </p>
                
                <p className="experience-text">
                  Suspendisse non nisl sit amet velit hendrerit rutrum. Nulla porta dolor. Nunc interdum lacus sit amet orci. Donec quis lectus, aliquam ut, faucibus non, euismod id, nulla. Etiam sit amet erat nec sapir vehicula.
                </p>
                
                <p className="experience-text">
                  Maecenas egestas arcu quis ligula mattis placerat. Quisque ut mi. Sed a libero. Vestibulum semper mauris ut ligula. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus.
                </p>

                <div className="founder-profile">
                  <img src="img/img_akash_shah.png" alt="Founder" />
                  <div className="founder-info">
                    <h6>Aaksh Shah</h6>
                    <p>Founder, CEO</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Awards Section */}
      <section className="mission-awards-section">
        <Container>
          <Row>
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="info-card">
                <div className="info-card-icon">
                  <FaBullseye />
                </div>
                <h4>Our Mission.</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                </p>
              </div>
            </Col>
            
            <Col lg={6}>
              <div className="info-card">
                <div className="info-card-icon">
                  <FaTrophy />
                </div>
                <h4>Awards & Recognition.</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our History Section */}
      <section className="history-section">
        <Container>
          <h2 className="section-title">Our History.</h2>
          <p className="section-subtitle">Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
          
          <div className="timeline-container">
            <div 
              className="timeline-slider" 
              id="timelineSlider"
              style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}
            >
              {timelineData.map((item, index) => (
                <div className="timeline-slide" key={index}>
                  <div className="timeline-year">{item.year}</div>
                  <p className="timeline-text">{item.text}</p>
                  <div className="timeline-year-display">{item.year}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="timeline-nav">
            <button className="timeline-nav-btn" id="prevBtn" onClick={prevSlide}>
              <FaChevronLeft />
            </button>
            
            <div className="timeline-dots" id="timelineDots">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className={`timeline-dot ${Math.floor(currentSlide / 3) === index ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index * 3)}
                ></div>
              ))}
            </div>
            
            <button className="timeline-nav-btn" id="nextBtn" onClick={nextSlide}>
              <FaChevronRight />
            </button>
          </div>
        </Container>
      </section>

      {/* Our Team Section */}
      <section className="team-section">
        <Container>
          <h2 className="section-title">Our Team.</h2>
          
          <Row className="mt-5">
            {teamMembers.map((member, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <div className="team-card">
                  <img src={member.image} alt={member.name} className={member.imageClass} />
                  <div className="team-info">
                    <h5>{member.name}</h5>
                    <p>{member.role}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  )
}

export default About