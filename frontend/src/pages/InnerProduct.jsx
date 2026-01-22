import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import HeroSection from '../components/HeroSection';
import api from '../api';
import { FaHeart, FaMinus, FaPlus, FaStar, FaPaperPlane, FaEye, FaRedo } from 'react-icons/fa';

const InnerProduct = () => {
  const [mainImage, setMainImage] = useState('/img/img_lg1.png');
  const [selectedSize, setSelectedSize] = useState('XS');
  const [quantity, setQuantity] = useState(2);
  const [activeTab, setActiveTab] = useState('details');
  const [wishlisted, setWishlisted] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({
    firstName: '',
    lastName: '',
    rating: 0,
    comment: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.getProductDetails(1);
        setProduct(response.data);
        if (response.data.images.length > 0) {
          setMainImage(response.data.images[0].large);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleWishlistToggle = () => {
    setWishlisted(!wishlisted);
    alert(wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleRatingClick = (rating) => {
    setUserRating(rating);
    setReviewForm({ ...reviewForm, rating });
  };

  const handleReviewChange = (e) => {
    setReviewForm({
      ...reviewForm,
      [e.target.name]: e.target.value
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.firstName || !reviewForm.lastName || !reviewForm.comment || reviewForm.rating === 0) {
      alert('Please fill in all fields and select a rating.');
      return;
    }
    alert('Review submitted successfully!');
    setReviewForm({
      firstName: '',
      lastName: '',
      rating: 0,
      comment: ''
    });
    setUserRating(0);
  };

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
    ));
  };

  if (loading) {
    return <div>Loading product...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const totalPrice = product.price * quantity;

  return (
    <>
      <HeroSection pageName="product" />

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
                <p>{product.description}</p>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="tab-pane" id="reviews">
                <div className="reviews-header">
                  <div className="stars">
                    {renderStars(Math.floor(product.rating))}
                    <FaStar className="star-empty" />
                  </div>
                  <span className="reviews-count">({product.rating}) • {product.reviews.length} Reviews</span>
                </div>

                {/* Reviews Container */}
                <div className="reviews-container">
                  {product.reviews.map(review => (
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
  );
};

export default InnerProduct;