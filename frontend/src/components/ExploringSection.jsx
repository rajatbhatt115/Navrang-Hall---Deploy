import { Container, Row, Col } from 'react-bootstrap'

const ExploringSection = () => {
  const categories = [
    {
      id: 1,
      title: 'Western Wear',
      description: 'Stylish everyday outfits for a chic modern look.',
      imageClass: 'category1'
    },
    {
      id: 2,
      title: 'Dress',
      description: 'Elegant designer gowns crafted for special celebrations.',
      imageClass: 'category2'
    },
    {
      id: 3,
      title: 'Navratri',
      description: 'Vibrant ethnic styles perfect for festive occasions.',
      imageClass: 'category3'
    }
  ]

  return (
    <section className="exploring-section">
      <Container>
        <h2 className="text-center mb-5">Explore Categories</h2>

        <Row>
          {categories.map(category => (
            <Col md={4} key={category.id}>
              <div className={`category-card ${category.imageClass}`}>
                <div className="category-overlay">
                  <h4>{category.title}</h4>
                  <p>{category.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default ExploringSection