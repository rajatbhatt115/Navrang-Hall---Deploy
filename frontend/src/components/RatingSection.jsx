import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const RatingSection = () => {
  const [activeCategory, setActiveCategory] = useState('kids')

  const categories = [
    { id: 'kids', name: 'Kids' },
    { id: 'women', name: 'Women' },
    { id: 'jewellery', name: 'Jewellery' }
  ]

  const products = {
    kids: [
      { id: 1, title: 'Kids T-Shirt', price: '₹1,200', rating: 4, imageClass: 'rating-image-kids1' },
      { id: 2, title: 'Kids Dress', price: '₹2,500', rating: 5, imageClass: 'rating-image-kids2' },
      { id: 3, title: 'Kids Jeans', price: '₹1,800', rating: 4, imageClass: 'rating-image-kids3' }
    ],
    women: [
      { id: 4, title: 'Western', price: '₹7,500', rating: 4, imageClass: 'rating-image-women1' },
      { id: 5, title: 'Gown', price: '₹7,500', rating: 5, imageClass: 'rating-image-women2' },
      { id: 6, title: 'Sarees', price: '₹7,500', rating: 4, imageClass: 'rating-image-women3' }
    ],
    jewellery: [
      { id: 7, title: 'Gold Necklace', price: '₹15,000', rating: 4, imageClass: 'rating-image-jewellery1' },
      { id: 8, title: 'Silver Earrings', price: '₹3,500', rating: 5, imageClass: 'rating-image-jewellery2' },
      { id: 9, title: 'Diamond Ring', price: '₹25,000', rating: 4, imageClass: 'rating-image-jewellery3' }
    ]
  }

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  return (
    <section className="rating-section">
      <Container>
        <h2>Top Rating Cloths.</h2>
        
        {/* Category Tabs */}
        <div className="rating-tabs">
          {categories.map(category => (
            <div
              key={category.id}
              className={`rating-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </div>
          ))}
        </div>

        {/* Kids Category - Only show when active */}
        {activeCategory === 'kids' && (
          <Row className="product-category active" id="kids-category">
            {products.kids.map(product => (
              <Col md={4} key={product.id}>
                <div className="rating-card">
                  <div className={`rating-image ${product.imageClass}`}></div>
                  <div className="rating-top-row">
                    <div className="left-group">
                      <h5 className="item-title">{product.title}</h5>
                      <div className="stars">{renderStars(product.rating)}</div>
                    </div>
                    <div className="price">{product.price}</div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}

        {/* Women Category - Only show when active */}
        {activeCategory === 'women' && (
          <Row className="product-category" id="women-category">
            {products.women.map(product => (
              <Col md={4} key={product.id}>
                <div className="rating-card">
                  <div className={`rating-image ${product.imageClass}`}></div>
                  <div className="rating-top-row">
                    <div className="left-group">
                      <h5 className="item-title">{product.title}</h5>
                      <div className="stars">{renderStars(product.rating)}</div>
                    </div>
                    <div className="price">{product.price}</div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}

        {/* Jewellery Category - Only show when active */}
        {activeCategory === 'jewellery' && (
          <Row className="product-category" id="jewellery-category">
            {products.jewellery.map(product => (
              <Col md={4} key={product.id}>
                <div className="rating-card">
                  <div className={`rating-image ${product.imageClass}`}></div>
                  <div className="rating-top-row">
                    <div className="left-group">
                      <h5 className="item-title">{product.title}</h5>
                      <div className="stars">{renderStars(product.rating)}</div>
                    </div>
                    <div className="price">{product.price}</div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  )
}

export default RatingSection