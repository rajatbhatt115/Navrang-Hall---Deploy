import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import api from '../api'

const RatingSection = () => {
  const [activeCategory, setActiveCategory] = useState('kids')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await api.getTopRatingProducts(activeCategory);
      setProducts(response.data);  // response.data use karein
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  // Jab category change ho tab products fetch karo
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await api.getTopRatingProducts(activeCategory)
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProductsByCategory()
  }, [activeCategory])

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const categories = [
    { id: 'kids', name: 'Kids' },
    { id: 'women', name: 'Women' },
    { id: 'jewellery', name: 'Jewellery' }
  ]

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

        {/* Products based on active category */}
        {products.length > 0 && (
          <Row className="product-category active">
            {products.map(product => (
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

        {products.length === 0 && !loading && (
          <div className="text-center py-4">
            <p>No products found for this category.</p>
          </div>
        )}
      </Container>
    </section>
  )
}

export default RatingSection