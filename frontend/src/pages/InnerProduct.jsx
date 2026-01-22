import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import HeroSection from '../components/HeroSection'
import { FaHeart, FaMinus, FaPlus, FaStar, FaPaperPlane, FaEye, FaRedo } from 'react-icons/fa'

const InnerProduct = () => {
  const [mainImage, setMainImage] = useState('/img/img_lg1.png')
  const [selectedSize, setSelectedSize] = useState('XS')
  const [quantity, setQuantity] = useState(2)
  const [activeTab, setActiveTab] = useState('details')
  const [wishlisted, setWishlisted] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    firstName: '',
    lastName: '',
    rating: 0,
    comment: ''
  })

  const product = {
    name: "Women's Summer Dress",
    price: 2000,
    rating: 4.9,
    images: [
      { thumb: '/img/img_sm1.png', large: '/img/img_lg1.png' },
      { thumb: '/img/img_sm2.png', large: '/img/img_lg2.png' },
      { thumb: '/img/img_sm3.png', large: '/img/img_lg3.png' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  }

  const reviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 4,
      text: 'Excellent quality! The dress fits perfectly and the fabric is very comfortable. I\'ve received so many compliments!',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      name: 'Rahul Verma',
      rating: 5,
      text: 'Best purchase ever! The stitching is excellent and the color looks exactly like in the picture. Very fast delivery too!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      name: 'Anjali Patel',
      rating: 4,
      text: 'Love this dress! Perfect for summer parties. The quality exceeded my expectations. Will definitely buy again.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      rating: 3,
      text: 'Good quality fabric, but the size was slightly smaller than expected. Would recommend ordering one size up.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 5,
      name: 'Neha Gupta',
      rating: 4,
      text: 'Beautiful design and perfect for office wear. The material is breathable and doesn\'t wrinkle easily.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 6,
      name: 'Raj Malhotra',
      rating: 5,
      text: 'Perfect fit and amazing quality! I\'ve ordered 3 more dresses from this store. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
    }
  ]

  const totalPrice = product.price * quantity

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size)
  }

  const handleWishlistToggle = () => {
    setWishlisted(!wishlisted)
    alert(wishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  const handleRatingClick = (rating) => {
    setUserRating(rating)
    setReviewForm({ ...reviewForm, rating })
  }

  const handleReviewChange = (e) => {
    setReviewForm({
      ...reviewForm,
      [e.target.name]: e.target.value
    })
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (!reviewForm.firstName || !reviewForm.lastName || !reviewForm.comment || reviewForm.rating === 0) {
      alert('Please fill in all fields and select a rating.')
      return
    }
    alert('Review submitted successfully!')
    setReviewForm({
      firstName: '',
      lastName: '',
      rating: 0,
      comment: ''
    })
    setUserRating(0)
  }

  const renderStars = (rating, interactive = false) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'active' : 'star-empty'}
        onClick={interactive ? () => handleRatingClick(index + 1) : undefined}
        style={{
          color: index < rating ? '#FFB800' : '#ddd',
          cursor: interactive ? 'pointer' : 'default',
          marginRight: '2px'
        }}
      />
    ))
  }

  return (
    <>
      

      <HeroSection
        title="Product Details"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        imageUrl={window.location.origin + "/img/img_banner_shop.png"}
      />

      {/* Product Detail Section */}
      <section className="product-detail-section">
        <Container>
          <Row>
            {/* Product Images */}
            <Col lg={6}>
              <div className="main-product-image">
                <img src={mainImage} alt="Dress" id="mainImage" />
                <button 
                  className={`wishlist-btn ${wishlisted ? 'active' : ''}`} 
                  id="wishlistBtn"
                  onClick={handleWishlistToggle}
                >
                  <FaHeart style={{ color: wishlisted ? 'white' : 'inherit' }} />
                </button>
              </div>
              <div className="thumbnail-container">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${mainImage === img.large ? 'active' : ''}`}
                    onClick={() => setMainImage(img.large)}
                  >
                    <img src={img.thumb} alt={`View ${index + 1}`} />
                  </div>
                ))}
              </div>
            </Col>

            {/* Product Info */}
            <Col lg={6}>
              <div className="product-info-container">
                <h1 className="product-name">{product.name}</h1>

                <div className="product-price-box">
                  <div className="product-price">₹ {product.price}</div>
                </div>

                <div className="product-rating">
                  <div className="stars">
                    {renderStars(Math.floor(product.rating))}
                    <FaStar className="star-empty" />
                  </div>
                  <span className="rating-text">({product.rating})</span>
                </div>

                {/* Size Selection */}
                <div className="size-section">
                  <div className="section-label">Size: {selectedSize}</div>
                  <div className="size-options">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        className={`size-option ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => handleSizeSelect(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selection */}
                <div className="quantity-section">
                  <div className="quantity-controls">
                    <button className="quantity-btn" onClick={() => handleQuantityChange(-1)}>
                      <FaMinus />
                    </button>
                    <span className="quantity-value" id="quantityValue">{quantity}</span>
                    <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>
                      <FaPlus />
                    </button>
                    <span className="total-price" id="totalPrice">₹ {totalPrice}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <button className="btn-buy-now">Buy Now</button>
                  <button className="btn-add-cart">Add To Cart</button>
                </div>
              </div>
            </Col>
          </Row>

          {/* Tabs Section */}
          <div className="product-tabs">
            <div className="tab-buttons">
              <button
                className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Product Details
              </button>
              <button
                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>
          </div>

          <div className="tab-content">
            {/* Product Details Tab */}
            {activeTab === 'details' && (
              <div className="tab-pane active" id="details">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                  the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                  of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining essentially unchanged. It was
                  popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                  and more recently with desktop publishing software like Aldus PageMaker including versions of
                  Lorem Ipsum.</p>

                <p>It is a long established fact that a reader will be distracted by the readable content of a page
                  when looking at its layout.</p>

                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                  alteration in some form, by injected humour, or randomised words which don't look even slightly
                  believable.</p>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur.</p>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="tab-pane" id="reviews">
                <div className="reviews-header">
                  <div className="stars">
                    {renderStars(4)}
                    <FaStar className="star-empty" />
                  </div>
                  <span className="reviews-count">(4.9) • <span id="totalReviews">4,87,162</span> Reviews</span>
                </div>

                {/* Reviews Container */}
                <div className="reviews-container">
                  {reviews.slice(0, 6).map(review => (
                    <div className="review-card" key={review.id}>
                      <div className="review-header">
                        <div 
                          className="reviewer-avatar" 
                          style={{ backgroundImage: `url(${review.avatar})` }}
                        ></div>
                        <div className="reviewer-info">
                          <h6>{review.name}</h6>
                          <div className="review-rating">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>
                      <p className="review-text">{review.text}</p>
                    </div>
                  ))}
                </div>

                {/* Review Slider Dots */}
                <div className="review-dots" id="reviewDotsContainer">
                  <div className="review-dot active" data-slide="0"></div>
                  <div className="review-dot" data-slide="1"></div>
                </div>
                
                {/* Add Comment Form */}
                <Row className="d-flex justify-content-center align-items-center mt-5">
                  <Col lg={6} md={6} xs={12}>
                    <div className="add-review-form">
                      <h3 className="form-title">Add Your Review</h3>
                      <Form id="reviewForm" onSubmit={handleReviewSubmit}>
                        <Row>
                          <Col md={6} className="mb-3">
                            <Form.Label htmlFor="firstName">First Name</Form.Label>
                            <Form.Control
                              type="text"
                              id="firstName"
                              name="firstName"
                              placeholder="Enter your first name"
                              value={reviewForm.firstName}
                              onChange={handleReviewChange}
                              required
                            />
                          </Col>
                          <Col md={6} className="mb-3">
                            <Form.Label htmlFor="lastName">Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              id="lastName"
                              name="lastName"
                              placeholder="Enter your last name"
                              value={reviewForm.lastName}
                              onChange={handleReviewChange}
                              required
                            />
                          </Col>
                        </Row>
                        
                        <div className="mb-3">
                          <Form.Label>Your Rating</Form.Label>
                          <div className="rating-stars-input">
                            <div className="stars-input">
                              {renderStars(userRating, true)}
                            </div>
                            <span className="selected-rating-text">
                              {userRating === 0 ? 'Click stars to rate' : 
                               `Rating: ${userRating} star${userRating > 1 ? 's' : ''}`}
                            </span>
                            <input type="hidden" id="userRating" value={userRating} />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <Form.Label htmlFor="comment">Your Review</Form.Label>
                          <Form.Control
                            as="textarea"
                            id="comment"
                            name="comment"
                            rows={4}
                            placeholder="Share your experience with this product..."
                            value={reviewForm.comment}
                            onChange={handleReviewChange}
                            required
                          />
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <Button type="submit" className="btn-submit-review">
                            <FaPaperPlane /> Post Your Comment
                          </Button>
                          <div className="form-actions">
                            <Button 
                              type="button" 
                              className="btn-preview-review" 
                              id="previewBtn"
                              onClick={() => setShowPreview(true)}
                            >
                              <FaEye /> Preview
                            </Button>
                            <Button 
                              type="button" 
                              className="btn-reset-review"
                              onClick={() => {
                                setReviewForm({
                                  firstName: '',
                                  lastName: '',
                                  rating: 0,
                                  comment: ''
                                })
                                setUserRating(0)
                              }}
                            >
                              <FaRedo /> Reset
                            </Button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </Col>
                  <Col lg={6} md={6} xs={12} style={{ textAlign: 'right' }}>
                    <img src="img/img_comment.png" alt="Comment" style={{ maxWidth: '100%' }} />
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}

export default InnerProduct