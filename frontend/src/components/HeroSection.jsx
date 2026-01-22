import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HeroSection = ({ title, subtitle, description, buttonText, buttonLink, imageUrl, isShopPage }) => {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="hero-content-col">
            <div className="hero-content">
              <p>VISIT ALL OF OUR PRODUCTS</p>
              <h1>
                <span>{title}</span>
              </h1>
              <h5>{subtitle}</h5>
              <p>{description}</p>
              {!isShopPage && buttonText && buttonLink && (
                <Link to={buttonLink}>
                  <button className="btn-read-more">{buttonText}</button>
                </Link>
              )}
            </div>
          </Col>
          <Col lg={6} className="text-lg-end">
            <div className="hero-image float-lg-end">
              <img src={imageUrl} className="my-img img-fluid" alt="Hero Banner" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default HeroSection