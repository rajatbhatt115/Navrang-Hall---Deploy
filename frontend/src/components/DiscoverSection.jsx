import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const DiscoverSection = () => {
  return (
    <section className="discover-section">
      <Container>
        <h2><span>Discover more.</span> <strong>Good things are waiting for you</strong></h2>
        <Row>
          {[
            { bgColor: '#F9EC82', imgClass: 'product-image1' },
            { bgColor: '#FFE8CC', imgClass: 'product-image2' },
            { bgColor: '#F9EC82', imgClass: 'product-image3' },
            { bgColor: '#FFE8CC', imgClass: 'product-image4' }
          ].map((item, index) => (
            <Col md={3} key={index}>
              <div className="product-card" style={{ backgroundColor: item.bgColor }}>
                <span className="badge-new">New Arrival</span>
                <div className={item.imgClass}></div>
                <h5 className="mt-3">Shop The Latest Items From Top Brands</h5>
                <Link to="/shop">
                  <button className="btn-read-more mt-1">Shop Now</button>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default DiscoverSection